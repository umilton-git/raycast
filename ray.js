class Ray{
  constructor(x, y)
  {
    this.pos = x;
    this.dir = p5.Vector.fromAngle(y);
  }

  update(x, y)
  {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  show()
  {
    stroke(0);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }

  //Sets the angle in during l/r rotation
  setAngle(a)
  {
    this.dir = p5.Vector.fromAngle(a);
  }

  //Checks for an intersection with a box
  cast(intersection)
  {
    //x and y values of the box values and rays
    const checkx1 = intersection.x.x;
    const checky1 = intersection.x.y;
    const checkx2 = intersection.y.x;
    const checky2 = intersection.y.y;

    const rayx1 = this.pos.x;
    const rayy1 = this.pos.y;
    const rayx2 = this.pos.x + this.dir.x;
    const rayy2 = this.pos.y + this.dir.y;

    //Line-line intersection math
    const lineline = (checkx1 - checkx2) * (rayy1 - rayy2) - (checky1 - checky2) * (rayx1 - rayx2);
    if(lineline == 0)
    {
      return;
    }

    const t = ((checkx1 - rayx1) * (rayy1 - rayy2) - (checky1 - rayy1) * (rayx1 - rayx2))/lineline;
    const u = -((checkx1 - checkx2) * (checky1 - rayy1) - (checky1 - checky2) * (checkx1 - rayx1))/lineline;

    //Checking the t and u values of the line-line intersection formula to see if the ray is touching a box
    if (t > 0 && t < 1 && u > 0)
    {
      const vecpoint = createVector();
      vecpoint.x = checkx1 + t * (checkx2 - checkx1);
      vecpoint.y = checky1 + t * (checky2 - checky1);
      return vecpoint;
    }
    else
    {
      return;
    }

  }
}
