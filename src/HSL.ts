import { HexColor } from './Hex';
import { RGBColor } from './RGB';
export class HSLColor {
  constructor(
    readonly hue: number,
    readonly saturation: number,
    readonly lightness: number,
    readonly alpha = 1,
    readonly bits = 8
  ) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.alpha = alpha;
    this.bits = bits;
  }

  // Conversion methods
  toRGB(): RGBColor {
    const h = this.hue / 360;
    const s = this.saturation / 100;
    const l = this.lightness / 100;

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hueToRGB = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hueToRGB(p, q, h + 1 / 3);
      g = hueToRGB(p, q, h);
      b = hueToRGB(p, q, h - 1 / 3);
    }

    // return [r * 255, g * 255, b * 255];
    return new RGBColor(
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255),
      this.alpha,
      this.bits
    );
  }

  toHex(): HexColor {
    return this.toRGB().toHex();
  }

  // Special methods
  toString(): string {
    return `hsla(${this.hue}%, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
  }
}
