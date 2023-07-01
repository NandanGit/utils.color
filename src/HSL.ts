import { Bits } from './Color';
import { HexColor } from './Hex';
import { RGBColor } from './RGB';
export class HSLColor {
  constructor(
    readonly hue: number,
    readonly saturation: number,
    readonly lightness: number,
    readonly alpha = 1,
    readonly bits: Bits = 8
  ) {
    this.hue = ((hue % 360) + 360) % 360;
    if (saturation >= 0 && saturation <= 100) {
      this.saturation = +saturation.toFixed(2);
    } else
      throw new Error(
        'Invalid saturation value: saturation must be between 0 and 100'
      );

    if (lightness >= 0 && lightness <= 100) {
      this.lightness = +lightness.toFixed(2);
    } else
      throw new Error(
        'Invalid lightness value: lightness must be between 0 and 100'
      );

    if (alpha >= 0 && alpha <= 1) {
      this.alpha = alpha;
    } else if (alpha >= 0 && alpha <= 100) {
      this.alpha = alpha / 100;
    } else
      throw new Error(
        'Invalid alpha value: alpha must be between 0 and 1 or 0 and 100'
      );
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
      Math.round(r * (2 ** this.bits - 1)),
      Math.round(g * (2 ** this.bits - 1)),
      Math.round(b * (2 ** this.bits - 1)),
      this.alpha,
      this.bits
    );
  }

  toHex(): HexColor {
    return this.toRGB().toHex();
  }

  // Special methods
  toString(): string {
    const isOpaque = this.alpha === 1;
    return `hsl${!isOpaque ? 'a' : ''}(${this.hue}, ${this.saturation}%, ${
      this.lightness
    }%${!isOpaque ? `, ${this.alpha}` : ''})`;
  }
}
