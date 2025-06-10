let navItem = document.querySelectorAll(".scroller h3");
let sections = document.querySelectorAll("main > section:not(.nav)")
let musicImg = document.querySelector("#musicPlay img");
let musicContainer = document.querySelector("#musicPlay")
let playpause = document.querySelector(".musicimg i");
let add = document.querySelector(".ri-add-line");
let songSelect = document.querySelector("#inputSong");
let waves = document.querySelector("#waveform");
let nav = document.querySelector(".nav")
let musicFullImg = document.querySelector(".musicimg");
const volumeSlider = document.getElementById('volumeControl');
const iconVol = document.querySelector(".volum i");
const controls = document.querySelector(".controls");
const songName = document.querySelector(".songname");
const playPauseBtn = document.querySelector("#playPauseBtn");
let backbtn = document.querySelector("#backbtn");
let allplay = document.querySelector(".allplay");






volumeSlider.addEventListener("input", (e) => {
    pl.setVolume(e.target.value);
    if (e.target.value > 0.5) {
        iconVol.className = "ri-volume-up-fill"
    } else if (e.target.value <= 0.5 && e.target.value > 0) {
        iconVol.className = "ri-volume-down-fill"
    } else {
        iconVol.className = "ri-volume-mute-fill"
    }
});


document.getElementById("song").style.display = "block";
playpause.style.display = "none";
navItem[0].style.scale = 1.3
let defImg = "./Assets/defaultimg.png";
musicImg.style.display = "none"
volumeSlider.style.display = "none";
iconVol.style.display = "none";
controls.style.display = "none";
waves.style.display = "none";
songName.style.display = "none";
backbtn.style.display = "none";


navItem.forEach((nav) => {
    nav.addEventListener("click", () => {
        sections.forEach((section) => (section.style.display = "none"));
        const targetId = nav.dataset.target;
        const targetSection = document.getElementById(targetId)
        if (targetSection) {
            targetSection.style.display = 'block'
        }
    })
})



class MusicPlayer {
    constructor(urlD) {
        this.url = urlD,
            this.musics = [];
        this.wavesurfer = null,
            this.currentUrl = null;
        this.currentIndex = 0;
        this.recent = []
        if (this.url) {
            this.initPlayer(this.url)
        }
    }

