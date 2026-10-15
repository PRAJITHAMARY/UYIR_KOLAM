/**
 * UYIR KOLAM - STARTER PATTERNS
 * Exact traditional geometries matching the reference:
 * - 4-Lobed Infinity Loop Kolam (Panel 3 & 6)
 * - 8-Fold Sacred Lotus Mandala (Panel 4)
 * - Radiant Surya Sun (Panel 1)
 * - Diamond Pulli Star Kolam
 */

import { COLOR_PALETTE } from './botanicalLife';

export const STARTER_PATTERNS = [
  {
    id: 'sikku_mandala',
    name: 'Sikku Mandala',
    tamilName: 'சுழி கோலம்',
    category: 'Infinite Loop',
    recommendedGrid: true,
    generateStrokes: (cx, cy, scale = 1) => {
      const strokes = [];
      const R = 95 * scale;

      // 4 graceful clover loops matching Panel 3 & Panel 6
      const loopSteps = 72;
      const pts = [];
      for (let i = 0; i <= loopSteps; i++) {
        const t = (i / loopSteps) * Math.PI * 2;
        // 4-leaf rose / clover curve
        const r = R * (0.35 + 0.65 * Math.sin(2 * t) * Math.sin(2 * t));
        const x = cx + r * Math.cos(t);
        const y = cy + r * Math.sin(t);
        pts.push({ x, y });
      }

      strokes.push({
        id: 'sikku_loop_main',
        points: pts,
        color: '#FFF8EA',
        width: 2.8
      });

      // Intersecting graceful cross arcs
      for (let a = 0; a < 4; a++) {
        const angle = (a * Math.PI) / 2;
        const arcPts = [];
        for (let s = 0; s <= 20; s++) {
          const t = (s / 20) * Math.PI;
          const dist = 35 * scale + Math.sin(t) * (70 * scale);
          const px = cx + Math.cos(angle) * dist;
          const py = cy + Math.sin(angle) * dist;
          arcPts.push({ x: px, y: py });
        }
        strokes.push({
          id: `sikku_petal_${a}`,
          points: arcPts,
          color: '#F6C66B',
          width: 2.6
        });
      }

      return strokes;
    }
  },
  {
    id: 'thamarai_reveal',
    name: 'Sacred Lotus',
    tamilName: 'தாமரை மண்டலம்',
    category: 'Sacred Mandala',
    recommendedGrid: true,
    generateStrokes: (cx, cy, scale = 1) => {
      const strokes = [];
      const R = 110 * scale;
      const rInner = 38 * scale;

      // 8 Outer Petals (Panel 4)
      for (let i = 0; i < 8; i++) {
        const theta1 = (i / 8) * Math.PI * 2;
        const theta2 = ((i + 1) / 8) * Math.PI * 2;
        const thetaMid = (theta1 + theta2) / 2;

        const p1 = { x: cx + Math.cos(theta1) * rInner, y: cy + Math.sin(theta1) * rInner };
        const pTip = { x: cx + Math.cos(thetaMid) * R, y: cy + Math.sin(thetaMid) * R };
        const p2 = { x: cx + Math.cos(theta2) * rInner, y: cy + Math.sin(theta2) * rInner };

        const points = [];
        const steps = 18;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const bx = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * pTip.x + t * t * p2.x;
          const by = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * pTip.y + t * t * p2.y;
          points.push({ x: bx, y: by });
        }

        strokes.push({
          id: `thamarai_petal_${i}`,
          points,
          color: '#FFF8EA',
          width: 2.8
        });
      }

      // Inner Core Ring
      const innerPts = [];
      for (let a = 0; a <= 36; a++) {
        const ang = (a / 36) * Math.PI * 2;
        innerPts.push({
          x: cx + Math.cos(ang) * (rInner * 0.75),
          y: cy + Math.sin(ang) * (rInner * 0.75)
        });
      }
      strokes.push({
        id: 'thamarai_inner_core',
        points: innerPts,
        color: '#F6C66B',
        width: 2.6
      });

      return strokes;
    }
  },
  {
    id: 'surya_dawn',
    name: 'Surya Sun',
    tamilName: 'சூரிய ஒளி',
    category: 'Celestial',
    recommendedGrid: false,
    generateStrokes: (cx, cy, scale = 1) => {
      const strokes = [];
      const centerR = 32 * scale;
      const rayOuter = 100 * scale;

      const sunDisc = [];
      for (let i = 0; i <= 32; i++) {
        const a = (i / 32) * Math.PI * 2;
        sunDisc.push({ x: cx + Math.cos(a) * centerR, y: cy + Math.sin(a) * centerR });
      }
      strokes.push({
        id: 'sun_disc',
        points: sunDisc,
        color: '#F6C66B',
        width: 3.2
      });

      for (let r = 0; r < 8; r++) {
        const baseAngle = (r / 8) * Math.PI * 2;
        const pts = [];
        for (let s = 0; s <= 12; s++) {
          const t = s / 12;
          const dist = centerR + (rayOuter - centerR) * t;
          const wave = Math.sin(t * Math.PI * 2) * (7 * scale);
          pts.push({
            x: cx + Math.cos(baseAngle) * dist - Math.sin(baseAngle) * wave,
            y: cy + Math.sin(baseAngle) * dist + Math.cos(baseAngle) * wave
          });
        }
        strokes.push({
          id: `sun_ray_${r}`,
          points: pts,
          color: '#FFF8EA',
          width: 2.6
        });
      }

      return strokes;
    }
  },
  {
    id: 'diamond_star',
    name: 'Diamond Pulli Star',
    tamilName: 'நட்சத்திர கோலம்',
    category: 'Geometric Star',
    recommendedGrid: true,
    generateStrokes: (cx, cy, scale = 1) => {
      const strokes = [];
      const s = 45 * scale;
      const starPts = [
        { x: cx, y: cy - s * 2.2 },
        { x: cx + s * 0.7, y: cy - s * 0.7 },
        { x: cx + s * 2.2, y: cy },
        { x: cx + s * 0.7, y: cy + s * 0.7 },
        { x: cx, y: cy + s * 2.2 },
        { x: cx - s * 0.7, y: cy + s * 0.7 },
        { x: cx - s * 2.2, y: cy },
        { x: cx - s * 0.7, y: cy - s * 0.7 },
        { x: cx, y: cy - s * 2.2 }
      ];

      strokes.push({
        id: 'diamond_star_loop',
        points: starPts,
        color: '#FFF8EA',
        width: 2.8
      });

      return strokes;
    }
  }
];
