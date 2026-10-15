/**
 * UYIR KOLAM - ENHANCED BOTANICAL & MAGICAL LIFE ENGINE
 * - Continuous Magical Flower & Leaf Rain (Background & Foreground depth)
 * - Abundant Blooming Flowers (Blush Pink, Coral, Peach, Orange, Ivory)
 * - Flurry of Beautiful Fluttering Butterflies (Gold, Amber, Peach, Cream, Blue)
 * - Sparkling Golden Stardust & Pollen Particles
 */

export const COLOR_PALETTE = {
  forestDeep: '#061D17',
  emeraldDark: '#09251D',
  emeraldSecondary: '#10352A',
  ivoryCore: '#FFF8EA',
  warmGold: '#F6C66B',
  goldGlow: 'rgba(255, 217, 130, 0.45)',
  goldSparkle: '#FFD982',
  flowerPink: '#F28D96',
  flowerCoral: '#E99A78',
  flowerPeach: '#F6B58F',
  flowerOrange: '#F6A64A',
  flowerIvory: '#F8F3E7',
  leafSage: '#9AA77B',
  leafOlive: '#718A62',
  leafMoss: '#527A59',
  leafGolden: '#B3A86B'
};

const FLOWER_COLORS = [
  COLOR_PALETTE.flowerPink,
  COLOR_PALETTE.flowerCoral,
  COLOR_PALETTE.flowerPeach,
  COLOR_PALETTE.flowerOrange,
  COLOR_PALETTE.flowerIvory
];

const LEAF_COLORS = [
  COLOR_PALETTE.leafSage,
  COLOR_PALETTE.leafOlive,
  COLOR_PALETTE.leafMoss,
  COLOR_PALETTE.leafGolden
];

export function getDistance(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getLineIntersection(p1, p2, p3, p4) {
  const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
  if (Math.abs(d) < 0.0001) return null;

  const u = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
  const v = ((p3.x - p1.x) * (p2.y - p1.y) - (p3.y - p1.y) * (p2.x - p1.x)) / d;

  if (u >= 0.05 && u <= 0.95 && v >= 0.05 && v <= 0.95) {
    return {
      x: p1.x + u * (p2.x - p1.x),
      y: p1.y + u * (p2.y - p1.y),
      angle: Math.atan2(p2.y - p1.y, p2.x - p1.x)
    };
  }
  return null;
}

/**
 * 1. CONTINUOUS MAGICAL FLOWER & LEAF RAIN SYSTEM
 * Creates an object pool of falling petals, small flowers, and botanical leaves.
 */
export function createFlowerRainSystem(width, height, count = 75) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(spawnRainParticle(width, height, true));
  }
  return particles;
}

export function spawnRainParticle(width, height, isInitial = false) {
  const types = ['petal', 'petal', 'flower', 'leaf', 'leaf', 'sparkle'];
  const type = types[Math.floor(Math.random() * types.length)];

  let color;
  let size;
  if (type === 'petal' || type === 'flower') {
    color = FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)];
    size = type === 'flower' ? 8 + Math.random() * 6 : 5 + Math.random() * 6;
  } else if (type === 'leaf') {
    color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
    size = 6 + Math.random() * 7;
  } else {
    color = COLOR_PALETTE.goldSparkle;
    size = 1.8 + Math.random() * 2.2;
  }

  const isForeground = Math.random() < 0.4; // 40% drift in front of the kolam

  return {
    x: Math.random() * width,
    y: isInitial ? Math.random() * height : -15 - Math.random() * 40,
    speedY: 0.65 + Math.random() * 1.15,
    speedX: (Math.random() - 0.5) * 0.45,
    swaySpeed: 0.0018 + Math.random() * 0.0022,
    swayAmp: 0.8 + Math.random() * 1.4,
    swayPhase: Math.random() * Math.PI * 2,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.035,
    flipPhase: Math.random() * Math.PI * 2,
    type,
    color,
    size,
    isForeground,
    opacity: isForeground ? 0.75 + Math.random() * 0.25 : 0.45 + Math.random() * 0.35
  };
}

