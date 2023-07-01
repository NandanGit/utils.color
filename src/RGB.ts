import { HSLColor } from './HSL';
import { HexColor } from './Hex';

export class RGBColor {
  constructor(
    readonly red: number,
    readonly green: number,
    readonly blue: number,
    readonly alpha = 1,
    readonly bits = 8
  ) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  // Conversion methods
  toHex(): HexColor {
    const r = Math.round(this.red).toString(16).padStart(2, '0');
    const g = Math.round(this.green).toString(16).padStart(2, '0');
    const b = Math.round(this.blue).toString(16).padStart(2, '0');
    const a = Math.round(this.alpha * 255)
      .toString(16)
      .padStart(2, '0');

    return new HexColor(`#${r}${g}${b}${a}`, this.bits);
  }

  toHSL(): HSLColor {
    const r = this.red / 255;
    const g = this.green / 255;
    const b = this.blue / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = (max + min) / 2;
    let s = h;
    const l = h;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;

      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;

        default:
          break;
      }

      h /= 6;
    }

    return new HSLColor(h * 360, s * 100, l * 100, this.alpha, this.bits);
  }

  // Special methods
  toString(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}
