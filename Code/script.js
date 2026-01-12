console.log("Welcome to Next-Gen Audio (Supabase Edition)");

// --- Variables ---
let songIndex = 0;
let audioElement = new Audio();
audioElement.volume = 0.5;

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songContainer = document.getElementById('songContainer');

// Player Bar Info
let masterTitle = document.getElementById('masterTitle');
let masterArtist = document.getElementById('masterArtist');
let masterCover = document.getElementById('masterCover');

// Hero Section Info
let heroTitle = document.getElementById('heroTitle');
let heroArtist = document.getElementById('heroArtist');
let heroCover = document.getElementById('heroCover');
let heroPlayBtn = document.getElementById('heroPlayBtn');

let currentTimeDisplay = document.getElementById('currentTime');
let totalDurationDisplay = document.getElementById('totalDuration');

// Fallback Local Songs
const localSongs = [
    { songName: "Warriyo - Mortals", artist: "Mortals", filePath: "assets/audio/1.mp3", coverPath: "assets/images/1.jpg" },
    { songName: "Cielo", artist: "Huma-Huma", filePath: "assets/audio/2.mp3", coverPath: "assets/images/2.jpg" },
    { songName: "DEAF KEV - Invincible", artist: "DEAF KEV", filePath: "assets/audio/3.mp3", coverPath: "assets/images/3.jpg" },
    { songName: "Different Heaven & EH!DE", artist: "My Heart", filePath: "assets/audio/4.mp3", coverPath: "assets/images/4.jpg" },
    { songName: "Janji - Heroes Tonight", artist: "Janji", filePath: "assets/audio/5.mp3", coverPath: "assets/images/5.jpg" },
];

let songs = [];
let supabase = null;

// --- Initialization ---

async function init() {
    // 1. Initialize Supabase
    if (!window.supabaseUrl || window.supabaseUrl === "YOUR_SUPABASE_URL") {
        console.warn("Supabase config missing/default. Using local mode.");
        songs = localSongs;
    } else {
        try {
            // Initialize Client
            const { createClient } = window.supabase;
            supabase = createClient(window.supabaseUrl, window.supabaseKey);

            // Fetch Data
            // Try 'songs' first, if that fails, the error handler below might catch it, 
            // but since we saw the error "Perhaps you meant 'song'", let's switch to 'song' or try both.
            // Let's stick to the user's actual table name 'song'.
            const { data, error } = await supabase
                .from('song')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                console.log("Loaded songs from Supabase:", data);
                songs = data;
            } else {
                console.log("No songs in DB. Using local fallback.");
                songs = localSongs;
            }

        } catch (error) {
            console.error("Error connecting to Supabase:", error);
            songs = localSongs;
        }
    }

    // 2. Render UI
    renderSongList();

    // 3. Load First Song (Initial State)
    if (songs.length > 0) {
        audioElement.src = songs[0].filePath;
        updatePlayerUI(0);
    }
}

// Start App
init();

function renderSongList() {
    songContainer.innerHTML = "";
    songs.forEach((song, i) => {
        const title = song.songName || "Unknown Title";
        const artist = song.artist || "Unknown Artist";

        let div = document.createElement('div');
        div.classList.add('song-card');
        div.innerHTML = `
            <img src="${song.coverPath}" alt="${title}">
            <h4>${title}</h4>
            <p>${artist}</p>
            <div class="play-hover-btn">
                <i class="fa-solid fa-play"></i>
            </div>
        `;
        div.addEventListener('click', () => {
            playSong(i);
        });
        songContainer.appendChild(div);
    });
}

// --- Core Functions ---

function playSong(index) {
    if (index < 0 || index >= songs.length) return;

    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play().catch(e => console.log("Playback failed:", e));

    updatePlayerUI(songIndex);
    togglePlayIcon(true);
}

function updatePlayerUI(index) {
    let song = songs[index];
    if (!song) return;

    const title = song.songName || "Unknown Title";
    const artist = song.artist || "Unknown Artist";

    // Update Player Bar
    masterTitle.innerText = title;
    masterArtist.innerText = artist;
    masterCover.src = song.coverPath;

    // Update Hero Section
    heroTitle.innerText = title;
    heroArtist.innerText = artist;
    heroCover.src = song.coverPath;
}

function togglePlayIcon(isPlaying) {
    let icon = masterPlay.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// --- Event Listeners ---

// 1. Master Play/Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        togglePlayIcon(true);
    } else {
        audioElement.pause();
        togglePlayIcon(false);
    }
});

// 2. Hero Play Button
heroPlayBtn.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        togglePlayIcon(true);
    } else {
        audioElement.pause();
        togglePlayIcon(false);
    }
});

// 3. Time Update & Progress Bar
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        // Update Seekbar
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;

        // Update Time Texts
        currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
        totalDurationDisplay.innerText = formatTime(audioElement.duration);
    }
});

// 4. Seekbar Change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// 5. Next / Previous
document.getElementById('next').addEventListener('click', () => {
    let nextIndex = songIndex + 1;
    if (nextIndex >= songs.length) nextIndex = 0;
    playSong(nextIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    let prevIndex = songIndex - 1;
    if (prevIndex < 0) prevIndex = songs.length - 1;
    playSong(prevIndex);
});

function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
}
