export class HSBColor {
  readonly hue: number;
  readonly saturation: number;
  readonly brightness: number;

  constructor(hue: number, saturation: number, brightness: number) {
    this.hue = hue;
    this.saturation = saturation;
    this.brightness = brightness;
  }
}
