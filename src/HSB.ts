export class HSBColor {
  constructor(
    readonly hue: number,
    readonly saturation: number,
    readonly brightness: number,
    readonly alpha = 1
  ) {
    this.hue = hue;
    this.saturation = saturation;
    this.brightness = brightness;
    this.alpha = alpha;
  }

  // Special methods
  toString(): string {
    return `hsba(${this.hue}%, ${this.saturation}%, ${this.brightness}%, ${this.alpha})`;
  }
}
