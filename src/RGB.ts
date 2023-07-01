import { Bits } from './Color';
import { HSLColor } from './HSL';
import { HexColor } from './Hex';

export class RGBColor {
  constructor(
    readonly red: number,
    readonly green: number,
    readonly blue: number,
    readonly alpha = 1,
    readonly bits: Bits = 8
  ) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  // Conversion methods
  toHex(bits?: Bits): HexColor {
    if (this.bits !== 8) {
      return this.scale({ to: 8 }).toHex(this.bits);
    }
    const r = Math.round(this.red).toString(16).padStart(2, '0');
    const g = Math.round(this.green).toString(16).padStart(2, '0');
    const b = Math.round(this.blue).toString(16).padStart(2, '0');
    const a = Math.round(this.alpha * 255)
      .toString(16)
      .padStart(2, '0');

    return new HexColor(`#${r}${g}${b}${a}`, bits || this.bits);
  }

  toHSL(): HSLColor {
    const r = this.red / (2 ** this.bits - 1);
    const g = this.green / (2 ** this.bits - 1);
    const b = this.blue / (2 ** this.bits - 1);

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

  // Scaling methods
  scale(options: { to?: Bits; by?: Bits }): RGBColor {
    const scale = options.to
      ? 2 ** (options.to - this.bits)
      : 2 ** (options.by || 0);
    return new RGBColor(
      Math.round(this.red * scale),
      Math.round(this.green * scale),
      Math.round(this.blue * scale),
      this.alpha,
      options.to || this.bits + (options.by || 0)
    );
  }

  // Special methods
  toString(bits?: Bits): string {
    if (this.bits !== 8) {
      return this.scale({ to: 8 }).toString(bits);
    }
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}
