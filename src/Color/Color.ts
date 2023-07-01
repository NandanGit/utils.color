import { HSLColor } from './HSL';
import { HexColor } from './Hex';
import { RGBColor } from './RGB';

type ColorFormat = 'rgb' | 'hex' | RGBColor | HSLColor | HexColor;

export type Bits = number;

export class Color<Format extends ColorFormat> {
  private color: HSLColor;

  private _h: number;
  private _s: number;
  private _l: number;
  private _p: number;
  private _q: number;

  constructor(
    ...args: Format extends 'hex'
      ? [hexString: string]
      : Format extends 'rgb'
      ? [
          red: number,
          green: number,
          blue: number,
          alpha?: number,
          bits?: number
        ]
      : Format extends RGBColor | HSLColor | HexColor
      ? [color: Format]
      : never
  ) {
    if (args.length === 1) {
      if (typeof args[0] === 'string') {
        this.color = new HexColor(args[0]).toHSL();
      } else if (args[0] instanceof RGBColor) {
        this.color = args[0].toHSL();
      } else if (args[0] instanceof HSLColor) {
        this.color = args[0];
      } else if (args[0] instanceof HexColor) {
        this.color = args[0].toHSL();
      } else {
        throw new Error('Invalid argument');
      }
    } else if (
      args.length >= 3 &&
      args.length <= 5 &&
      // Type checking for the first 3 arguments
      typeof args[0] === 'number' &&
      typeof args[1] === 'number' &&
      typeof args[2] === 'number'
    ) {
      const [red, green, blue, alpha = 1, bits = 8] = args;
      this.color = new RGBColor(red, green, blue, alpha, bits).toHSL();
    } else {
      throw new Error('Invalid arguments');
    }

    this._h = this.hue / 360;
    this._s = this.saturation / 100;
    this._l = this.lightness / 100;
    this._p =
      this._l < 0.5
        ? this._l * (1 + this._s)
        : this._l + this._s - this._l * this._s;
    this._q = 2 * this._l - this._p;
  }

  // Computed properties
  get hue(): number {
    return this.color.hue;
  }

  get saturation(): number {
    return this.color.saturation;
  }

  get lightness(): number {
    return this.color.lightness;
  }

  get alpha(): number {
    return this.color.alpha;
  }

  get bits(): Bits {
    return this.color.bits;
  }

  get red(): number {
    return this.toRGB().red;
  }

  get green(): number {
    return this.toRGB().green;
  }

  get blue(): number {
    return this.toRGB().blue;
  }

  get hex(): string {
    return this.toHex().toString();
  }

  get rgb(): string {
    return this.toRGB().toString();
  }

  get hsl(): string {
    return this.toHSL().toString();
  }

  // Conversion methods
  toRGB(): RGBColor {
    return this.color.toRGB();
  }

  toHex(): HexColor {
    return this.color.toHex();
  }

  toHSL(): HSLColor {
    return this.color;
  }

  // Special methods
  toString(): string {
    return this.color.toRGB().toString();
  }

  // Helper methods
  private hueToRGB(p: number, q: number, t: number): number {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
}
