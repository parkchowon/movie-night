const boxDiv = document.getElementById("similarTitle");

export const moveDiv = () => {
  let header = document.getElementById("header");
  let logo = document.getElementById("logo");
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

//카테고리 나오게하는 함수
export const showCategory = () => {
  let category = document.getElementById("category");
  category.style.display = "block";
};

//연관검색어 HTML
export const similar = (e) => {
  let textDiv = document.createElement("div");
  textDiv.className = "similar-title";
  textDiv.innerHTML = `<p class="title-text">${e}</p>`;
  boxDiv.appendChild(textDiv);
};

//검색 결과가 없을 때 보여주는 Div
let resultDiv = document.getElementById("cardDiv");
export let div = document.createElement("div");
export const notFound = () => {
  div.className = "notfound-div";
  div.innerHTML = `<p>No search results found</p>`;
  resultDiv.appendChild(div);
};
