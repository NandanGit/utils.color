export class HSLColor {
  readonly hue: number;
  readonly saturation: number;
  readonly lightness: number;
  readonly alpha: number;

  constructor(hue: number, saturation: number, lightness: number, alpha = 1) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.alpha = alpha;
  }

  // Special methods
  toString(): string {
    return `hsla(${this.hue}%, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
  }
}
