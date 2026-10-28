const cover = document.getElementById('cover');
const scrollButton = document.getElementById('scrollButton');
const invitation = document.getElementById('invitation');
const quickNav = document.querySelector('.quick-nav');
const stampSound = document.getElementById('stampSound');
const stampImagePath = 'wi_asset/chiikawa-stamp.png';
let invitationOpened = false;

// stamp
scrollButton.addEventListener('click', function (event) {
    if (invitationOpened) return;

    const stamp = document.createElement('img');
    stamp.src = stampImagePath;
    stamp.alt = '';
    stamp.className = 'stamp-mark';
    const rect = scrollButton.getBoundingClientRect();
    stamp.style.left = (event.clientX - rect.left) + 'px';
    stamp.style.top = (event.clientY - rect.top) + 'px';
    scrollButton.appendChild(stamp);

    stampSound.currentTime = 0;
    stampSound.play().catch();
    invitationOpened = true;

    setTimeout(function () {
        cover.classList.add('opening');
        setTimeout(function () {
            cover.style.display = 'none';
            invitation.classList.remove('hidden');
            quickNav.style.display = 'flex';
            window.scrollTo(0, 0);
            startGoldDust();
        }, 500);
    }, 2000);
});

// Countdown rabu 10 February 2027 08.00 WIB (UTC+7).
const weddingDate = new Date('2027-02-10T08:00:00+07:00').getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((distance / (1000 * 60 * 60)) % 24));
    const minutes = Math.max(0, Math.floor((distance / (1000 * 60)) % 60));
    const seconds = Math.max(0, Math.floor((distance / 1000) % 60));
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// soundtrack
const music = document.getElementById("wedding-music");
const musicButton = document.getElementById("music-button");

musicButton.addEventListener("click", function () {
    if (music.paused) {
        music.play();
        musicButton.textContent = "Ⅱ Pause Music";
    } else {
        music.pause();
        musicButton.textContent = "▶ Play Music";
    }
});


// confirm attendance
document.getElementById('rsvpForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const guestName = document.getElementById('guestName').value.trim();
    const attendance = document.getElementById('attendance').value;
    alert('Thank you, ' + guestName + '! Your response: ' + attendance);
    this.reset();
});

// particle
function startGoldDust() {
    for (let i = 0; i < 16; i++) {
        setTimeout(createGoldDot, i * 250);
    }
    setInterval(createGoldDot, 850);
}
function createGoldDot() {
    if (!invitation || invitation.classList.contains('hidden')) return;
    const dot = document.createElement('span');
    dot.className = 'particle';
    dot.style.left = Math.random() * 100 + 'vw';
    dot.style.animationDuration = (7 + Math.random() * 7) + 's';
    dot.style.opacity = (0.2 + Math.random() * 0.35).toString();
    document.body.appendChild(dot);
    setTimeout(function () { dot.remove(); }, 15000);
}

