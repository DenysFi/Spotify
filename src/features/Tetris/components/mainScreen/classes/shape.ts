export type ShapeData = [number, number, number, number];

class Shape {
  private shape: ShapeData;
  private shapeIndex = 0;
  public constructor(shape: ShapeData) {
    this.shape = shape;
    this.shapeIndex = Math.round(Math.random() * 3);
  }
  public rotate() {
    this.shapeIndex++;
    this.shapeIndex %= 4;
  }

  public get data() {
    return this.shape[this.shapeIndex];
  }

  public getAfterOneRotate_Data() {
    return this.shape[(this.shapeIndex + 1) % 4];
  }
}

export default Shape;
