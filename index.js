
const music = document.querySelector("audio");
const play = document.getElementById("play");
const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let progress = document.getElementById("progress");
let end = document.getElementById("end");
let start = document.getElementById("start");
const progress_div = document.getElementById("progress_div");
const songs = [
    {
        name: "1",
        title: "Savage Love",
        artist: "Jungkook"
    },
    {
        name: "2",
        title: "Sweet Night",
        artist: "Kim Taehyung"
    },

]
let isplaying = false;
const pauseMusic = () => {
    isplaying = false;
    music.pause();
    play.innerHTML = "play_arrow";
    img.classList.remove("anime");
}
const playMusic = () => {
    isplaying = true;
    music.play();
    play.innerHTML = "pause";
    img.classList.add("anime");
}


const loadSongs = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name + ".mp3";
    img.src = "images/" + songs.name + ".jpg";
}
index = 0;
const nextSong = () => {
    index = (index + 1) % songs.length;
    loadSongs(songs[index]);
    playMusic();
}

const prevSong = () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSongs(songs[index]);
    playMusic();
}

music.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    if (sec_duration < 10) {
        sec_duration = `0${sec_duration}`;
    }
    let total_duration = `${min_duration}:${sec_duration}`;


    let min_current = Math.floor(currentTime / 60);
    let sec_current = Math.floor(currentTime % 60);
    if (sec_current < 10) {
        sec_current = `0${sec_current}`;
    }
    let total_current = `${min_current}:${sec_current}`;

    start.textContent = `${total_current}`;
    if (end) {
        end.textContent = `${total_duration}`;
    }
});
progress_div.addEventListener('click', (event) => {
    const { duration } = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = move_progress;

})
// play.addEventListener('keyup',(event) => {
//     if (event.code === 'Space'){
//         if(isplaying){
//             console.log("spacee");
//             playMusic();
//         }else{
//             pauseMusic();
//         }
//     }
// })
play.addEventListener('click', () => {
    if (isplaying) {
        pauseMusic();
    } else {
        playMusic();
    }
})
music.addEventListener('ended', nextSong);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);




