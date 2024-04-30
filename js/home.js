// 인기 영화 목록 api 키
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmY3YmIwNjI3MTAxMTc3Y2EyZjFjZDY5ODVjNGQ1OCIsInN1YiI6IjY2MjhiODc4Mzk1NDlhMDE4OTAxNGVlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uD1flqSov2jhF19LcIE3vj-O8ouXl0zVO9tW_A40NDA",
  },
};

let movieArr = [];
let movieItem = [];
let movieInfo;
let movieMap = new Map();

/** 영화 API 불러오기 */
const callApi = async () => {
  for (let i = 1; i < 10; i++) {
    let url =
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=" + i;
    await fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        //movie 정보 넣기

        data["results"].forEach((e) => {
          movieArr.push(e);
        });
        movieArr.forEach((e) => {
          movieCard(e);
        });
        cardDiv.replaceChildren();
      })
      .catch((err) => console.error(err));
  }
};

callApi();

//card들을 넣을 div
let cardDiv = document.getElementById("cardsDiv");

/** 영화 카드를 만드는 함수 */

//전체보기 클릭 시
const allMovieListBtn = document.getElementById("showAllMoive");
allMovieListBtn.addEventListener("click", () => {
  moveDiv();
  div.replaceChildren();
  cardDiv.replaceChildren();
  showCategory();
  movieArr.forEach((e) => {
    movieCard(e);
  });
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
});

/** 카드를 만드는 함수 */
const movieCard = (item) => {
  //item에 들어있는 영화 정보

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

//카테고리 나오게하는 함수
const showCategory = () => {
  let category = document.getElementById("category");
  category.style.display = "block";
};

//이벤트 시 로고 움직이는 함수
const moveDiv = () => {
  let header = document.getElementById("header");
  let logo = document.getElementById("logo");
  let showAll = document.getElementById("showAllMoive");
  let searchBox = document.getElementById("searchDiv");
  let main = document.getElementById("main");

  header.style.width = `600px`;
  header.style.top = `20px`;
  header.style.left = 0;
  logo.style.fontSize = `40px`;
  searchBox.style.top = 0;
  searchBox.style.left = `500px`;
  searchBox.style.justifyContent = "normal";
  searchBox.style.margin = "50px 0";
  searchBox.style.padding = "0";
  main.style.height = "150px";
};

//엔터 누를 시
const pressEnter = (e) => {
  let inputText = document.getElementById("searchInput").value;
  if (e.keyCode == 13) {
    e.preventDefault();
    div.replaceChildren();
    if (inputText !== "") {
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
  div.replaceChildren();
  if (inputText !== "") {
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

//연관 검색 찾아주는 함수
const search = () => {
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
    for (i = 0; i < 5; i++) {
      similar(similarTitle[i]);
    }
  } else {
    similarTitle.forEach((i) => similar(i));
  }
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
  movieArr.forEach((item) => {
    let movieTitle = item["name"];
    if (movieTitle.toLowerCase().includes(text)) {
      cardDiv.appendChild(movieMap.get(movieTitle));
    }
  });
};

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
