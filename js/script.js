// 헤더부분
let lastScrollY = window.scrollY; // 마지막 스크롤 위치
let timeout; // 헤더 숨김을 위한 타이머
const header = document.querySelector(".header");

// 모든 섹션과 메뉴 항목을 가져옴
// const sections = document.querySelectorAll("div");
// const navLi = document.querySelectorAll(".nvi li a");

// window.addEventListener("scroll", () => {
//   let current = "";

//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop;
//     const sectionHeight = section.clientHeight;
//     if (pageYOffset >= sectionTop - sectionHeight / 3) {
//       current = section.getAttribute("id");
//     }
//   });

//   navLi.forEach((a) => {
//     a.classList.remove("active");
//     if (a.getAttribute("href").includes(current)) {
//       a.classList.add("active");
//     }
//   });
// });

// 스크롤 이벤트 리스너
window.addEventListener("scroll", () => {
  clearTimeout(timeout); // 기존 타이머 초기화

  // 스크롤이 발생하면 헤더를 보이게 설정
  header.classList.remove("hidden");

  // 스크롤이 끝나고 2초 후에 헤더를 숨김
  timeout = setTimeout(() => {
    header.classList.add("hidden");
  }, 2000);

  lastScrollY = window.scrollY; // 마지막 스크롤 위치 업데이트
});

// 페이지 로드 시 헤더를 처음에 보이도록 설정
window.addEventListener("load", () => {
  header.classList.remove("hidden");
});

// 인트로부분
document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("animated-text");
  const text = "어떤 곳이든 어울리지만 존재감이 확실한"; // 표시할 텍스트

  // 글자를 하나씩 추가하는 함수
  function addTextOneByOne() {
    textElement.innerHTML = ""; // 기존 내용을 비웁니다
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${i * 0.1}s`; // 각 글자마다 애니메이션 지연 시간 설정

      // 띄어쓰기가 있으면 추가 스타일 적용
      if (char === " ") {
        span.style.display = "inline-block"; // 띄어쓰기를 인라인 블록으로 표시
        span.style.width = "20px"; // 띄어쓰기의 너비 설정 (조정 가능)
      }

      textElement.appendChild(span);
    }
  }

  addTextOneByOne(); // 텍스트 추가 함수 호출
});

// 스크롤하면 사악 나타나게
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  });

  const elements = document.querySelectorAll(".fade-in-up");
  elements.forEach((el) => observer.observe(el));
});

// SKILL
let currentSlide = 0;
const carousel = document.getElementById("sikll");
const icons = carousel.getElementsByClassName("icon");
const totalSlides = icons.length;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
const slidesToShow = 4; // 화면에 보일 아이콘 수
const slideWidth = 250; // 각 아이콘의 너비

function updateCarousel() {
  const offset = -currentSlide * slideWidth; // 이동해야 할 오프셋을 slideWidth 단위로 계산

  for (let i = 0; i < totalSlides; i++) {
    icons[i].style.transform = `translateX(${offset}px)`; // 각 아이콘의 위치를 개별적으로 이동
  }
}

function nextSlide() {
  if (currentSlide < totalSlides - slidesToShow) {
    currentSlide++;
    updateCarousel();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
}

function touchStart(event) {
  startPos = getPositionX(event);
  isDragging = true;
  animationID = requestAnimationFrame(animation);
  carousel.style.cursor = "grabbing";
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  carousel.style.cursor = "grab";

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentSlide < totalSlides - slidesToShow) {
    nextSlide();
  } else if (movedBy > 100 && currentSlide > 0) {
    prevSlide();
  } else {
    updateCarousel();
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
    setSliderPosition();
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  for (let i = 0; i < totalSlides; i++) {
    icons[i].style.transform = `translateX(${currentTranslate}px)`;
  }
}

carousel.addEventListener("mousedown", touchStart);
carousel.addEventListener("mouseup", touchEnd);
carousel.addEventListener("mousemove", touchMove);
carousel.addEventListener("mouseleave", touchEnd);

carousel.addEventListener("touchstart", touchStart);
carousel.addEventListener("touchend", touchEnd);
carousel.addEventListener("touchmove", touchMove);

updateCarousel();
