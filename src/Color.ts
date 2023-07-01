import { HSLColor } from './HSL';
import { HexColor } from './Hex';
import { RGBColor } from './RGB';

type ColorFormat = 'rgb' | 'hex' | RGBColor | HSLColor | HexColor;

export class Color<Format extends ColorFormat> {
  private color: HSLColor;
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
        this.color = new HexColor(args[0]).toHSL(); // Optimize this by adding a toHSL method to HexColor
      } else if (args[0] instanceof RGBColor) {
        this.color = args[0].toHSL();
      } else if (args[0] instanceof HSLColor) {
        this.color = args[0];
      } else if (args[0] instanceof HexColor) {
        this.color = args[0].toHSL(); // Optimize this by adding a toHSL method to HexColor
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
}