    initPlayer(url) {
        if (this.wavesurfer && this.currentUrl === url) {

            return;
        }
        this.currentUrl = url;


        if (this.wavesurfer) {
            this.wavesurfer.destroy();

            this.wavesurfer = null;
        }
        this.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#4F4A85',
            progressColor: '#383351',
            height: 30,
            barGap: 1,
            // barRadius: ,                      
            responsive: true,
            url: url,

        })


        this.wavesurfer.on('ready', () => {
            this.wavesurfer.play();
        });
        this.wavesurfer.on('finish', () => {
            this.next();
        });
    }
    setVolume(val) {
        if (this.wavesurfer) {
            this.wavesurfer.setVolume(val);
        }
    }
    allmusic(music) {
        this.musics.push(...music)
    }

    renderMusic() {
        let ul = songID.querySelector("ul");
        ul.innerHTML = "";

        this.musics.forEach((music, index) => {
            let li = document.createElement("li");
            let img = document.createElement("img");
            img.src = music.img;
            let textSpan = document.createElement("span");
            textSpan.textContent = music.name.substring(0, 28) + ".....";
            li.appendChild(img);
            li.appendChild(textSpan);
            li.addEventListener('click', () => {
                this.initPlayer(music.url);
                this.currentIndex = index;
                playpause.classList.remove("ri-play-fill");
                playpause.classList.add("ri-pause-line");
                musicContainer.style.height = "9vh";
                musicImg.style.display = "block";
                playpause.style.display = "block";
                ul.style.paddingBottom = '5rem';
                songName.textContent = music.name
                songName.style.display = "block";
                this.updateRecent(music);
            });

            ul.appendChild(li);
        });
    }
    next() {
        if (this.currentIndex < this.musics.length - 1) {
            this.currentIndex++;
            const nextSong = this.musics[this.currentIndex];
            this.initPlayer(nextSong.url);
            songName.textContent = nextSong.name;
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            const prevSong = this.musics[this.currentIndex];
            this.initPlayer(prevSong.url);
            songName.textContent = prevSong.name;
        }
    }
    updateRecent(music) {

        this.recent = this.recent.filter(m => m.url !== music.url);
        this.recent.unshift(music);
        if (this.recent.length >= 9) {
            this.recent.pop();
        }
        this.renderRecent();
    }

    renderRecent() {
        const recentUl = document.getElementById("recentList");
        if (!recentUl) return;

        recentUl.innerHTML = "";

        this.recent.forEach((music) => {
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.src = music.img;
            const text = document.createElement("span");
            text.textContent = music.name.substring(0, 28) + "...";

            li.appendChild(img);
            li.appendChild(text);

            li.addEventListener("click", () => {
                this.initPlayer(music.url); // Play song
                songName.textContent = music.name; // Set name

                musicContainer.classList.add("musicPlay-Full");
                document.body.style.overflow = "hidden";
                musicFullImg.classList.add("innerIcon");
                musicImg.classList.add("img");
                volumeSlider.style.display = "block";
                iconVol.style.display = "block";
                controls.style.display = "flex";
                playpause.style.display = "none";
                waves.style.display = "block";
                songName.style.display = "none";
                backbtn.style.display = "block";
                isFullScreen = true;

                playpause.classList.remove("ri-play-fill");
                playpause.classList.add("ri-pause-line");

                this.updateRecent(music);
            });

            recentUl.appendChild(li);
        });
    }



}
let isPlay = true;
let playPause = document.querySelector(".musicimg")
function updatePlayState() {
    if (pl.wavesurfer) {
        pl.wavesurfer.playPause();
        isPlay = !isPlay;


        if (isPlay) {
            playpause.classList.remove("ri-play-fill");
            playpause.classList.add("ri-pause-line");

            playPauseBtn.className = "ri-pause-fill";
            return true;

        } else {
            playpause.classList.remove("ri-pause-line");
            playpause.classList.add("ri-play-fill");

            playPauseBtn.className = "ri-play-fill";
            return false
        }
    }
}
playpause.addEventListener('click', (e) => {
    e.stopPropagation();
    updatePlayState();
});
playPauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    updatePlayState();

});

