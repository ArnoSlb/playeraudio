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

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
}) 

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Utility Functions
function randomIntFromRange(min,max) {
  return Math.floor(Math.random() * (max - min +1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
class Object {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation
let objects
function init() {
  objects = []

  for (let i = 0; i < 400; i++) {
    // objects.push()
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
