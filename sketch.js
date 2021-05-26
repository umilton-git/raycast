//Box Variable For Drawing shapes

let b = [];

//Variables for the viewing area
const viewW = 400;
const viewH = 400;


function setup(){
  noCursor();
  createCanvas(800, 400);
  //Draws 5 random boxes to the screen within the 2D Image area
  for(i = 0; i < 5; i++)
  {
    xsx = random(viewW);
    xsy = random(viewW);
    ysx = random(viewH);
    ysy = random(viewH);
    b[i] = new Box(xsx, ysx, xsy, ysy);

  }
  ray = new Ray(100, 200);
  p = new Particle();

  //The border between the 2D shape area and the render
  border = new Box(400, 0, 400, 400);
}

//Draws the images to the screen
function draw(){
  background(255, 200, 0);
  for(let box of b)
  {
  box.show();
  }
  border.show();

  //Rotate the particle around the viewing area with left and right key presses
  if(keyIsDown(LEFT_ARROW))
  {
    p.rotate(0.05);
  }
  else if(keyIsDown(RIGHT_ARROW))
  {
    p.rotate(-0.05);
  }

  //Move the particle around the screen based on mouse position
  p.update(mouseX, mouseY);
  p.show();

  //Create the view based on the rays bouncing off the 2D shapes
  const view = p.bounce(b);
  const w = viewW/ view.length;
  push();
  translate(viewW, 0);
  for(i = 0; i < view.length; i++){
    noStroke();

    //Gives the boxes their colors
    const color = map(view[i], 0, viewW, 70, 0);

    //Calculates the heights of the boxes in the scene
    const high = map(view[i], 0, viewW, viewH, 0);
    fill(color);

    rectMode(CENTER);

    //Draws the 3D render of the boxes to the scene
    rect(i* w + w / 2, viewH / 2, w + 1, 15 * (high/view[i]));
  }
  pop();
}
