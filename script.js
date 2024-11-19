console.log("Welcome To Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/song1.mp3'); // Default song
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItems'));

let songs = [
    { songName: "Aj Ki Raat Maza", filePath: "songs/song1.mp3", coverPath: "cover/cov1.jpg" },
    { songName: "Jhuti Khai Thi Kasam", filePath: "songs/song2.mp3", coverPath: "cover/cov2.jpg" },
    { songName: "Jhuti Khai Thi Kasam Jo", filePath: "songs/song3.mp3", coverPath: "cover/cov3.jpg" },
    { songName: "Agar Ho Tm To", filePath: "songs/song4.mp3", coverPath: "cover/cov4.jpg" },
    { songName: "BhoolBhuliyan remix", filePath: "songs/song5.mp3", coverPath: "cover/cov5.jpg" },
    { songName: "Gali Shar ma Ghaghro", filePath: "songs/song6.mp3", coverPath: "cover/cov6.jpg" },
    { songName: "Dil ya lagta nahi bin", filePath: "songs/song7.mp3", coverPath: "cover/cov7.jpg" },
    { songName: "Khudaiya mere ", filePath: "songs/song8.mp3", coverPath: "cover/cov8.jpg" },
    { songName: "Panjabi Song", filePath: "songs/song9.mp3", coverPath: "cover/cov9.jpg" },
    { songName: "Jaan lelo", filePath: "songs/song10.mp3", coverPath: "cover/cov10.jpg" },
    { songName: "Pari Tere Ishq Ma Jbse", filePath: "songs/song11.mp3", coverPath: "cover/cov10.jpg" },
    { songName: "English Music", filePath: "songs/song12.mp3", coverPath: "cover/cov10.jpg" },
    { songName: "Thori Jaga Dede", filePath: "songs/song13.mp3", coverPath: "cover/cov10.jpg" },

];

// Update song item details (cover and name)

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause button

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to timeupdate event

audioElement.addEventListener('timeupdate', () => {
    if (!isNaN(audioElement.duration)) {
        // Update progress bar
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

// Seek bar change

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Pause all songs

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};


// Play selected song

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id); // Use the ID to get the song index
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath; // Correctly update the filePath
        masterSongName.innerText = songs[songIndex].songName; // Update song name
        audioElement.currentTime = 0; // Reset playback
        audioElement.play();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 1;
    });
});

// Next song

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous song

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
});
