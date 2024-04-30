import getApi from "./apis.js";
import { movieArr } from "./apis.js";
import { showCategory, moveDiv, similar, notFound } from "./assets.js";
import { div } from "./assets.js";
let movieMap = new Map(); //movie 카드 저장할 map
let cardDiv = document.getElementById("cardsDiv"); //card들을 넣을 div

//api 받아옴
getApi().then(() => {
  makeCard();
});

//movieArr값 movieCard에 넣기
const makeCard = () => {
  movieArr.forEach((e) => {
    movieCard(e);
  });
};

//전체보기 클릭 시
const allMovieListBtn = document.getElementById("showAllMoive");
allMovieListBtn.addEventListener("click", () => {
  div.replaceChildren();
  moveDiv();
  cardDiv.replaceChildren();
  showCategory();
  makeCard();
});

//엔터 누를 시
let inputText = document.getElementById("searchInput");
inputText.addEventListener("keydown", (e) => {
  if (e == 13) {
    e.preventDefault();
    div.replaceChildren();
    if (inputText.value !== "") {
      moveDiv();
      showCategory();
      showMoiveCard();
      if (cardDiv.children.length == 0) {
        showCategory();
        notFound();
      }
    } else {
      alert("Enter the text");
    }
    console.log(`enter ${inputText}`);
  }
});

/** 영화 카드를 만드는 함수 */
export const movieCard = (item) => {
  let movieTitle = item.name;
  let movieContent = item.overview;
  let movieVote = item.vote_average;
  let moviePoster = item.poster_path;
  let movieId = item.id;

  let movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  //movie card
  movieCard.innerHTML = `
        <img class="card-img" src ="http://image.tmdb.org/t/p/w200/${moviePoster}" />
        <p class="card-title">${movieTitle}</p>
        <div class="vote-div">
        <p>⭐</p>
        <p class="card-vote">${movieVote}</p>
        </div>
        <p class="card-overview">${movieContent}</p>
    `;

  //만들어진 카드 Map에 저장
  movieMap.set(movieTitle, movieCard);

  movieCard.addEventListener("click", () => {
    alert(`Movie Id : ${movieId}`);
  });

  //Div안에 카드 넣기
  cardDiv.appendChild(movieCard);
};

//일치하는 영화 카드 함수
const showMoiveCard = () => {
  cardDiv.replaceChildren();
  let text = searchInput.value.toLowerCase();
  console.log("text input:", text);
  movieArr.forEach((item) => {
    let movieTitle = item["name"];
    if (movieTitle.toLowerCase().includes(text)) {
      cardDiv.appendChild(movieMap.get(movieTitle));
    }
  });
};

/** 검색 기능 구현 */

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const boxDiv = document.getElementById("similarTitle");
let similarTitle = [];

//서치 버튼을 누를 시
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let inputText = document.getElementById("searchInput").value;
  if (inputText !== "") {
    div.replaceChildren();
    moveDiv();
    showCategory();
    showMoiveCard();
    if (cardDiv.children.length == 0) {
      showCategory();
      notFound();
    }
  } else {
    alert("Enter the text");
  }
});

//input에 검색한 단어의 연관 검색 찾아줌
searchInput.addEventListener("input", () => {
  boxDiv.replaceChildren();
  let inputText = searchInput.value.toLowerCase();
  movieArr.forEach((item) => {
    let movieTitle = item["name"];
    if (inputText.length > 2) {
      if (movieTitle.toLowerCase().includes(inputText)) {
        similarTitle.push(movieTitle);
      }
    } else {
      boxDiv.replaceChildren();
      similarTitle = [];
    }
  });

  //연관검색어 5개까지
  if (similarTitle.length > 5) {
    for (let i = 0; i < 5; i++) {
      similar(similarTitle[i]);
    }
  } else {
    similarTitle.forEach((i) => similar(i));
  }
  similarTitle = [];
});

//랜딩되면 input 포커스
searchInput.focus();

//검색창 포커스 아웃되면 연관검색어 사라지게
searchInput.addEventListener("blur", () => {
  similarTitle = [];
  boxDiv.replaceChildren();
});

//로고 클릭 시 랜딩화면
const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  window.location.reload();
});

/** 카테고리 기능 */
let voteOrder = document.getElementById("voteOrder");
let nameOrder = document.getElementById("nameOrder");
let movieNameSort = document.getElementsByClassName("card-title");
let movieVoteSort = document.getElementsByClassName("card-vote");

//평점순
voteOrder.addEventListener("click", () => {
  let obj = {};
  //key value로 key:제목 value:평점인 obj만들기
  for (let i = 0; i < movieVoteSort.length; i++) {
    obj[movieNameSort[i].innerText] = movieVoteSort[i].innerText;
  }
  //value값으로 오름차순
  let sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  cardDiv.replaceChildren();
  sorted.forEach((i) => {
    cardDiv.appendChild(movieMap.get(i[0]));
  });

  voteOrder.style.color = "red";
  nameOrder.style.color = "white";
});

//이름순
nameOrder.addEventListener("click", () => {
  let arr = [];
  for (let i = 0; i < movieNameSort.length; i++) {
    arr.push(movieNameSort[i].innerText);
    arr.sort();
  }
  cardDiv.replaceChildren();
  arr.forEach((i) => {
    cardDiv.appendChild(movieMap.get(i));
  });

  voteOrder.style.color = "white";
  nameOrder.style.color = "red";
});
