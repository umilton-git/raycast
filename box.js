class Box
{
  constructor(x1, y1, x2, y2)
    {
      this.x = createVector(x1, y1);
      this.y = createVector(x2, y2);
    }


show(){
  stroke(0);
  line(this.x.x, this.x.y, this.y.x, this.y.y);
}
}
