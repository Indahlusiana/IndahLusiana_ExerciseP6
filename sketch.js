let judul;
let nama;
let tombol;
let hello;
let objek;
let jalan = false;
let gravForce;
let windForce;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  tombol = createButton('Jalankan/Pause')
  tombol.position(60,160)
  
  objekPos = createVector(width/10,height/2);
  objekVel = createVector(0,0);
  objekAcc = createVector(0,0);
  objekMass = 25;
  objek = new Mover(objekPos, objekVel, objekAcc, objekMass);
  
  gravForce = createVector(0, objek.mass*0.01);
  windForce = createVector(0.5, 0);
}


function draw() {
  background(255,182,193);
  judul1 = createElement('h1', 'Simulasi Hukum Newton')
  judul2 = createElement('h3', 'Nama : Indah Lusiana')
  judul3 = createElement('h3', 'NIM : 122160007')
  judul1.position(30, 15)
  judul2.position(30, 60)
  judul3.position(30, 85)
  objek.display();
  
  var Cd = 0.0001;
  var diam1 = (2*objek.mass);
  var A1 = PI*diam1/10;
  var frictionForce = objek.velocity.copy();
  frictionForce.normalize()
  frictionForce.mult(-1* (frictionForce.mag()**15) *A1*Cd)

  
  objek.applyForce(gravForce);
  objek.applyForce(windForce);
  objek.applyForce(frictionForce);
  
  
  
  tombol.mousePressed(run);
  
  if (jalan){
    objek.update();
  }
  
}

function sayHello() {
  hello = createElement('h2', 'Selamat datang ' + nama.value())
  hello.position(30, 150)
}

function run(){
  // objek.update();
  if (jalan){
    jalan = false;
  }
  else{
    jalan = true
  }
}

class Mover {
  constructor(loc, vel, acc, m){
    this.location = loc;
    this.mass = m;
    this.velocity = vel;
    this.acceleration = acc;
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  display(){
    noStroke();
    fill('hotpink')
    ellipse(this.location.x, this.location.y, 2*this.mass, 3*this.mass);
  }  
  
  applyForce(force){
    force.div(this.mass)
    this.acceleration.add(force);
  }

}
