// class onGame {}

// class resultGame {}

class ingameInform {
  constructor(carrotCount, bugCount, time) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.time = time;
  }
}

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

// audio 변수
const audio__bg = document.querySelector(".audio__bg");
const audio__alert = document.querySelector(".audio__alert");
const audio__bug = document.querySelector(".audio__bug");
const audio__carrot = document.querySelector(".audio__carrot");
const audio__win = document.querySelector(".audio__win");

gameButton.addEventListener("click", (e) => {
  playBGM(audio__bg);
});

// Timer
const timer = document.querySelector(".game__timer");
const timerText = document.querySelector(".game__timer-text");

// function
// 게임이 시작할 때 BGM을 실행시키는 함수
function playBGM(sound) {
  const audioBg = new musicCotrol(sound);
  if (sound.paused) {
    audioBg.playMusic();
    gameButtonIcon.classList.remove("fa-play");
    gameButtonIcon.classList.add("fa-stop");
  } else {
    audioBg.stopMusic();
    gameButtonIcon.classList.remove("fa-stop");
    gameButtonIcon.classList.add("fa-play");
  }
}

// BGM을 제외한 이외의 효과음들
function playSoundEffect(sound) {
  const soundEffect = new musicCotrol(sound);
  if (sound.paused) {
    soundEffect.playMusic();
  } else {
    soundEffect.stopMusic();
    soundEffect.playMusic();
  }
}
