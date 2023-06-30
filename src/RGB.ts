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

    return new HexColor(`#${r}${g}${b}${a}`);
  }

  // Special methods
  toString(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}
