export class HSBColor {
  readonly hue: number;
  readonly saturation: number;
  readonly brightness: number;
  readonly alpha: number;

  constructor(hue: number, saturation: number, brightness: number, alpha = 1) {
    this.hue = hue;
    this.saturation = saturation;
    this.brightness = brightness;
    this.alpha = alpha;
  }
}
