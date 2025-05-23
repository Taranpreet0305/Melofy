let progress = document.getElementById("progress");
let audio = document.getElementById("audio");
let ctrl_icon = document.getElementById("Control-Icon");
let current_time = document.getElementById("current-time");
let duration = document.getElementById("duration");
let songName = document.getElementById("song-name");
let songCover = document.getElementById("song-cover");
let tile = document.getElementById("tile");

const songs = [
    {
        name: "Perfect",
        file: "Media/Perfect.mp3",
        cover: "Media/Perfect-Song-Cover.jpg"
    },
        {
        name: "Dekha Hazaro Daffa",
        file: "Media/Dekha-Hazaro-Dafaa.mp3",
        cover: "Media/dekha-hazaro-daffa-cover.jpg"
    },
    {
        name: "Mera Yaar",
        file: "Media/Mera-Yaar.mp3",
        cover: "Media/Mera-Yaar-Cover.jpg"
    },
    {
        name: "Tum Tak",
        file: "Media/Tum-Tak.mp3",
        cover: "Media/Tum-Tak-Cover.jpg"
    },
    {
        name: "Bulleya",
        file: "Media/Bulleya.mp3",
        cover: "Media/Bulleya-Cover.jpg"
    },
    {
        name: "Yadav brand 2",
        file: "Media/Yadav-Brand2.mp3",
        cover: "Media/AnotherSongCover.jpg"
    }
];

let currentSongIndex = 0;

function loadSong(index) {
    const song = songs[index];
    songName.textContent = song.name;
    audio.src = song.file;
    songCover.src = song.cover;
    tile.style.background = `url(${song.cover}) center/cover no-repeat`;
    audio.load();
    audio.onloadedmetadata = () => {
        progress.max = audio.duration;
        duration.textContent = formatTime(audio.duration);
    };
    PlayPause();
}

function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

function PlayPause() {
    if (audio.paused) {
        audio.play();
        ctrl_icon.classList.add("fa-pause");
        ctrl_icon.classList.remove("fa-play");
    } else {
        audio.pause();
        ctrl_icon.classList.remove("fa-pause");
        ctrl_icon.classList.add("fa-play");
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

setInterval(() => {
    progress.value = audio.currentTime;
    current_time.textContent = formatTime(audio.currentTime);
}, 500);

progress.onchange = function () {
    audio.currentTime = progress.value;
    PlayPause();
};

// Initial load
loadSong(currentSongIndex);
