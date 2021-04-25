//music by bensound.com

var song;
var slider;
var label;


function preload() {
  song = loadSound("bensound-thelounge.mp3");
}

const key = 'pk.eyJ1IjoiYnJpLWRvd2xlci05NyIsImEiOiJja20wdDIyeW0wYzNtMnFxdGk3emZzYnp4In0.NU2RC5HVd-toMS3l5kk9kQ';

const options = {
  lat: 37.0902,
  lng: -95.7129,
  zoom: 3,
  style: 'mapbox://styles/bri-dowler-97/ckmtvga9c1ckq17ltd04m2hap',
  pitch: 0,
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

//image variables 
var imgArray = [];
var csvImages = 22;

function setup() {
  
  let c = select('.parentdiv');
     c.position(0,0);
  c.style('z-index', 1000);
  
  let d = select('.childdiv');
     d.position(0,0);
  d.style('z-index', 1000);
  
  let a = createA('https://en.wikipedia.org/wiki/Mall_Madness', 'Mall Madness 1988 Board Game');
a.position(windowWidth/1.3, windowHeight/10);
  a.style('color', '#ebe960');
  a.style('z-index', 1000);
  
  
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
    miles = loadTable('Abandoned_Malls.csv','csv','header');
    myMap.onChange(drawPoint);
  for (let i = 0; i < csvImages; i++) 
      imgArray[i] = loadImage('images/mall_' + i + '.jpeg');
  tint (235,233,96)
    
  

 //song = loadSound("bensound-thelounge.mp3")
 song.play();
 song.loop();
 slider = createSlider(0,1,0.1,0.01);
 slider.style('z-index', 1000);
 slider.position (windowWidth/30,windowHeight/10);
 label = createDiv ('Muzak Volume');
 label.style('z-index', 1000);
 label.position (windowWidth/7,windowHeight/10);
 label.style('color','#ebe960');
  

}

// The draw loop is fully functional but we are not using it for now.
function draw() {
    

  
}

function mouseMoved() {
  drawPoint();
}

function drawPoint(){
  clear();
  noFill();
  stroke(255);
  strokeWeight(1.6);
  const zoom = myMap.zoom();
  const athens = myMap.latLngToPixel(37.0902,-95.7129);
  //ellipse(athens.x,athens.y,200,200);
  // if(dist(athens.x,athens.y,mouseX,mouseY)<100){
  fill(160,34,96);
  //}else{
  //fill(255,100);
  //}
   song.setVolume(slider.value());
  
   for (let i = 0; i < miles.getRowCount(); i++) {
    // Get the lat/lng of each meteorite 
    const latitude = Number(miles.getString(i, 'reclat'));
    const longitude = Number(miles.getString(i, 'reclong'));
    const pos = myMap.latLngToPixel(latitude, longitude);
    let place = miles.getString(i, 'name');
    //const place = miles.getString(i,'name');
    //const yrClosed = miles.getString(i,'yearClosed');
    //if(yrClosed < 2005){
    //stroke(121,209,236)
    //} else {
    //stroke(255);
    //}
    
    //let size = miles.getString(i, 'mass (g)');
    size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
   // stroke(160,34,97);
     
    ellipse(pos.x, pos.y, 20, 20);
    fill (160,34,96);
    strokeWeight(1.6);
    if(dist(pos.x,pos.y,mouseX,mouseY) < 25){
    textSize(24);
    text(place,pos.x,pos.y);
    textFont('PT Sans');
    textStyle('italic');
    //add images
    image(imgArray[i], pos.x, pos.y, 100, 100);
    text(place, pos.x, pos.y);
    textSize(60);
    //text(yrClosed, windowWidth/2, windowHeight/2);
    }
   }

}

$(window).bind('resize', function(e) {
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function() {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});

