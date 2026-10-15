/**
 * UYIR KOLAM - PROCEDURAL SOUND ENGINE
 * Web Audio API synthesized dawn soundscapes & meditative chime responses.
 * Zero external audio dependencies; pure mathematical harmonics.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.lastStrokeSoundTime = 0;
    // Raga Mohanam / Bhupali scale (Sa, Re, Ga, Pa, Dha, Sa')
    this.frequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    this.noteIndex = 0;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  /**
   * Delicate veena / kalimba tone while drawing
   */
  playStrokeTone(speed = 1) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    if (now - this.lastStrokeSoundTime < 0.12) return; // rate limit stroke sounds
    this.lastStrokeSoundTime = now;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const freq = this.frequencies[this.noteIndex % this.frequencies.length];
    this.noteIndex = (this.noteIndex + 1) % this.frequencies.length;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle vibrato/detune
    osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  /**
   * Temple tingsha bell / chime when a sacred flower blooms
   */
  playBloomChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const baseFreq = 880; // A5 tingsha bell

    // Two tuned oscillators for metallic shimmer
    [baseFreq, baseFreq * 1.503, baseFreq * 2.01].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      const initialVolume = idx === 0 ? 0.22 : 0.09;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(initialVolume, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.8);
    });
  }

  /**
   * Morning dewdrop sound when connecting a dot
   */
  playDewdrop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Frequency slide down like a droplet hitting water
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.12);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  /**
   * Celebration chord when full garden awakens or reveal is opened
   */
  playCelebrationHarmony() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chordFreqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];

    chordFreqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startTime = now + i * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.14, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 2.6);
    });
  }
}

export const soundEngine = new SoundEngine();
