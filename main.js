// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const viewProjectsBtn = document.querySelector('.view-projects');

// Function to activate section
function activateSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    // Show the target section
    document.getElementById(sectionId).classList.add('active-section');
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });
}

// Add click event to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.dataset.section;
        activateSection(sectionId);
    });
});

// View projects button
viewProjectsBtn.addEventListener('click', function(e) {
    e.preventDefault();
    activateSection('projects');
});

// Music Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const songTitle = document.querySelector('.song-details h3');
    const songArtist = document.querySelector('.song-details p');
    const progressBar = document.querySelector('.progress');
    let isPlaying = false;
    let currentSong = 0;

    // Songs data
    const songs = [
        {
            title: "Bohemian Rhapsody",
            artist: "Queen - A Night at the Opera",
            duration: "5:55"
        },
        {
            title: "Imagine",
            artist: "John Lennon - Imagine",
            duration: "3:04"
        },
        {
            title: "Hotel California",
            artist: "Eagles - Hotel California",
            duration: "6:30"
        },
        {
            title: "Billie Jean",
            artist: "Michael Jackson - Thriller",
            duration: "4:54"
        },
        {
            title: "Shape of You",
            artist: "Ed Sheeran - ÷ (Divide)",
            duration: "3:53"
        }
    ];

    // Update song info function
    function updateSongInfo(index) {
        songTitle.textContent = songs[index].title;
        songArtist.textContent = songs[index].artist;
        // Update active playlist item
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[index].classList.add('active');
        // Reset progress bar
        progressBar.style.width = '0%';
        // Show play button if not playing
        if (!isPlaying) {
            playBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
        }
    }

    // Play/Pause button function
    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            // Change to pause icon
            this.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
            // Simulate playing with progress bar animation
            progressBar.style.transition = "width 60s linear";
            progressBar.style.width = "100%";
        } else {
            // Change to play icon
            this.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
            // Pause progress bar animation
            const currentWidth = getComputedStyle(progressBar).width;
            progressBar.style.transition = "none";
            progressBar.style.width = currentWidth;
        }
    });

    // Previous button function
    prevBtn.addEventListener('click', function() {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        updateSongInfo(currentSong);
        // If currently playing, auto-play the new song
        if (isPlaying) {
            progressBar.style.transition = "width 60s linear";
            progressBar.style.width = "100%";
        }
    });

    // Next button function
    nextBtn.addEventListener('click', function() {
        currentSong = (currentSong + 1) % songs.length;
        updateSongInfo(currentSong);
        // If currently playing, auto-play the new song
        if (isPlaying) {
            progressBar.style.transition = "width 60s linear";
            progressBar.style.width = "100%";
        }
    });

    // Playlist item click function
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentSong = index;
            updateSongInfo(currentSong);
            // Auto-play when selecting a song
            isPlaying = true;
            playBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
            progressBar.style.transition = "width 60s linear";
            progressBar.style.width = "100%";
        });
    });
});
