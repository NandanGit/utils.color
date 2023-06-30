export class HSLColor {
  readonly hue: number;
  readonly saturation: number;
  readonly lightness: number;

  constructor(hue: number, saturation: number, lightness: number) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }
}
