// 인기 영화 목록 api 키
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmY3YmIwNjI3MTAxMTc3Y2EyZjFjZDY5ODVjNGQ1OCIsInN1YiI6IjY2MjhiODc4Mzk1NDlhMDE4OTAxNGVlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uD1flqSov2jhF19LcIE3vj-O8ouXl0zVO9tW_A40NDA",
  },
};

let movieInfo;
let movieMap = new Map();

//영화 정보 불러오기
fetch(
  "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    //movie 정보 넣기
    movieInfo = data["results"];
    movieInfo.forEach((e) => {
      movieCard(e);
    });
    cardDiv.replaceChildren();
  })
  .catch((err) => console.error(err));

//card들을 넣을 div
let cardDiv = document.getElementById("cardsDiv");

/** 영화 카드를 만드는 함수 */

//전체보기 클릭 시
const allMovieListBtn = document.getElementById("showAllMoive");
allMovieListBtn.addEventListener("click", () => {
  div.replaceChildren();
  cardDiv.replaceChildren();
  showCategory();
  let cardList = movieInfo;
  cardList.forEach((e) => {
    movieCard(e);
  });

  console.log("클릭", cardList);
});

const movieCard = (item) => {
  //item에 들어있는 영화 정보
  let movieTitle = item.name;
  let movieContent = item.overview;
  let movieVote = item.vote_average;
  let moviePoster = item.poster_path;

  let movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  //movie card
  movieCard.innerHTML = `
      <img class="card-img" src ="http://image.tmdb.org/t/p/w300/${moviePoster}" />
      <p class="card-title">${movieTitle}</p>
      <p class="card-overview">${movieContent}</p>
      <p class="card-vote">${movieVote}</p>
  `;

  //만들어진 카드 Map에 저장
  movieMap.set(movieTitle, movieCard);
  //Div안에 카드 넣기
  cardDiv.appendChild(movieCard);
};

//카테고리 나오게하는 함수
const showCategory = () => {
  let category = document.getElementById("category");
  category.style.display = "block";
};

//이벤트 시 로고 움직이는 함수
const moveHeader = () => {
  let hearder = document.getElementById("header");
  let logo = document.getElementById("logo");
  let showAll = document.getElementById("showAllMoive");
  let searchBox = document.getElementById("searchDiv");
  let input = document.getElementById("searchInput");
};

//엔터 누를 시
const pressEnter = (e) => {
  let inputText = document.getElementById("searchInput").value;
  if (e.keyCode == 13) {
    div.replaceChildren();
    if (inputText !== "") {
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
};

/** 검색 기능 구현 */

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const boxDiv = document.getElementById("similarTitle");
let similarTitle = [];

//연관 검색 찾아주는 함수
const search = () => {
  boxDiv.replaceChildren();
  let inputText = searchInput.value.toLowerCase();
  movieInfo.forEach((item) => {
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
  //연관검색된 title 배열들을 div에 넣기
  similarTitle.forEach((i) => {
    similar(i);
  });
  similarTitle = [];
};

//연관검색어 HTML
const similar = (e) => {
  let textDiv = document.createElement("div");
  textDiv.className = "similar-title";
  textDiv.innerHTML = `<p class="title-text">${e}</p>`;
  boxDiv.appendChild(textDiv);
};

//검색 결과가 없을 때 보여주는 Div
let resultDiv = document.getElementById("cardDiv");
let div = document.createElement("div");
const notFound = () => {
  div.className = "notfound-div";
  div.innerHTML = `<p>No search results found</p>`;
  resultDiv.appendChild(div);
};

//일치하는 영화 카드 함수
const showMoiveCard = () => {
  cardDiv.replaceChildren();
  let text = searchInput.value.toLowerCase();
  console.log("text input:", text);
  movieInfo.forEach((item) => {
    let movieTitle = item["name"];
    if (movieTitle.toLowerCase().includes(text)) {
      cardDiv.appendChild(movieMap.get(movieTitle));
    }
  });
};
