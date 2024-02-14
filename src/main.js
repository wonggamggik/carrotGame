// class onGame {}

// class resultGame {}

// class ingameInform {}

class musicCotrol {
  constructor(audio) {
    this.audio = audio;
  }
  playMusic() {
    this.audio.play();
  }
  stopMusic() {
    this.audio.load();
  }
}

// Button
const gameButton = document.querySelector(".button__start");
const gameButtonIcon = document.querySelector(".button__start > i");

// audio 변수들
const audio__bg = document.querySelector(".audio__bg");
const audio__alert = document.querySelector(".audio__alert");
const audio__bug = document.querySelector(".audio__bug");
const audio__carrot = document.querySelector(".audio__carrot");
const audio__win = document.querySelector(".audio__win");
const audioBg = new musicCotrol(audio__bg);
const audioAlert = new musicCotrol(audio__alert);
const audioBug = new musicCotrol(audio__bug);
const audioCarrot = new musicCotrol(audio__carrot);
const audioWin = new musicCotrol(audio__win);

gameButton.addEventListener("click", (e) => {
  if (audio__bg.paused) {
    audioBg.playMusic();
    gameButtonIcon.classList.remove("fa-play");
    gameButtonIcon.classList.add("fa-stop");
  } else {
    audioBg.stopMusic();
    gameButtonIcon.classList.remove("fa-stop");
    gameButtonIcon.classList.add("fa-play");
  }
});

// const music = new playMusic();
// music.playBGM();
