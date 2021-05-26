class Particle
{
  constructor()
  {
  //Creates the rays, recieves its angles, and calculates the proper number of rays to draw to the screen
  this.pos = createVector(width / 2, height / 2);
  this.casts = [];
  this.offset = 0;
  for (i = 0; i < 75; i += 1)
  {
    this.casts.push(new Ray(this.pos, i * PI/180));
  }
  }

  update(x, y)
  {
    this.pos.set(x,y);
  }

  show()
  {
    //Draws the shape of the particle to the screen and shows the rays it casts
    fill(255);
    triangle(this.pos.x, this.pos.y, 16);
    for(let cast of this.casts)
    {
      cast.show();
    }
  }
  bounce(box)
  {
    //Checks if the ray has hit a box
    const view = [];
    for(let i = 0; i < this.casts.length; i++)
    {
      const ray = this.casts[i];
      let close = null;
      let standard = Infinity;
      for (let b of box)
      {
        const point = ray.cast(b);
        if (point){
        const distance = p5.Vector.dist(this.pos, point);
        if(distance < standard)
        {
          standard = distance;
          close = point;
        }
      }
    }

        if(close)
        {
          stroke(0);
          line(this.pos.x, this.pos.y, close.x, close.y);
        }
          view[i] = standard;
    }
    return view;
  }

  rotate(a)
  {
    this.offset += a;
    for(i = 0; i <= this.casts.length; i += 1)
    {
      if(this.casts[i] != undefined)
      {
      this.casts[i].setAngle(i * PI/180 + this.offset);
      }
    }

  }
}
