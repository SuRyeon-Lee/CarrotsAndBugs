"use strict";

const playBtn = document.querySelector(".play-button");
const stopBtn = document.querySelector(".stop-button");
const counter = document.querySelector(".count");
const field = document.querySelector(".field");
const body = document.querySelector("body");
const bg = document.querySelector(".bg-grey");
const lose = document.querySelector(".lose");
const win = document.querySelector(".win");
const tryBtn = document.querySelector(".again-btn");

const caseLose = function () {
  bg.style.display = `block`;
  lose.style.display = `block`;
};
const caseWin = function () {
  bg.style.display = `block`;
  win.style.display = `block`;
};

// tryBtn.addEventListener("click", () => {
//   console.log("what");
//   //   window.location.reload();
// });
const setBugs = function (i) {
  for (let i = 0; i < 20; i++) {
    const bugs = document.createElement("img");
    bugs.setAttribute("id", `${i}`);
    bugs.setAttribute("class", `bugs`);
    bugs.setAttribute("src", "./img/bug.png");

    // 랜덤하게 뿌리기
    const minY = field.getBoundingClientRect().top;
    const maxY = field.getBoundingClientRect().bottom;
    const minX = field.getBoundingClientRect().left;
    const maxX = field.getBoundingClientRect().right;
    const randomY = parseInt(Math.random() * (maxY - minY));
    const randomX = parseInt(Math.random() * (maxX - minX - 10) + minX);
    bugs.style.bottom = `${randomY}px`;
    bugs.style.left = randomX + "px";

    // field에 자식 노드로 뿌리기
    field.appendChild(bugs);
    bugs.addEventListener("click", () => {
      caseLose();
    });
  }
};

const setCarrots = function () {
  const maxCarrot = 20;
  counter.innerHTML = `${maxCarrot}`
  for (let i = 0; i < maxCarrot; i++) {
    const carrots = document.createElement("img");
    carrots.setAttribute("id", `${i}`);
    carrots.setAttribute("class", `carrots`);
    carrots.setAttribute("src", "./img/carrot.png");
    // 랜덤하게 뿌리기
    const minY = field.getBoundingClientRect().top;
    const maxY = field.getBoundingClientRect().bottom;
    const minX = field.getBoundingClientRect().left;
    const maxX = field.getBoundingClientRect().right;
    const randomY = parseInt(Math.random() * (maxY - minY));
    const randomX = parseInt(Math.random() * (maxX - minX - 10) + minX);
    carrots.style.bottom = `${randomY}px`;
    carrots.style.left = randomX + "px";
    // field에 자식 노드로 뿌리기
    field.appendChild(carrots);
    carrots.addEventListener("click", () => {
      field.removeChild(carrots);
      checkCarrots();
    });
  }
};

const timer = function () {
  const second = document.querySelector(".s");
  const mSecond = document.querySelector(".ms");
  stopBtn.style.display = "block";
  playBtn.style.display = "none";
  let i = 20;
  setCarrots();
  setBugs();
  const reapeat = window.setInterval(() => {
    if (i > 0) {
      second.innerHTML = `${i}`;
      i--;
      let e = 99;
      window.setInterval(() => {
        if (e > -1) {
          mSecond.innerHTML = `${e}`;
          e--;
        }
      }, 10);
    } else if (i == 0) {
      second.innerHTML = `${i}`;
      clearInterval(reapeat);
      playBtn.style.display = "block";
      stopBtn.style.display = "none";
      // 0초가 되면 일어나는 함수
      bg.style.display = `block`;
      lose.style.display = `block`;
    }
    stopBtn.addEventListener("click", () => {
      i = 0;
      playBtn.style.display = "block";
      stopBtn.style.display = "none";
    });
  }, 1000);
};
const checkCarrots = function(){
  const carrot = document.querySelector('.carrots');
  const carrots = document.querySelectorAll('.carrots').length;
  counter.innerHTML = `${carrots}`;
  // console.log(field.contains(carrot));
  if (carrots == 0){
    caseWin();
  }
};

playBtn.addEventListener("click", () => {
  timer();
});

window.addEventListener("resize", () => {
  window.location.reload();
});
