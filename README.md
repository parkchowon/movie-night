# 🎥MovieNight

![image](https://github.com/parkchowon/MovieSearch/assets/70216263/d9cdc814-5989-44f9-81b4-9da9a76b5771)

## 🗓️ 프로젝트 소개

<ol>
  <li>사이트 : https://parkchowon.github.io/MovieSearch/</li>
  <li>제작 기간 : 2024.04.23~2024.04.29</li>
  <li>개발 언어 : HTML, JavaScript, CSS</li>
  <li>소개 : 영화 API를 이용하여 영화를 검색할 수 있는 사이트</li>
</ol>

## ❗프로젝트 필수 요구 사항

<ol>
  <li>jQuery 라이브러리 사용없이 순수 바닐라 자바스크립트 사용하기</li>
  <li>TMDB 오픈 API를 이용하여 인기영화 데이터 가져오기</li>
  <li>영화정보 카드 리스트 UI 구현</li>
  <li>영화 검색 UI 구현</li>
  <li>아래 기재된 Javascript 문법 요소를 이용하여 구현</li>
  <ol>
    <li>const와 let만을 이용한 변수 선언 필수</li>
    <li>화살표 함수 : 아래 예시 중 1개 이상 사용</li>
    <li>배열 메소드 : 하기 예시 중 2개 이상 사용</li>
    <li>DOM 제어하기 : 아래 api 목록 중 2개 이상 사용하기</li>
  </ol>
</ol>

## 💻구현 화면

### ✅ [랜딩 화면]

![](https://velog.velcdn.com/images/candlecircle/post/b27bf44f-3386-41f3-a5c4-dcc7c4067308/image.png)

#### [ mouse hover ]

<img src="https://velog.velcdn.com/images/candlecircle/post/adbcd9b1-6826-45b7-8561-98f5f9752e9c/image.gif" />

▶️ 클릭 이벤트가 들어가는 요소들에 hover를 넣어줬다.

#### [ 연관 검색어 기능 ]

<img src="https://velog.velcdn.com/images/candlecircle/post/99529e38-693c-4419-bb29-36cd9ffa018c/image.gif" />
▶️ input 창에 3글자 이상 작성하면 작성한 단어가 들어가 있는 영화 제목을 최대 5개 보여준다.

### ✅ [검색 화면]

![](https://velog.velcdn.com/images/candlecircle/post/ccbedbd0-407c-4059-a9f5-f921ba5c94ad/image.png)

▶️ 전체 보기 버튼이나 엔터, 서치 버튼 이벤트 시 영화 카드가 들어있는 화면을 보여준다.
이때, 화면을 넘기는 거 보다 그냥 헤더랑 인풋창을 위로 올리는 식으로 구현했다.

#### [ 이동 화면 ]

<img src="https://velog.velcdn.com/images/candlecircle/post/ed92b3ca-e43b-45af-b70f-1935b2904e77/image.gif" />

▶️ see all을 클릭할 시, api에서 받아온 영화 카드가 보이게 된다.

#### [ 정렬 기능 ]

<img src="https://velog.velcdn.com/images/candlecircle/post/50844a9c-7df4-4cfd-95f0-fa29e2d8c86b/image.gif" />

▶️평점순과 이름순을 클릭하면 분류대로 검색한카드가 정렬되어 나오고 호버 기능을 넣었다.

#### [ 검색한 카드결과 화면 ]

<img src="https://velog.velcdn.com/images/candlecircle/post/dc01d646-222c-4817-b4a3-61bd0a5639d8/image.gif" />

▶️ 검색 화면에서 검색 후 엔터나 서치 버튼을 누르면 입력한 문자가 들어간 영화 카드를 보여준다.(메인 화면에서도 동일하다) 또 gif엔 안보이지만 그 상태에서도 이름순, 별점순으로 나열이 된다.

#### [ 영화 카드 클릭 시 ]

<img src="https://velog.velcdn.com/images/candlecircle/post/a803fa44-7f71-4b8f-a8e8-95191e6d001d/image.png" />

▶️ 필수 구현 기능에 들어가있어서 만든 카드 클릭 시 id를 alert 창에 뜨게 하는 기능이다.
