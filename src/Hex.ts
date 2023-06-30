export class HexColor {
  readonly red: string;
  readonly green: string;
  readonly blue: string;
  readonly alpha: string;

  constructor(private hexString: string) {
    const [r, g, b, a] = this.getComponentsFromHex(hexString);
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }

  // Helper methods
  private getComponentsFromHex(hex: string): [string, string, string, string] {
    // Remove the # symbol if present and convert the string to uppercase
    if (hex.startsWith('#')) {
      hex = hex.slice(1).toUpperCase();
    }

    // Verify if the characters are valid hex characters
    if (!/^[0-9A-F]{3,8}$/i.test(hex)) {
      throw new Error(
        'Invalid hex input. Please provide a valid 3, 4, 6, or 8 digit hex code.'
      );
    }

    let r: string,
      g: string,
      b: string,
      a: string = 'FF';

    switch (hex.length) {
      case 3:
        r = hex[0] + hex[0];
        g = hex[1] + hex[1];
        b = hex[2] + hex[2];
        break;
      case 4:
        r = hex[0] + hex[0];
        g = hex[1] + hex[1];
        b = hex[2] + hex[2];
        a = hex[3] + hex[3];
        break;
      case 6:
        r = hex.slice(0, 2);
        g = hex.slice(2, 4);
        b = hex.slice(4, 6);
        break;
      case 8:
        r = hex.slice(0, 2);
        g = hex.slice(2, 4);
        b = hex.slice(4, 6);
        a = hex.slice(6, 8);
        break;
      default:
        throw new Error(
          'Invalid hex input. Please provide a valid 3, 4, 6, or 8 digit hex code.'
        );
    }

    return [r, g, b, a];
  }

  // Special methods
  toString(): string {
    return `#${this.red}${this.green}${this.blue}${
      this.alpha === 'FF' ? '' : this.alpha
    }`;
  }
}