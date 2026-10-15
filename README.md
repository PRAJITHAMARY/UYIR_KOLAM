<div align="center">

🌿 UYIR KOLAM (உயிர் கோலம்)

Every Line Brings a Little Life

<img src="https://readme-typing-svg.demolab.com?font=Cormorant+Garamond&size=28&duration=3000&pause=900&color=E8C66A&center=true&vCenter=true&width=650&lines=Every+Line+Brings+a+Little+Life;Where+Tradition+Meets+Technology;Draw.+Create.+Bloom." alt="Animated Uyir Kolam heading" />

An Interactive Digital Garden Inspired by Traditional Indian Kolam

<p align="center">
  <a href="https://uyir-kolam.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌿%20LIVE%20PROJECT-Explore%20Uyir%20Kolam-FFD982?style=for-the-badge&labelColor=061D17&color=FFD982" alt="Live Uyir Kolam Project" />
  </a>
</p>

---

## 1. Project Concept & Creative Vision

Across South India, every morning before sunrise, the household threshold is swept clean, washed, and adorned with **Kolam**—an intricate geometrical art drawn freehand using coarse white rice flour (*arisi maavu*).

Traditionally, this dawn ritual is an act of daily hospitality, mindfulness, and sacred compassion (*bhuta yajna*), naturally feeding ants, birds, and tiny creatures of the soil.

**Uyir Kolam** transforms this ancient everyday ritual into a living, responsive digital sanctuary where human gestures awaken nature:
- **Draw a curve** → Tender vines and spiraling leaves sprout along the path.
- **Cross lines or form loops** → Sacred Lotus, Jasmine (*Mallipoo*), and Marigold flowers blossom.
- **Touch dots or endpoints** → Glowing fireflies awaken and drift peacefully.
- **Draw with symmetry** → Mathematical 4-fold or 8-fold sacred mandalas form effortlessly.
- **Listen** → Procedural Web Audio chimes tuned to the morning pentatonic scale (*Raag Mohanam / Bhupali*) harmonize with your hand.
- **Reveal the garden** → The artwork celebrates with drifting blossom petals and exportable high-resolution imagery.

The magic emerges from **active human participation**, transforming geometry into living botanical vitality.

---

## 2. Features Actually Implemented

1. **Exact Visual Reproduction of the Reference Design**:
   - **Deep Forest Green Canvas (`#061D17` to `#09251D`)**: High-contrast, dark botanical atmosphere with delicate green dot grid (`#1A4234`).
   - **Warm Parchment Editorial Screens (`#F3E8CE`)**: Natural sunlight foliage shadows, traditional brass oil lamp (*kuthu vilakku / deepam*), and blooming lotus art.
   - **Left Floating Vertical Dock**: Pen tool, Coral/Gold/Ivory color swatches, symmetry stroke wave, and sleek Dot Grid switch toggle.
   - **Top Header Bar**: Editorial serif wordmark, instruction subtitle, and Undo/Clear pill controls.
   - **Bottom Pattern Carousel Strip**: One-click thumbnail selectors with pagination arrows for traditional kolams.
   - **Completed Artwork Reveal Dock**: Warm message (*“A little magic, made by you.”*), *Return to Canvas*, *Save Artwork*, and *Create Another*.
   - **About / Information Screen**: 4 illustrated cards (*Inspired by Tradition*, *How It Works*, *The Feeling*, *Current Prototype*).

2. **Continuous Magical Flower & Leaf Rain System**:
   - Natural, peaceful rainfall of delicate petals (blush pink, coral, peach, ivory, warm orange), small flower blossoms, and botanical leaves (muted sage, olive, moss green, subdued golden-green).
   - Rendered with layered atmospheric depth: background rain drifts behind the kolam while foreground petals gently float across the front.
   - Smooth 3D tumbling rotation, natural drift trajectories, and twinkling golden sparkles.
   - High-performance object recycling with zero memory garbage collection.

3. **Abundant Blooming Flowers on the Kolam**:
   - Small and medium-sized layered flowers blooming along golden lines, curves, intersections, and endpoints.
   - Delicate blush pink (`#F28D96`), soft coral (`#E99A78`), peach (`#F6B58F`), warm orange (`#F6A64A`), and ivory (`#F8F3E7`) with glowing golden stamen centers.
   - Tiny floral buds and orbiting starlight pollen particles.

4. **Flurry of Beautiful Fluttering Butterflies**:
   - An active flock of 8–10 butterflies in warm gold, amber, peach, coral, cream, and soft blue morpho.
   - Smooth curved flight paths with independent wing flapping speeds and 2.5D perspective.
   - Butterflies orbit the kolam, hover near blooming flowers, and cruise gracefully across the canvas.

5. **Luminous Glowing Kolam Drawing Effect**:
   - Layered rendering: Wide transparent golden glow (`#FFD982`) + crisp bright ivory-gold core line (`#FFF8EA`).
   - Sparkling golden particles and radiant node dots along the stroke path.

6. **High-DPI Interactive Drawing Engine**:
   - Responsive HTML5 Canvas with hardware acceleration and DPR scaling.
   - Pointer capture supporting desktop mouse, trackpad, and mobile capacitive touch.
   - Prevents accidental mobile page scrolling and zooming during active drawing (`touch-action: none`).

