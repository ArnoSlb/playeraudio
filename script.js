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
    indexTxt.textContent = `${currentMusicIndex}/${musicsData.length}`
}

popuplateUI(musicsData[currentMusicIndex - 1])  