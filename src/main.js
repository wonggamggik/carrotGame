class ingameInform {
  constructor(carrotCount, bugCount, time) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.time = time;
  }

  carrotMinus() {
    this.carrotCount -= 1;
  }
}

class musicControl {
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

class fieldMaker {
  constructor(obj, count) {
    this.obj = obj;
    this.count = count;
  }
  makeObj() {
    const field = document.querySelector(".game__field");
    const fieldWidth = field.clientWidth;
    const fieldHeight = field.clientHeight;

    for (let i = 0; i < this.count; i++) {
      const objImg = document.createElement("img");
      field.appendChild(objImg);
      objImg.classList.add(this.obj);
      const objWidth = objImg.clientWidth;
      const clientHeight = objImg.clientHeight;
      objImg.style.left = Math.random() * (fieldWidth - objWidth) + "px";
      objImg.style.top = Math.random() * (fieldHeight - clientHeight) + "px";

      objImg.addEventListener("click", () => {
        field.removeChild(objImg);
      });
    }
  }

  removeObj() {
    const field = document.querySelector(".game__field");
    field.innerHTML = "";
  }
}

// GameInform
const inform = new ingameInform(10, 10, 10);

// Button
const gameButton = document.querySelector(".button__start");
const gameButtonIcon = document.querySelector(".button__start > i");

// audio 변수
const audio__bg = document.querySelector(".audio__bg");
const audio__alert = document.querySelector(".audio__alert");
const audio__bug = document.querySelector(".audio__bug");
const audio__carrot = document.querySelector(".audio__carrot");
const audio__win = document.querySelector(".audio__win");

// Timer
const timer = document.querySelector(".game__timer");
const timerText = document.querySelector(".game__timer-text");

let time = inform.time * 1000;
let min = Math.floor(time / (60 * 1000));
let sec = inform.time % 60 == 0 ? 60 : inform.time % 60;
let timerInterval;

timerText.innerText = `${String(min).padStart(2, "0")}:${String(sec).padStart(
  2,
  "0"
)}`;

// makeCarrot and makeBug
const field = document.querySelector(".game__field");
const carrot = document.querySelector(".game__field-carrot");
const bug = document.querySelector(".game__field-bug");
const carrotObj = new fieldMaker("game__field-carrot", 10);
const bugObj = new fieldMaker("game__field-bug", 5);

// Count
const carrotCount = document.querySelector(".game__count-text");
carrotCount.innerHTML = inform.carrotCount;

const timeViwer = () => {
  time -= 1000;
  min = Math.floor(time / (60 * 1000));

  if (sec > 0) {
    sec -= 1;
    timerText.innerText = `${String(min).padStart(2, "0")}:${String(
      sec
    ).padStart(2, "0")}`;
  }
  if (sec === 0) {
    sec = 60;
    timerText.innerText = `${String(min).padStart(2, "0")}:00`;
  }

  if (time === 0) {
    clearInterval(timerInterval);
    time = inform.time * 1000;
    min = Math.floor(time / (60 * 1000));
    sec = inform.time % 60 == 0 ? 60 : inform.time % 60;
    timerText.innerText = `${String(min).padStart(2, "0")}:${String(
      sec
    ).padStart(2, "0")}`;
    controlBGM(audio__alert);
    controlBGM(audio__bg);

    const field = document.querySelector(".game__field");
    field.innerHTML = "";
  }
};

field.addEventListener("click", (e) => {
  if (e.target.classList.value === "game__field-carrot") {
    playSoundEffect(audio__carrot);
    inform.carrotMinus();
    carrotCount.innerHTML = inform.carrotCount;
  }
});

// 게임 시작 버튼을 눌렀을 시 작동하는 기능들
gameButton.addEventListener("click", (e) => {
  // 음악 재생 or 종료
  controlBGM(audio__bg);

  // 타이머 시작 or 초기화
  if (gameButtonIcon.classList.value.includes("fa-stop")) {
    timerInterval = setInterval(timeViwer, 1000);
  } else {
    clearInterval(timerInterval);
    time = inform.time * 1000;
    min = Math.floor(time / (60 * 1000));
    sec = inform.time % 60 == 0 ? 60 : inform.time % 60;
    timerText.innerText = `${String(min).padStart(2, "0")}:${String(
      sec
    ).padStart(2, "0")}`;
    controlBGM(audio__alert);
    gameButtonIcon.classList.remove("fa-stop");
    gameButtonIcon.classList.add("fa-play");
  }

  // 게임 필드 관리
  if (gameButtonIcon.classList.value.includes("fa-stop")) {
    carrotObj.makeObj();
    bugObj.makeObj();
  } else {
    carrotObj.removeObj();
    bugObj.removeObj();
  }
});

// function 모음
// 게임이 시작할 때 BGM을 실행시키는 함수
function controlBGM(sound) {
  const audioBg = new musicControl(sound);
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
  const soundEffect = new musicControl(sound);
  if (sound.paused) {
    soundEffect.playMusic();
  } else {
    soundEffect.stopMusic();
    soundEffect.playMusic();
  }
}