7. **Installable Progressive Web App (PWA)**:
   - Configured `manifest.json` with theme color `#061D17` and standalone display mode.
   - Service worker `sw.js` with offline caching strategy.
   - Installable on Android Chrome, iOS Safari (Add to Home Screen), and desktop browsers.

8. **Curated Traditional Starter Kolam Patterns**:
   - **Sikku Mandala (Panel 3 & 6)**: 4-lobed infinity ribbon kolam.
   - **Sacred Lotus Mandala (Panel 4)**: 8-fold blooming lotus mandala.
   - **Surya Morning Sun (Panel 1)**: Radiant celestial dawn ray burst.
   - **Diamond Pulli Star**: Traditional geometric pulli star.

9. **Web Audio API Procedural Sound Engine**:
   - Synthesizes morning temple bell/tingsha chimes on flower bloom.
   - Micro-pentatonic kalimba/veena tones while drawing (Raag Mohanam: Sa, Re, Ga, Pa, Dha).
   - Water droplet sound on dot snaps.
   - Harmonic dawn chord on garden reveal.
   - Dedicated mute/unmute control with zero external audio assets required.

10. **Artwork Reveal & High-Res PNG Export**:
   - Celebration state with floating wind-blown flower petals.
   - Real-time garden statistics (blooms awakened, living vines, fireflies dancing).
   - One-click high-resolution PNG artwork download combining the warm rice paper background, dot grid, linework, and living flora.

11. **Accessibility & Control Ergonomics**:
   - Keyboard shortcuts: `Ctrl+Z` / `Cmd+Z` (Undo), `Escape` (Close modals).
   - Graceful Clear Canvas confirmation modal to prevent accidental loss.
   - Fully responsive on desktop, tablet, and mobile browsers.

---

## 3. Technology Stack

- **Core**: React 19, JavaScript (ES2023)
- **Build Tool**: Vite 8
- **Graphics / Rendering**: HTML5 Canvas 2D API (hardware accelerated with Device Pixel Ratio scaling)
- **Audio**: Web Audio API (procedural oscillator networks & envelope shaping)
- **Icons**: Lucide React
- **Typography**: Google Fonts (*Cormorant Garamond*, *Rozha One*, *Plus Jakarta Sans*)
- **Styling**: Vanilla CSS with custom design tokens, responsive CSS variables, and reduced-motion support.

No backend servers, no tracking, no paid APIs, and no credentials required.

---

## 4. Setup & Launch Instructions

### Prerequisites
- Node.js (v18 or higher recommended; verified on Node v24)
- npm (v9 or higher; verified on npm 11)

### Installation
```bash
# Navigate to the project root
cd c:\Users\PRAJITHA\Downloads\UyirKolam

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the local development server
npm run dev
```
Open your browser and navigate to `http://127.0.0.1:5173/` (or the port indicated in your terminal).

### Production Build
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 5. How to Experience Uyir Kolam

1. **Enter the Experience**: On the Welcome Screen, click **“Begin Your Kolam”**.
2. **Draw a Line**: Click/touch and drag across the ivory canvas. Notice delicate veena tones and small glowing fireflies.
3. **Trace a Curve**: Draw an arc or spiral—watch green leafy tendrils sprout organically.
4. **Cross Strokes**: Draw intersecting lines or closed loops—witness sacred Lotus and Jasmine flowers bloom with a resonant temple chime!
5. **Explore Symmetry**: In the bottom toolbar, toggle **4-Fold** or **8-Fold** symmetry to create symmetrical sacred mandalas effortlessly.
6. **Try a Starter Kolam**: Click **“Starter Kolams”** in the header and choose the *Sacred Lotus* or *Eternal Infinity Knot* to see life immediately awaken across the grid.
7. **Reveal Your Garden**: Click **“Reveal Garden”** in the top right to see your garden celebrate with drifting petals, review your garden statistics, and download your high-res artwork as a PNG.

---

## 6. Known Limitations

- **Touch Gestures**: Multi-finger pinch zoom is intentionally disabled within the canvas area to prioritize smooth finger-drawing without accidental viewport displacement.
- **Browser Audio Policy**: In accordance with standard modern browser autoplay policies, Web Audio initializes upon the user's first click or touch interaction.
- **Export Dimensions**: The exported PNG matches the current screen resolution and device pixel ratio of the canvas viewport.

---

## 7. Future Horizons (Everyday Magic Roadmap)

1. **Threshold Floor Projection**:
   Mounting a compact ultra-short-throw projector above the front doorway, casting the interactive garden directly onto the physical floor.
2. **Camera-Based Rice Flour Tracking**:
   Using an overhead lightweight computer-vision model (e.g. MediaPipe / OpenCV) to track traditional rice powder being sprinkled by human hands onto the real ground, dynamically mapping digital vines and flowers over real rice flour in real time.
3. **Community Sanctuary Mode (Festival of Margazhi)**:
   A collaborative multi-device canvas allowing neighborhood families to draw interconnected kolams during the morning Margazhi festival, uniting doorsteps into a shared digital forest.


