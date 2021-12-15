const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const durationEl = document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const loopBtn = document.getElementById('loop');
const shuffleBtn = document.getElementById('shuffle');

const songs = [
    {
        name: 'instrumental_1',
        displayName: 'Ylang Ylang',
        artist: 'FKJ'
    },
    {
        name: 'instrumental_2',
        displayName: 'Paris',
        artist: 'Else'
    },
    {
        name: 'instrumental_3',
        displayName: 'Für Elise (Piano)',
        artist: 'Beethoven'
    },
    {
        name: 'instrumental_4',
        displayName: 'Bloodstream ',
        artist: 'Tokio Myers'
    },
    {
        name: 'instrumental_5',
        displayName: 'The Less I Know The Better',
        artist: 'Tame Impala'
    },
    {
        name: 'instrumental_6',
        displayName: 'Meditation',
        artist: 'Monoman'
    },
    {
        name: 'instrumental_7',
        displayName: 'Evil Morty (Trap Remix)',
        artist: 'Rick and Morty'
    }
];
//Check if playing
let isPlaying = false; 

//Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause-circle');
    playBtn.setAttribute('title', 'Pause')
    music.play();    
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause-circle', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();    
}

//Event Listener for Play & Pause
playBtn.addEventListener('click', () => ( isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `./audios/${song.name}.mp3`;
    image.src = `./images/${song.name}.jpg`;
}

// On Load, selects first song
let songIndex = 0;
loadSong(songs[songIndex]);

// Previous Song
function prevSong(){
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Updating ProgressBar
function updateProgressBar(e) {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        

        let currentTimeMinutes = Math.floor(currentTime/60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        if (currentTimeSeconds) {
            currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
        }
    }
}
// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width) * duration;
}

// Repeat Song
function loopSong() {
    if (music.loop === false) {
        music.loop = true;
        loopBtn.style.color = '#00BFA6';
        playSong();
    } else if (music.loop === true) {
        music.loop = false;
        loopBtn.style.color = '#d7d7d7';
    }
}

//Shuffle Update & Song
let onShuffle = false;
function shuffleUpdate() {
    if(onShuffle === false) {
        onShuffle = true;
        shuffleBtn.style.color = '#00BFA6';
    } else if( onShuffle === true) {
        onShuffle = false;
        shuffleBtn.style.color = '#d7d7d7';
    }
}

function shuffleSong() {
    songIndex = Math.floor(songs.length * Math.random());
    loadSong(songs[songIndex]);
    playSong();
}


// Event Listener for Previous Song, Next Song, Progress Update
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended',  () => (onShuffle ? shuffleSong() : nextSong()));
progressContainer.addEventListener('click', setProgressBar);
loopBtn.addEventListener('click', loopSong);
shuffleBtn.addEventListener('click', shuffleUpdate);
