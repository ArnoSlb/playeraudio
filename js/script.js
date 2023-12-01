import utils from './utils.js'

const musicsData = [
    {title: "Solar", artist: "Betical", id: 1 },
    {title: "Electric-Feel", artist: "TEEMID", id: 2 },
    {title: "Aurora", artist: "SLUMB", id: 3 },
    {title: "Lost-Colours", artist: "Fakear", id: 4 },
];

const musicPlayer = document.querySelector("audio");
const musicTitle = document.querySelector(".music-title");
const artistName = document.querySelector(".artist-name");
const thumbnail = document.querySelector(".thumbnail");
const indexTxt = document.querySelector(".current-index");

let currentMusicIndex = 1;

function popuplateUI({title, artist}){
    musicTitle.textContent = title;
    artistName.textContent = artist;
    thumbnail.src = `./ressources/thumbs/${title}.png`;
    musicPlayer.src = `./ressources/music/${title}.mp3`;
    indexTxt.textContent = `${currentMusicIndex}/${musicsData.length}`;
}

popuplateUI(musicsData[currentMusicIndex - 1]);  

const playBtn = document.querySelector(".play-btn");

playBtn.addEventListener('click', handlePlayPause)

function handlePlayPause(){
    if(musicPlayer.paused) play()
    else pause()
}

function play(){
    playBtn.querySelector("img").src = "./ressources/icons/pause-icon.svg";
    musicPlayer.play();
} 

function pause(){
    playBtn.querySelector("img").src = "./ressources/icons/play-icon.svg";
    musicPlayer.pause();
}  

const displayCurrentTime = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const progressBar = document.querySelector('.progress-bar');

musicPlayer.addEventListener("loadeddata", fillDurationVariables);

let current;
let totalDuration;

function fillDurationVariables(){
    current = musicPlayer.currentTime;
    totalDuration = musicPlayer.duration;

    formatValue(current, displayCurrentTime);
    formatValue(totalDuration, durationTime);
}

function formatValue(val, element){
    const currentMin = Math.trunc(val / 60);
    let currentSec = Math.trunc(val % 60);

    if(currentSec < 10) {
        currentSec = `0${currentSec}`; 
    }

    element.textContent = `${currentMin}:${currentSec}`;
}

musicPlayer.addEventListener("timeupdate", updateProgress);

function updateProgress(e){
    current = e.srcElement.currentTime; 
    formatValue(current, displayCurrentTime);

    const progressValue = current / totalDuration;
    progressBar.style.transform = `scaleX(${progressValue})`;
} 

const progressBarContainer = document.querySelector(".progress-container");

progressBarContainer.addEventListener("click", setProgress);

let rect = progressBarContainer.getBoundingClientRect();
let width = rect.width;

function setProgress(e){
    const x = e.clientX - rect.left;
    musicPlayer. currentTime = (x / width) * totalDuration;
}

const btnShuffle = document.querySelector(".shuffle");
btnShuffle.addEventListener('click', switchShuffle);

let shuffle = false;
function switchShuffle(){
    btnShuffle.classList.toggle("active");
    shuffle = !shuffle;
} 

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

[prevBtn, nextBtn].forEach(btn => btn.addEventListener('click', changeSong));

musicPlayer.addEventListener("ended", changeSong);

function changeSong(e){
    init()
    if(shuffle) {
        playAShuffledSong();
        return;
    }

    e.target.classList.contains("next-btn") || e.type === "ended" ? currentMusicIndex++ : currentMusicIndex--; 

    if(currentMusicIndex < 1 ) currentMusicIndex = musicsData.length;
    else if(currentMusicIndex > musicsData.length) currentMusicIndex = 1; 

    popuplateUI(musicsData[currentMusicIndex - 1]);
    play();
}   

function playAShuffledSong(){
    const musicsWhithoutCurrentSong = musicsData.filter(el => el.id !== currentMusicIndex); 
    const randomMusic = musicsWhithoutCurrentSong[Math.trunc(Math.random() * musicsWhithoutCurrentSong.length )];

    currentMusicIndex = randomMusic.id;
    popuplateUI(randomMusic);
    play();
}     

//Balls with Gravity

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#bdfcfe','#fff', '#f1ddff'];

var gravity = 1;
var friction = 0.7;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}) 

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
})

// addEventListener('click', function(){
//   init();
// })

// Utility Functions
function randomIntFromRange(min,max) {
  return Math.floor(Math.random() * (max - min +1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    // dy = velocity/vitesse
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke()
    c.closePath();
  }

  update() {
    // if la ball sort de l'ecran, on inverse par le bas on inverse le mvt
    if( this.y + this.radius + this.dy > canvas.height) {
      // On multiple la velocité par de la friction pour que le mvt s'arrete
      this.dy = -this.dy * friction;
    } else {
      // simule la gravité
      this.dy += gravity;
    }

    // si les balles sortent de l'écran latéralement alors on inverse le mvt
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0   ) {
      this.dx = -this.dx * ( friction / 1.2 ) ;
    }


    this.x += this.dx;
    // on donne un mvt vertical vers le bas à la balle
    this.y += this.dy;
    this.draw();
  }
}

// Implementation 
var ball;
var ballArray = [];
function init(){
  ballArray = [];
  for (var i=0; i < 150; i++){
    var radius = randomIntFromRange(8, 20)
    var x = randomIntFromRange(radius, canvas.width - radius);
    var y = randomIntFromRange(0, canvas.height - radius);
    var dx = randomIntFromRange(-2, 2);
    var dy = randomIntFromRange(-2, 2);
    var color = randomColor(colors);
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // nettoie le canvas, refresh images
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < ballArray.length; i++){
    ballArray[i].update();
  }
}

init();
animate();
