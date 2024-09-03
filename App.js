let button = document.getElementById("btn2");
let card = document.getElementById("card");
let saveItem = document.querySelector("#save-item");
let sound = document.getElementById("sound");
let input = document.getElementById("input-Word");
const historybtn = document.getElementById("historybtn");
const historyPage = document.querySelector(".historyPage");
const main = document.querySelector(".main");

button.addEventListener("click", () => {
  let inputWord = input.value;
  if (inputWord == "") {
    card.innerHTML = "<div>Please enter any word</div>";
  } else {
    card.innerHTML = "<img src='./images/loading.gif'>";
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`)
      .then((response) => response.json())
      .then((data) => {
        let definitions = data[0].meanings[0].definitions[0];

        // let mean = data[0].map((meanings) => {
        //   console.log(meanings);
        // })();

        card.innerHTML = `<div>Word : <span>${inputWord}</span></div>
    <div id="details">Part Of Speech : ${data[0].meanings[0].partOfSpeech}</div>
    
    <div class="definition">Definition : <span>${definitions.definition}</span></div>

    `;

        localStorage.setItem(`${inputWord}`, `${definitions.definition}`);
      })
      .catch(() => {
        card.innerHTML = "<h4>Couldn't Find The Word</h4>";
      });
  }
});

input.addEventListener("keypress", function (event) {
  var code = event.keyCode || event.which;
  if (code == 13) {
    let inputWord = input.value;
    if (inputWord == "") {
      card.innerHTML = "<div>Please enter any word</div>";
    } else {
      card.innerHTML = "<img src='./images/loading.gif'>";
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`)
        .then((response) => response.json())
        .then((data) => {
          card.innerHTML = `<div>Word : <span>${inputWord}</span></div>
    <div id="details">Part Of Speech : ${data[0].meanings[0].partOfSpeech}</div>
    
    <div class="definition">Definition : <span>${data[0].meanings[0].definitions[0].definition}</span></div>
    `;

          localStorage.setItem(
            `${inputWord}`,
            `${data[0].meanings[0].definitions[0].definition}`
          );
        })
        .catch(() => {
          card.innerHTML = "<h4>Couldn't Find The Word</h4>";
        });
    }
  }
});

historybtn.addEventListener("click", () => {
  if (historybtn.innerText == "HISTORY") {
    document.querySelector(".search").style.display = "none";
    card.style.display = "none";
    historyPage.style.display = "flex";
    if (localStorage.length == 0) {
      historyPage.innerHTML =
        "<div class = 'empty'><img src='./images/no_data.png' alt='image'><span>No Search Found</span></div>";
    }
    historybtn.innerHTML = "SEARCH";
    document.querySelector(".name").innerHTML =
      "<span>MY DICTIONARY APP</span><div> HISTORY</div>";
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) == "count") {
        continue;
      }
      let div = document.createElement("div");
      div.setAttribute("class", "newDiv");
      div.innerHTML = `<span>Word: <span class="getdata">${localStorage.key(
        i
      )}</span></span>
      <br>
      <p>${localStorage.getItem(localStorage.key(i))}</p>
      <i onclick="deleteDiv(this)" id="dlt" class="fa-solid fa-trash"></i>`;
      historyPage.appendChild(div);
    }
  } else if (historybtn.innerText == "SEARCH") {
    document.querySelector(".name").innerText = "MY DICTIONARY APP";
    historyPage.innerHTML = "";
    historyPage.style.display = "none";
    document.querySelector(".search").style.display = "flex";
    card.style.display = "flex";
    historybtn.innerText = "HISTORY";
  }
});

function deleteDiv(currentEl) {
  let key = currentEl.parentElement.querySelector(".getdata").innerText;
  currentEl.parentElement.remove();

  localStorage.removeItem(key);
}
