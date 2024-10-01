let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: 'Mai Rahoo Ya Na Rahoon', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpeg' },
    { songName: 'Tum Mile', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpeg' },
    { songName: 'Ek Pyar Ka Nagma Hai', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpeg' },
    { songName: 'Main Pal Do Pal Ka Shair Hoon', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpeg' },
    { songName: 'Kabhi Kabhi Mere Dil Mein', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpeg' },
    { songName: 'Qaafirana', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpeg' },
    { songName: 'O Sanam', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpeg' },
    { songName: 'Bade Achhe Lagte Hain', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpeg' },
    { songName: 'Abhi Na Jao Chhod Kar', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpeg' },
    { songName: 'Hontho se chulo tum', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpeg' },
    { songName: 'Yeh Tune Kya Kiya', filePath: 'songs/11.mp3', coverPath: 'covers/11.jpeg' },
    { songName: 'Tum Hi Ho', filePath: 'songs/12.mp3', coverPath: 'covers/12.jpeg' },
    { songName: 'Agar Tum Sath Ho', filePath: 'songs/13.mp3', coverPath: 'covers/13.jpeg' },
    { songName: 'Humdard', filePath: 'songs/14.mp3', coverPath: 'covers/14.jpeg' },
    { songName: 'Tum Jo Aaye', filePath: 'songs/15.mp3', coverPath: 'covers/15.jpg' },
    { songName: 'Hasi Ban Gaye', filePath: 'songs/16.mp3', coverPath: 'covers/16.jpg' },
    { songName: 'Mana Ke Hum Yaar', filePath: 'songs/17.mp3', coverPath: 'covers/17.jpeg' },
    { songName: 'Phir Le Aaya Dil', filePath: 'songs/18.mp3', coverPath: 'covers/18.jpg' },
    { songName: 'Shaayad', filePath: 'songs/19.mp3', coverPath: 'covers/19.jpg' },
    { songName: 'Sukoon Mila', filePath: 'songs/20.mp3', coverPath: 'covers/20.jpg' },
    { songName: 'Yahin Hoon Mein', filePath: 'songs/21.mp3', coverPath: 'covers/21.jpg' }
];

// Function to play the next song
const playNextSong = () => {
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0; // Loop back to the first song
    }
    playSong();
};

// Function to play a specific song
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
};

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to the 'ended' event for playing the next song
audioElement.addEventListener('ended', playNextSong);

// Function to initialize song items
const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName('img')[0].src = songs[i].coverPath;
        element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
        element.getElementsByClassName('songItemPlay')[0].addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = i;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playSong();
        });
    });
};

// Function to make all plays inactive
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Initialize song items
initializeSongItems();

const currentTime = document.getElementById('currentTime');
const totalDuration = document.getElementById('totalDuration');

// Function to format time as mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secondsPart}`;
}

// Update current time and total duration
audioElement.addEventListener('timeupdate', () => {
    currentTime.textContent = formatTime(audioElement.currentTime);

    if (!isNaN(audioElement.duration)) {
        totalDuration.textContent = formatTime(audioElement.duration);
        myProgressBar.max = Math.floor(audioElement.duration);
    }

    myProgressBar.value = Math.floor(audioElement.currentTime);
});

// Update the song time when the progress bar is moved manually
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value;
});

// Get references to the play button and gif element

let gif = document.getElementById('gif');

// Add event listener to toggle play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();  // Play the song
        gif.style.display = "block";  // Show the GIF
    } else {
        audioElement.pause();  // Pause the song
        gif.style.display = "none";  // Hide the GIF
    }
});
