# DJXHack Residency 2026 — Submission Outline
## Challenge: Everyday Magic
### Project: UYIR KOLAM (உயிர் கோலம்) — Every Line Brings a Little Life

---

# PAGE 1 — THE IDEA

### 1. Project Title & Tagline
- **Title**: UYIR KOLAM (உயிர் கோலம்)
- **Tagline**: *“Every Line Brings a Little Life”*

### 2. Everyday Indian Moment Being Reimagined
Every morning across South India, before dawn breaks, millions of households perform a quiet ritual: women sweep the threshold clean, sprinkle water mixed with cow dung or turmeric, and draw geometric Kolam designs on the earthen or stone entryway using coarse white rice flour (*arisi maavu*).

This daily habit is not merely decorative. It is an act of sacred mindfulness, geometric meditation, and ancient environmental hospitality (*bhuta yajna*). The rice powder feeds ants, birds, and insects, establishing a silent pact of daily compassion between human habitat and the natural world.

### 3. Intended Audience
- **Cultural Practitioners & Elders**: Grandmothers, mothers, and daughters who draw kolams daily, invited to see their ancient art form celebrated with wonder.
- **Younger & Global Generations**: Tech-forward youth and diaspora who may find traditional rituals distant, offering them an intuitive, tactile bridge to ancestral heritage.
- **Museum & Interactive Art Audiences**: Visitors of cultural institutions and public digital spaces who resonate with generative art, meditative computing, and bio-inspired design.

### 4. Core Concept & Emotional Goal
- **Core Concept**: What if the traditional kolam ritual didn't just metaphorically nourish life, but literally caused a living, responsive botanical garden to take root under your fingers?
- **Emotional Goal**: To replace the passive consumption of screens with an intimate feeling of reverence and creative agency. When users see lines bloom into living lotus petals and kindled fireflies, they experience an instant of childlike awe—the feeling that human intention has the power to bring life to an empty canvas.

---

# PAGE 2 — THE INTERACTION

### 1. Interaction Storyboard (User Action → System Response → Outcome)

| Frame | Moment | User Action | System Response | Living Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **Frame 1** | **The First Touch** | User touches ivory canvas with cursor or finger, beginning a stroke. | Web Audio synthesizes a gentle pentatonic kalimba note (*Raag Mohanam* Sa); rice-powder line flows smoothly. | A luminous firefly awakens at the starting point, drifting in a gentle sinusoidal orbit. |
| **Frame 2** | **The Curvature** | User guides line in an arc or winding swirl around a Pulli dot. | Engine detects angular curvature change (> 0.35 rad) along the segment. | Green tendril vines sprout dynamically along the curve, unfurling delicate leaves with natural spring easing. |
| **Frame 3** | **The Intersection** | Line crosses an earlier stroke or completes a self-loop. | Intersection solver identifies precise crossing coordinates `(x, y)` and angle. | A layered sacred Lotus, Jasmine, or Marigold flower blooms outward, accompanied by a resonant temple tingsha bell chime. |
| **Frame 4** | **The Mandala** | User activates 8-fold radial symmetry and draws a petal motif. | System replicates stroke across 8 symmetric quadrants in real-time. | A breathtaking, complex living mandala forms instantly, teeming with 8 blooming flowers and lush radiating vines. |
| **Frame 5** | **The Celebration** | User clicks "Reveal Living Garden". | Mode shifts to meditative celebration; dawn harmony chord sounds. | Drifting flower petals gently fall across the screen; live stats quantify the living garden; high-res artwork is exported as a lasting keepsake. |

### 2. The Unique Interaction Mechanic
Unlike generic drawing apps where lines are passive colored pixels, **Uyir Kolam treats strokes as nutrient-bearing vines**. 
- Curvature generates vegetative growth (tendrils & leaves).
- Knots, loops, and intersections generate reproductive botanical bloom (flowers).
- Terminus points generate bio-luminescent fauna (fireflies).

The interaction is **deterministic and readable**: the user quickly realizes that their geometric decisions directly dictate the garden's ecology.

---

# PAGE 3 — POSSIBLE APPROACH

### 1. Implementation Approach & Tools
- **Client Architecture**: Lightweight React 19 application built with Vite 8 for instant load and zero runtime bloat.
- **Drawing & Particle Simulation**: HTML5 2D Canvas with hardware acceleration, responsive device pixel ratio handling, midpoint quadratic stroke smoothing, and Bezier curve rendering.
- **Audio Synthesis**: Native Web Audio API procedural synthesis generating tuned pentatonic harmonics (*Sa, Re, Ga, Pa, Dha*) without external audio files, guaranteeing instant response and zero latency.
- **Input Diversity**: Unified Pointer Events API seamlessly handling mouse, multi-touch capacitive mobile screens, and trackpads.

### 2. Current Prototype Capabilities
- Fully functional web application running locally and deployable to any static host (Vercel, Netlify, GitHub Pages).
- 4 curated mathematical starter kolams (Sacred Lotus, Infinity Knot, Surya Sun, Deepam Lamp).
- 4 symmetry modes (Off, 4-fold, 8-fold, Mirror).
- 3 Pulli dot-grid options (None, 5×5, 7×7) with soft magnetic proximity snapping.
- Complete undo history, eraser wash, and canvas clear confirmation.
- 1-click high-resolution PNG export with rendered flora, linework, and rice paper aura.
- Fully responsive across desktop, tablet, and mobile screens.

### 3. Future Extensions (The Physical Installation Horizon)
1. **Doorstep Projection Mapping**:
   A compact overhead projector mounted above the home entrance, projecting the digital garden directly onto the clean entryway floor.
2. **Real-World Rice Flour Computer Vision**:
   A lightweight ceiling camera utilizing MediaPipe/OpenCV to track real rice flour sprinkled by the user's hand, mapping glowing digital vines directly onto physical floor drawings in real-time.
3. **Margazhi Community Garden Network**:
   A peer-to-peer WebRTC network connecting doorway projections across an entire neighborhood during the festival of Margazhi, allowing vines from one doorway to grow toward and connect with a neighbor's doorstep.

### 4. Feasibility & Intended Emotional Impact
- **Technical Feasibility**: The core interactive mechanics are completely proven and working in today's prototype without reliance on heavy machine learning or external cloud APIs. Transition to physical projection requires only standard off-the-shelf camera tracking.
- **Emotional Impact**: Uyir Kolam elevates a humble daily chore into a moment of wonder. It demonstrates that technology need not sever us from our roots; instead, code can act as a gentle mirror, reflecting the sacred beauty already present in our everyday traditions.