class Newmusic {
    constructor(name, img, url) {
        this.name = name,
            this.img = img,
            this.url = url
    }
}
const song = [
    new Newmusic("ARIJIT SINGH VERSION_ Bekhayali Full Song _ Kabir Singh _ Shahid K,Kiara A _ Sandeep Reddy V_ Irshad", "./Assets/Music thumnail/1.jpg", "./Assets/Music/ARIJIT SINGH VERSION_ Bekhayali Full Song _ Kabir Singh _ Shahid K,Kiara A _ Sandeep Reddy V_ Irshad.mp3"),
    new Newmusic("Arijit Singh_ Pachtaoge _ Vicky Kaushal, Nora Fatehi _Jaani, B Praak, Arvindr Khaira _ Bhushan Kumar", "./Assets/Music thumnail/2.jpg", "./Assets/Music/Arijit Singh_ Pachtaoge _ Vicky Kaushal, Nora Fatehi _Jaani, B Praak, Arvindr Khaira _ Bhushan Kumar.mp3"),
    new Newmusic("Atif A_ Dekhte Dekhte Song _ Batti Gul Meter Chalu _ Shahid K Shraddha K _ Nusrat Saab Rochak Manoj", "./Assets/Music thumnail/3.jpg", "./Assets/Music/Atif A_ Dekhte Dekhte Song _ Batti Gul Meter Chalu _ Shahid K Shraddha K _ Nusrat Saab Rochak Manoj.mp3"),
    new Newmusic("FULL SONG_ Chashni _ Bharat _ Salman Khan, Katrina Kaif _ Vishal & Shekhar ft. Abhijeet Srivastava", "./Assets/Music thumnail/4.jpg", "./Assets/Music/FULL SONG_ Chashni _ Bharat _ Salman Khan, Katrina Kaif _ Vishal & Shekhar ft. Abhijeet Srivastava.mp3"),
    new Newmusic("Full Song_ Tujhe Kitna Chahein Aur (Film Version) _ Kabir Singh _ Shahid K, Kiara A _ Mithoon _Jubin", "./Assets/Music thumnail/5.jpg", "./Assets/Music/Full Song_ Tujhe Kitna Chahein Aur (Film Version) _ Kabir Singh _ Shahid K, Kiara A _ Mithoon _Jubin.mp3"),
    new Newmusic("Main Rahoon Ya Na Rahoon Full Video _ Emraan Hashmi, Esha Gupta _ Amaal Mallik, Armaan Malik", "./Assets/Music thumnail/6.jpg", "./Assets/Music/Main Rahoon Ya Na Rahoon Full Video _ Emraan Hashmi, Esha Gupta _ Amaal Mallik, Armaan Malik.mp3"),
    new Newmusic("SIMMBA_ Tere Bin _ Ranveer Singh, Sara Ali Khan _ Tanishk Bagchi, Rahat Fateh Ali Khan, Asees Kaur", "./Assets/Music thumnail/7.jpg", "./Assets/Music/SIMMBA_ Tere Bin _ Ranveer Singh, Sara Ali Khan _ Tanishk Bagchi, Rahat Fateh Ali Khan, Asees Kaur.mp3"),
    new Newmusic("Soch Na Sake FULL VIDEO SONG _ AIRLIFT _ Akshay Kumar, Nimrat Kaur _ Arijit Singh, Tulsi Kumar", "./Assets/Music thumnail/8.jpg", "./Assets/Music/Soch Na Sake FULL VIDEO SONG _ AIRLIFT _ Akshay Kumar, Nimrat Kaur _ Arijit Singh, Tulsi Kumar.mp3"),
    new Newmusic("Tum Hi Ho Aashiqui 2  Full Video Song HD _ Aditya Roy Kapur, Shraddha Kapoor _ Music - Mithoon (1)", "./Assets/Music thumnail/9.jpg", "./Assets/Music/Tum Hi Ho Aashiqui 2  Full Video Song HD _ Aditya Roy Kapur, Shraddha Kapoor _ Music - Mithoon (1).mp3"),

]


let songID = document.querySelector("#song")
let pl = new MusicPlayer()
pl.allmusic(song);


add.addEventListener("click", () => {
    songSelect.click();
})

pl.renderMusic()

songSelect.addEventListener("change", (e) => {
    const file = e.target.files;
    if (file.length > 0) {
        for (let i = 0; i < file.length; i++) {
            let fileUrl = URL.createObjectURL(file[i])
            pl.musics.push(new Newmusic(file[i].name, defImg, fileUrl));
            musicImg.style.display = "block"
        }
    }
    pl.renderMusic()
})

let isFullScreen = false;

musicContainer.addEventListener("click", () => {
    if (pl.wavesurfer && !isFullScreen) {
        musicContainer.classList.add("musicPlay-Full");
        document.body.style.overflow = "hidden";
        musicFullImg.classList.add("innerIcon");
        musicImg.classList.add("img");
        volumeSlider.style.display = "block";
        iconVol.style.display = "block";
        controls.style.display = "flex";
        playpause.style.display = "none";
        waves.style.display = "block";
        songName.style.display = "none";
        backbtn.style.display = "block";
        isFullScreen = true;
    }
});

backbtn.addEventListener("click", (e) => {
    e.stopPropagation();
    musicContainer.classList.remove("musicPlay-Full");
    document.body.style.overflow = "auto";
    musicFullImg.classList.remove("innerIcon");
    musicImg.classList.remove("img");
    volumeSlider.style.display = "none";
    iconVol.style.display = "none";
    controls.style.display = "none";
    playpause.style.display = "block";
    waves.style.display = "none";
    songName.style.display = "block";
    backbtn.style.display = "none";
    isFullScreen = false;
});




document.getElementById("nextBtn").addEventListener("click", () => {
    pl.next();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    pl.prev();
});
