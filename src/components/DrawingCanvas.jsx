/**
 * UYIR KOLAM - ENHANCED DRAWING CANVAS
 * - Continuous Magical Flower & Leaf Rain (Background & Foreground layers)
 * - Abundant Blooming Flowers on the Kolam (Layered blush pink, coral, peach, ivory)
 * - Flurry of Beautiful Fluttering Butterflies (Warm gold, amber, peach, cream, blue)
 * - Layered Golden Glowing Kolam Lines with crisp ivory core
 * - High-DPI hardware accelerated rendering & touch-safe pointer capture
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  COLOR_PALETTE,
  analyzeStrokeForLife,
  renderBotanicalLife,
  createFlowerRainSystem,
  renderFlowerRain,
  createButterflyFlurry
} from '../engine/botanicalLife';
import { soundEngine } from '../audio/soundEngine';

export default function DrawingCanvas({
  brushColor = COLOR_PALETTE.ivoryCore,
  brushSize = 2.8,
  symmetry = 'none', // 'none' | '4-fold' | '8-fold' | 'mirror'
  showGrid = true,
  isEraser = false,
  isCelebrating = false,
  onGardenStatsUpdate = () => {},
  onStrokeDrawn = () => {},
  strokes = [],
  setStrokes = () => {},
  canvasRef = null
}) {
  const containerRef = useRef(null);
  const internalCanvasRef = useRef(null);
  const actualCanvasRef = canvasRef || internalCanvasRef;

  // Botanical elements on the kolam
  const [botanicalLife, setBotanicalLife] = useState({
    flowers: [],
    sparkles: [],
    vines: []
  });

  // Persistent Flower Rain & Butterfly Flurry references (Zero GC allocation in animation loop)
  const flowerRainRef = useRef([]);
  const butterfliesRef = useRef([]);

  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastPointRef = useRef(null);
  const lastSoundTimeRef = useRef(0);

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Update statistics
  useEffect(() => {
    onGardenStatsUpdate({
      bloomCount: botanicalLife.flowers.length,
      sparkleCount: botanicalLife.sparkles.length,
      butterflyCount: butterfliesRef.current.length,
      strokeCount: strokes.length
    });
  }, [botanicalLife, strokes.length, onGardenStatsUpdate]);

  // Handle responsive resize with DPI scaling
  const handleResize = useCallback(() => {
    if (!containerRef.current || !actualCanvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    if (width === 0 || height === 0) return;

    setDimensions({ width, height });

    const canvas = actualCanvasRef.current;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Initialize or resize Flower Rain system
    const isMobile = width < 768;
    const rainCount = isMobile ? 42 : 78;
    flowerRainRef.current = createFlowerRainSystem(width, height, rainCount);

    // Initialize Butterfly Flurry (8-10 graceful butterflies across canvas)
    const bfCount = isMobile ? 6 : 9;
    butterfliesRef.current = createButterflyFlurry(width, height, bfCount);
  }, [actualCanvasRef]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Dot Grid Generator (Subtle greenish dots evenly spaced)
  const getGridDots = useCallback(() => {
    if (!showGrid) return [];
    const dots = [];
    const step = 42;
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;

    const cols = Math.floor(dimensions.width / step);
    const rows = Math.floor(dimensions.height / step);

    const startX = cx - (cols / 2) * step;
    const startY = cy - (rows / 2) * step;

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        dots.push({
          x: startX + c * step,
          y: startY + r * step
        });
      }
    }
    return dots;
  }, [showGrid, dimensions]);

  // Soft snapping to grid dots
  const getSnappedPoint = useCallback(
    (x, y) => {
      if (!showGrid) return { x, y, isSnapped: false };
      const dots = getGridDots();
      const snapThreshold = 12;
      for (const dot of dots) {
        const dist = Math.hypot(dot.x - x, dot.y - y);
        if (dist < snapThreshold) {
          soundEngine.playDewdrop();
          return { x: dot.x, y: dot.y, isSnapped: true };
        }
      }
      return { x, y, isSnapped: false };
    },
    [showGrid, getGridDots]
  );

  // Symmetry transformations
  const getSymmetricPoints = useCallback(
    (point, center) => {
      if (symmetry === 'none') return [point];
      const dx = point.x - center.x;
      const dy = point.y - center.y;
      const results = [point];

      if (symmetry === 'mirror') {
        results.push({ x: center.x - dx, y: center.y + dy });
      } else if (symmetry === '4-fold') {
        results.push({ x: center.x - dy, y: center.y + dx });
        results.push({ x: center.x - dx, y: center.y - dy });
        results.push({ x: center.x + dy, y: center.y - dx });
      } else if (symmetry === '8-fold') {
        for (let i = 1; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const rx = dx * Math.cos(angle) - dy * Math.sin(angle);
          const ry = dx * Math.sin(angle) + dy * Math.cos(angle);
          results.push({ x: center.x + rx, y: center.y + ry });
        }
      }
      return results;
    },
    [symmetry]
  );

  // Pointer Handlers
  const handlePointerDown = (e) => {
    e.preventDefault();
    const canvas = actualCanvasRef.current;
    if (!canvas) return;

    soundEngine.init();

    const rect = canvas.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const snapped = getSnappedPoint(rawX, rawY);

    isDrawingRef.current = true;
    lastPointRef.current = snapped;

    const strokeId = `stroke_${Date.now()}`;
    const newStroke = {
      id: strokeId,
      points: [snapped],
      color: isEraser ? '#061D17' : brushColor,
      width: isEraser ? brushSize * 4 : brushSize,
      symmetry,
      isEraser
    };

    currentStrokeRef.current = newStroke;
    setStrokes((prev) => [...prev, newStroke]);
    soundEngine.playStrokeTone();

    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    e.preventDefault();

    const canvas = actualCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const snapped = getSnappedPoint(rawX, rawY);

    const last = lastPointRef.current;
    if (last && Math.hypot(snapped.x - last.x, snapped.y - last.y) < 3) return;

    lastPointRef.current = snapped;
    currentStrokeRef.current.points.push(snapped);

    const now = Date.now();
    if (now - lastSoundTimeRef.current > 110) {
      soundEngine.playStrokeTone();
      lastSoundTimeRef.current = now;
    }

    setStrokes((prev) => [...prev.slice(0, -1), { ...currentStrokeRef.current }]);
  };

  const handlePointerUp = (e) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    if (currentStrokeRef.current && currentStrokeRef.current.points.length >= 2) {
      const finishedStroke = currentStrokeRef.current;
      onStrokeDrawn(finishedStroke);

      if (!finishedStroke.isEraser) {
        const center = { x: dimensions.width / 2, y: dimensions.height / 2 };
        const lifeResult = analyzeStrokeForLife(finishedStroke, strokes);

        let allNewFlowers = [...lifeResult.flowers];
        let allNewSparkles = [...lifeResult.sparkles];
        let allNewVines = [...lifeResult.vines];

        // Symmetrical replication of awakened flowers across sectors
        if (finishedStroke.symmetry && finishedStroke.symmetry !== 'none') {
          lifeResult.flowers.forEach((flower) => {
            const symPts = getSymmetricPoints({ x: flower.x, y: flower.y }, center);
            symPts.slice(1).forEach((pt) => {
              allNewFlowers.push({
                ...flower,
                id: `${flower.id}_sym_${Math.random()}`,
                x: pt.x,
                y: pt.y,
                scale: 0,
                progress: 0
              });
            });
          });
        }

        if (allNewFlowers.length > 0) {
          soundEngine.playBloomChime();
        }

        // Attract a butterfly towards newly bloomed flower
        if (allNewFlowers.length > 0 && butterfliesRef.current.length > 0) {
          const luckyFlower = allNewFlowers[0];
          const luckyBf = butterfliesRef.current[Math.floor(Math.random() * butterfliesRef.current.length)];
          luckyBf.anchorX = luckyFlower.x;
          luckyBf.anchorY = luckyFlower.y;
        }

        setBotanicalLife((prev) => ({
          flowers: [...prev.flowers, ...allNewFlowers].slice(-160), // generous flower capacity
          sparkles: [...prev.sparkles, ...allNewSparkles].slice(-240),
          vines: [...prev.vines, ...allNewVines].slice(-140)
        }));
      }
    }

    currentStrokeRef.current = null;
    lastPointRef.current = null;

    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Main Render Loop: Deep Green Studio + Continuous Flower Rain + Glowing Kolam + Butterflies
  useEffect(() => {
    const canvas = actualCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let startTime = performance.now();

    const render = (currentTime) => {
      const time = currentTime - startTime;
      const dpr = window.devicePixelRatio || 1;
      const width = dimensions.width;
      const height = dimensions.height;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Deep Forest Green Canvas Background
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, '#09251D'); // dark emerald core
      bgGrad.addColorStop(1, '#061D17'); // deep forest edge
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Greenish Dot Grid
      if (showGrid) {
        const dots = getGridDots();
        dots.forEach((dot) => {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = '#1A4234';
          ctx.fill();
        });
      }

      // 3. BACKGROUND FLOWER & LEAF RAIN (Drifting behind the kolam)
      if (flowerRainRef.current.length > 0) {
        renderFlowerRain(ctx, flowerRainRef.current, width, height, time, 'back');
      }

      // 4. Render Kolam Strokes with Layered Glowing Gold & Crisp Ivory Core
      const center = { x: width / 2, y: height / 2 };

      strokes.forEach((stroke) => {
        const pts = stroke.points;
        if (!pts || pts.length < 2) return;

        const symReps = stroke.symmetry && stroke.symmetry !== 'none'
          ? (stroke.symmetry === 'mirror' ? 2 : stroke.symmetry === '4-fold' ? 4 : 8)
          : 1;

        for (let rep = 0; rep < symReps; rep++) {
          ctx.save();
          ctx.translate(center.x, center.y);
          if (stroke.symmetry === 'mirror' && rep === 1) {
            ctx.scale(-1, 1);
          } else if (stroke.symmetry === '4-fold') {
            ctx.rotate((rep * Math.PI) / 2);
          } else if (stroke.symmetry === '8-fold') {
            ctx.rotate((rep * Math.PI) / 4);
          }
          ctx.translate(-center.x, -center.y);

          if (!stroke.isEraser) {
            // LAYER 1: Wide Golden Ambient Glow
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < pts.length; i++) {
              const xc = (pts[i].x + pts[i - 1].x) / 2;
              const yc = (pts[i].y + pts[i - 1].y) / 2;
              ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, xc, yc);
            }
            ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);

            ctx.shadowColor = 'rgba(255, 217, 130, 0.45)';
            ctx.shadowBlur = 14;
            ctx.strokeStyle = 'rgba(246, 198, 107, 0.55)';
            ctx.lineWidth = stroke.width + 4.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            // LAYER 2: Bright Ivory-Gold Core Line
            ctx.shadowBlur = 0;
            ctx.strokeStyle = stroke.color || '#FFF8EA';
            ctx.lineWidth = stroke.width;
            ctx.stroke();
          } else {
            // Eraser stroke
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < pts.length; i++) {
              ctx.lineTo(pts[i].x, pts[i].y);
            }
            ctx.strokeStyle = '#061D17';
            ctx.lineWidth = stroke.width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
          }

          ctx.restore();
        }
      });

      // 5. Render Abundant Kolam Botanical Life (Flowers, Starlight Dots, Vines)
      renderBotanicalLife(ctx, {
        flowers: botanicalLife.flowers,
        sparkles: botanicalLife.sparkles,
        vines: botanicalLife.vines,
        butterflies: [] // butterflies rendered on top layer
      }, time);

      // 6. FOREGROUND FLOWER & LEAF RAIN (Passing gently in front of the kolam)
      if (flowerRainRef.current.length > 0) {
        renderFlowerRain(ctx, flowerRainRef.current, width, height, time, 'front');
      }

      // 7. Render Flurry of Beautiful Fluttering Butterflies
      if (butterfliesRef.current.length > 0) {
        renderBotanicalLife(ctx, {
          flowers: [],
          sparkles: [],
          vines: [],
          butterflies: butterfliesRef.current
        }, time);
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [actualCanvasRef, dimensions, strokes, botanicalLife, showGrid, getGridDots]);

  // Undo
  const undoLastStroke = () => {
    if (strokes.length === 0) return;
    setStrokes((prev) => prev.slice(0, -1));
    setBotanicalLife((prev) => ({
      flowers: prev.flowers.slice(0, Math.max(0, prev.flowers.length - 4)),
      sparkles: prev.sparkles.slice(0, Math.max(0, prev.sparkles.length - 12)),
      vines: prev.vines.slice(0, Math.max(0, prev.vines.length - 4))
    }));
  };

  // Clear
  const clearArtwork = () => {
    setStrokes([]);
    setBotanicalLife({
      flowers: [],
      sparkles: [],
      vines: []
    });
  };

  // Load Pattern with Abundant Flowers
  const loadPattern = (pattern) => {
    clearArtwork();
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const scale = Math.min(dimensions.width, dimensions.height) / 680;
    const starterStrokes = pattern.generateStrokes(cx, cy, scale);

    setStrokes(starterStrokes);

    let allNewFlowers = [];
    let allNewSparkles = [];
    let allNewVines = [];

    starterStrokes.forEach((stroke) => {
      const life = analyzeStrokeForLife(stroke, starterStrokes);
      allNewFlowers.push(...life.flowers);
      allNewSparkles.push(...life.sparkles);
      allNewVines.push(...life.vines);
    });

    // Distribute butterflies around the awakened pattern
    if (butterfliesRef.current.length > 0) {
      butterfliesRef.current.forEach((bf, idx) => {
        const ang = (idx / butterfliesRef.current.length) * Math.PI * 2;
        const dist = 70 + (idx % 3) * 35;
        bf.anchorX = cx + Math.cos(ang) * dist;
        bf.anchorY = cy + Math.sin(ang) * dist;
      });
    }

    setBotanicalLife({
      flowers: allNewFlowers,
      sparkles: allNewSparkles,
      vines: allNewVines
    });

    soundEngine.playCelebrationHarmony();
  };

  useEffect(() => {
    window.__UYIR_KOLAM__ = {
      undo: undoLastStroke,
      clear: clearArtwork,
      loadPattern,
      exportPNG: (customFilename = 'uyir-kolam-living-art.png') => {
        const canvas = actualCanvasRef.current;
        if (!canvas) return null;
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = customFilename;
        link.href = dataUrl;
        link.click();
        return dataUrl;
      }
    };
  }, [strokes, dimensions]);

  return (
    <div
      ref={containerRef}
      className="canvas-viewport"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        touchAction: 'none',
        overflow: 'hidden',
        userSelect: 'none',
        cursor: isEraser ? 'cell' : 'crosshair'
      }}
    >
      <canvas
        ref={actualCanvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