/**
 * Updates and renders the flower & leaf rain
 */
export function renderFlowerRain(ctx, rainParticles, width, height, time, layer = 'all') {
  for (let i = 0; i < rainParticles.length; i++) {
    const p = rainParticles[i];

    // Filter by depth layer (background or foreground)
    if (layer === 'back' && p.isForeground) continue;
    if (layer === 'front' && !p.isForeground) continue;

    // Update position
    p.y += p.speedY;
    p.x += p.speedX + Math.sin(time * p.swaySpeed + p.swayPhase) * p.swayAmp;
    p.rot += p.rotSpeed;

    // Recycle particle when it exits bottom of screen
    if (p.y > height + 25 || p.x < -30 || p.x > width + 30) {
      const recycled = spawnRainParticle(width, height, false);
      Object.assign(p, recycled);
      continue;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.opacity;

    // 3D tumble sway
    const tumbleScale = Math.sin(time * 0.003 + p.flipPhase);

    if (p.type === 'petal') {
      ctx.scale(1, Math.max(0.2, Math.abs(tumbleScale)));
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Subtle delicate petal center highlight
      ctx.strokeStyle = '#FFF6F0';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.6);
      ctx.lineTo(0, p.size * 0.6);
      ctx.stroke();
    } else if (p.type === 'flower') {
      // Tiny drifting blossom
      ctx.scale(Math.max(0.3, Math.abs(tumbleScale)), 1);
      const petCount = 5;
      const r = p.size * 0.6;
      for (let k = 0; k < petCount; k++) {
        ctx.save();
        ctx.rotate((k * Math.PI * 2) / petCount);
        ctx.beginPath();
        ctx.ellipse(0, -r, r * 0.45, r * 0.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = COLOR_PALETTE.warmGold;
      ctx.fill();
    } else if (p.type === 'leaf') {
      // Botanical leaf
      ctx.scale(Math.max(0.25, Math.abs(tumbleScale)), 1);
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.3, p.size * 0.6, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.5, -p.size * 0.6, -p.size * 0.3, 0, -p.size);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Leaf center rib
      ctx.strokeStyle = '#DDE8D3';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.8);
      ctx.lineTo(0, p.size * 0.8);
      ctx.stroke();
    } else if (p.type === 'sparkle') {
      // Twinkling golden stardust
      const tw = 0.6 + 0.4 * Math.sin(time * 0.005 + p.swayPhase);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * tw, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

/**
 * 2. ABUNDANT FLOWERS ON THE KOLAM
 * Analyzes strokes to generate abundant flowers along curves, lines, crossings, and endpoints.
 */
export function analyzeStrokeForLife(stroke, allStrokes = []) {
  const points = stroke.points;
  if (!points || points.length < 2) return { flowers: [], sparkles: [], vines: [] };

  const newFlowers = [];
  const newSparkles = [];
  const newVines = [];

  const startPt = points[0];
  const endPt = points[points.length - 1];

  // Endpoints: spawn glowing starlight dots and floral buds
  if (startPt) {
    newSparkles.push(createSparkle(startPt.x, startPt.y, true));
    newFlowers.push(createBloom(startPt.x, startPt.y, 0, 'bud'));
  }
  if (endPt && getDistance(startPt, endPt) > 18) {
    newSparkles.push(createSparkle(endPt.x, endPt.y, true));
    newFlowers.push(createBloom(endPt.x, endPt.y, 0, 'bud'));
  }

  // Golden stardust along path
  for (let i = 2; i < points.length; i += 3) {
    const pt = points[i];
    if (Math.random() < 0.55) {
      newSparkles.push(createSparkle(pt.x + (Math.random() - 0.5) * 8, pt.y + (Math.random() - 0.5) * 8));
    }
  }

  // Curvature & Midpoint Flowers: Distribute flowers and buds along curved arcs
  let accumulatedDist = 0;
  for (let i = 2; i < points.length; i += 3) {
    const pPrev = points[i - 2];
    const pCurr = points[i];
    accumulatedDist += getDistance(pPrev, pCurr);

    const angle1 = Math.atan2(pCurr.y - pPrev.y, pCurr.x - pPrev.x);

    // Sprout leafy tendril
    if (Math.random() < 0.4) {
      newVines.push({
        x: pCurr.x,
        y: pCurr.y,
        angle: angle1 + (Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2),
        scale: 0,
        progress: 0,
        length: 12 + Math.random() * 10
      });
    }

    // Bloom flower along long curve segments (every ~45px)
    if (accumulatedDist > 45 && Math.random() < 0.7) {
      newFlowers.push(createBloom(pCurr.x, pCurr.y, angle1, 'medium'));
      accumulatedDist = 0;
    }
  }

  // Intersections & loops -> Layered blooming flowers
  if (points.length > 8) {
    for (let i = 0; i < points.length - 5; i += 3) {
      for (let j = i + 5; j < points.length - 1; j += 3) {
        const hit = getLineIntersection(points[i], points[i + 1], points[j], points[j + 1]);
        if (hit) {
          newFlowers.push(createBloom(hit.x, hit.y, hit.angle, 'large'));
        }
      }
    }
  }

  // Intersections with prior strokes
  const step = 3;
  for (let i = 0; i < points.length - 1; i += step) {
    const p1 = points[i];
    const p2 = points[Math.min(i + step, points.length - 1)];

    for (const other of allStrokes) {
      if (other === stroke) continue;
      const oPts = other.points;
      for (let j = 0; j < oPts.length - 1; j += step) {
        const p3 = oPts[j];
        const p4 = oPts[Math.min(j + step, oPts.length - 1)];
        const hit = getLineIntersection(p1, p2, p3, p4);
        if (hit) {
          newFlowers.push(createBloom(hit.x, hit.y, hit.angle, 'large'));
        }
      }
    }
  }

  return {
    flowers: newFlowers,
    sparkles: newSparkles,
    vines: newVines
  };
}

/**
 * Creates layered flowers with glowing centers & highlights (Bud, Medium, Large)
 */
export function createBloom(x, y, angle = 0, variety = 'medium') {
  const color = FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)];
  const isLarge = variety === 'large';
  const isBud = variety === 'bud';

  const baseSize = isBud ? 8 + Math.random() * 3 : isLarge ? 17 + Math.random() * 5 : 12 + Math.random() * 4;
  const petalCount = isBud ? 4 : isLarge ? 8 : 5 + Math.floor(Math.random() * 2);

  return {
    id: `flower_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    x,
    y,
    baseAngle: angle,
    swayPhase: Math.random() * Math.PI * 2,
    size: baseSize,
    petalColor: color,
    centerColor: COLOR_PALETTE.warmGold,
    petalCount,
    isBud,
    progress: 0,
    scale: 0,
    maxScale: 1.0 + (Math.random() - 0.5) * 0.15
  };
}

export function createSparkle(x, y, isNode = false) {
  return {
    id: `sparkle_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    x,
    y,
    anchorX: x,
    anchorY: y,
    size: isNode ? 3.5 : 1.5 + Math.random() * 2,
    isNode,
    phase: Math.random() * Math.PI * 2,
    pulseSpeed: 1.8 + Math.random() * 2.2,
    color: isNode ? '#FFF8EA' : COLOR_PALETTE.goldSparkle
  };
}

/**
 * 3. FLURRY OF BEAUTIFUL BUTTERFLIES
 * Ambient flurry of 8–12 butterflies floating across the canvas, around flowers and edges.
 */
export function createButterflyFlurry(width, height, count = 8) {
  const butterflies = [];
  const butterflyTypes = ['gold', 'amber', 'peach', 'coral', 'cream', 'blue'];

  for (let i = 0; i < count; i++) {
    const type = butterflyTypes[i % butterflyTypes.length];
    // Distribute around center and corners
    const anchorX = width * 0.2 + Math.random() * width * 0.6;
    const anchorY = height * 0.2 + Math.random() * height * 0.6;

    butterflies.push({
      id: `butterfly_${i}_${Date.now()}`,
      x: anchorX,
      y: anchorY,
      anchorX,
      anchorY,
      targetX: anchorX,
      targetY: anchorY,
      type,
      scale: 0.55 + Math.random() * 0.35,
      speed: 0.65 + Math.random() * 0.5,
      orbitRadiusX: 45 + Math.random() * 65,
      orbitRadiusY: 30 + Math.random() * 45,
      orbitAngle: Math.random() * Math.PI * 2,
      flapSpeed: 0.014 + Math.random() * 0.008,
      flapPhase: Math.random() * Math.PI * 2
    });
  }
  return butterflies;
}

/**
 * Render botanical elements on canvas: vines, flowers, starlight dots, and butterflies
 */
export function renderBotanicalLife(ctx, lifeData, time = 0) {
  const { flowers = [], sparkles = [], vines = [], butterflies = [] } = lifeData;

  // 1. Render Leaf Tendril Sprigs
  vines.forEach((vine) => {
    if (vine.progress < 1) vine.progress = Math.min(1, vine.progress + 0.05);
    const curLen = vine.length * vine.progress;
    if (curLen < 2) return;

    ctx.save();
    ctx.translate(vine.x, vine.y);
    ctx.rotate(vine.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(curLen * 0.4, 4, curLen, 2);
    ctx.strokeStyle = COLOR_PALETTE.leafOlive;
    ctx.lineWidth = 1.3;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Sprout small leaf
    ctx.save();
    ctx.translate(curLen * 0.8, 2);
    ctx.rotate(0.5);
    ctx.beginPath();
    ctx.ellipse(0, 0, 4.5 * vine.progress, 2.2 * vine.progress, 0, 0, Math.PI * 2);
    ctx.fillStyle = COLOR_PALETTE.leafSage;
    ctx.fill();
    ctx.restore();

    ctx.restore();
  });

  // 2. Render Abundant Layered Flowers & Buds
  flowers.forEach((flower) => {
    if (flower.progress < 1) {
      flower.progress = Math.min(1, flower.progress + 0.055);
      const p = flower.progress;
      flower.scale = flower.maxScale * Math.sin(p * Math.PI * 0.5) * (1 + 0.12 * Math.sin(p * Math.PI));
    }

    if (flower.scale <= 0.01) return;

    ctx.save();
    ctx.translate(flower.x, flower.y);
    const sway = Math.sin(time * 0.002 + flower.swayPhase) * 0.05;
    ctx.rotate(flower.baseAngle + sway);
    ctx.scale(flower.scale, flower.scale);

    const r = flower.size;

    // Ambient petal halo
    const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, r * 1.7);
    glow.addColorStop(0, 'rgba(255, 217, 130, 0.45)');
    glow.addColorStop(1, 'rgba(6, 29, 23, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.7, 0, Math.PI * 2);
    ctx.fill();

    // Outer Petals
    const step = (Math.PI * 2) / flower.petalCount;
    for (let i = 0; i < flower.petalCount; i++) {
      ctx.save();
      ctx.rotate(i * step);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-r * 0.35, -r * 0.55, -r * 0.25, -r * 0.95, 0, -r);
      ctx.bezierCurveTo(r * 0.25, -r * 0.95, r * 0.35, -r * 0.55, 0, 0);

      ctx.fillStyle = flower.petalColor;
      ctx.fill();

      // Subtle delicate petal center vein highlight
      ctx.strokeStyle = '#FFF3EB';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.2);
      ctx.lineTo(0, -r * 0.75);
      ctx.stroke();

      ctx.restore();
    }

    // Inner Layer for Large Flowers
    if (flower.petalCount >= 8) {
      const innerR = r * 0.62;
      for (let i = 0; i < flower.petalCount; i++) {
        ctx.save();
        ctx.rotate(i * step + step * 0.5);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-innerR * 0.3, -innerR * 0.5, -innerR * 0.2, -innerR, 0, -innerR);
        ctx.bezierCurveTo(innerR * 0.2, -innerR, innerR * 0.3, -innerR * 0.5, 0, 0);
        ctx.fillStyle = '#FFF8F0';
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.restore();
      }
    }

    // Golden pistil & stamen core
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.26, 0, Math.PI * 2);
    ctx.fillStyle = flower.centerColor;
    ctx.fill();

    // Center pollen dots
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, 0, 1.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });

  // 3. Render Sparkling Golden Particles & Node Dots
  sparkles.forEach((sparkle) => {
    const t = time * 0.003 * sparkle.pulseSpeed + sparkle.phase;
    const pulse = 0.55 + 0.45 * Math.sin(t);
    const r = sparkle.size * (0.8 + pulse * 0.4);

    if (sparkle.isNode) {
      const grad = ctx.createRadialGradient(sparkle.x, sparkle.y, 0, sparkle.x, sparkle.y, r * 3.5);
      grad.addColorStop(0, 'rgba(255, 217, 130, 0.85)');
      grad.addColorStop(0.5, 'rgba(246, 198, 107, 0.35)');
      grad.addColorStop(1, 'rgba(6, 29, 23, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(sparkle.x, sparkle.y, r * 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFF8EA';
      ctx.beginPath();
      ctx.arc(sparkle.x, sparkle.y, r * 0.9, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.save();
      ctx.globalAlpha = 0.45 + pulse * 0.55;
      ctx.fillStyle = sparkle.color;
      ctx.beginPath();
      ctx.arc(sparkle.x, sparkle.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });

  // 4. Render Flurry of Animated Butterflies
  butterflies.forEach((bf) => {
    bf.orbitAngle += 0.015 * bf.speed;

    // Smooth wandering curved trajectory
    const currX = bf.anchorX + Math.cos(bf.orbitAngle) * bf.orbitRadiusX;
    const currY = bf.anchorY + Math.sin(bf.orbitAngle * 1.3) * bf.orbitRadiusY;

    const heading = Math.atan2(
      Math.sin(bf.orbitAngle * 1.3) * bf.orbitRadiusY,
      Math.cos(bf.orbitAngle) * bf.orbitRadiusX
    ) + Math.PI / 2;

    const flap = Math.abs(Math.sin(time * bf.flapSpeed + bf.flapPhase));

    ctx.save();
    ctx.translate(currX, currY);
    ctx.rotate(heading);
    ctx.scale(bf.scale, bf.scale);

    let wingColor, innerColor;
    if (bf.type === 'gold') {
      wingColor = '#F6A64A';
      innerColor = '#F6C66B';
    } else if (bf.type === 'amber') {
      wingColor = '#E2A747';
      innerColor = '#FFD982';
    } else if (bf.type === 'peach') {
      wingColor = '#F6B58F';
      innerColor = '#FFF0EE';
    } else if (bf.type === 'coral') {
      wingColor = '#E99A78';
      innerColor = '#F28D96';
    } else if (bf.type === 'cream') {
      wingColor = '#F8F3E7';
      innerColor = '#FFD982';
    } else {
      wingColor = '#5CB7E8';
      innerColor = '#99DBFA';
    }

    // Left Wing
    ctx.save();
    ctx.scale(flap, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-14, -14, -20, -6, -18, 6);
    ctx.bezierCurveTo(-15, 14, -5, 12, 0, 4);
    ctx.fillStyle = wingColor;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -8, -14, -3, -12, 4);
    ctx.fillStyle = innerColor;
    ctx.fill();
    ctx.restore();

    // Right Wing
    ctx.save();
    ctx.scale(flap, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(14, -14, 20, -6, 18, 6);
    ctx.bezierCurveTo(15, 14, 5, 12, 0, 4);
    ctx.fillStyle = wingColor;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(10, -8, 14, -3, 12, 4);
    ctx.fillStyle = innerColor;
    ctx.fill();
    ctx.restore();

    // Body
    ctx.fillStyle = '#1A1814';
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });
}
