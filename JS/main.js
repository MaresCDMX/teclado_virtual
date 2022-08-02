const keys = [
  [
    ["1", "!"],
    ["2", "@"],
    ["3", "#"],
    ["4", "$"],
    ["5", "%"],
    ["6", "&"],
    ["7", "/"],
    ["8", "("],
    ["9", ")"],
    ["0", "="],
    ["'", "?"],
    ["¡", "¿"],
  ], //primera fila del teclado
  [
    ["q", "Q"],
    ["w", "W"],
    ["e", "E"],
    ["r", "R"],
    ["t", "T"],
    ["y", "Y"],
    ["u", "U"],
    ["i", "I"],
    ["o", "O"],
    ["p", "P"],
    ["`", "^"],
    ["+", "*"],
  ],
  [
    ["MAYUS", "MAYUS"],
    ["a", "A"],
    ["s", "S"],
    ["d", "D"],
    ["f", "F"],
    ["g", "G"],
    ["h", "H"],
    ["j", "J"],
    ["k", "K"],
    ["l", "L"],
    ["ñ", "Ñ"],
    ["´", "{"],
    ["ç", "}"],
  ],
  [
    ["SHIFT", "SHIFT"],
    ["<", ">"],
    ["z", "Z"],
    ["x", "X"],
    ["c", "C"],
    ["v", "V"],
    ["b", "B"],
    ["n", "N"],
    ["m", "M"],
    [",", ";"],
    [".", ":"],
  ],
  [["SPACE", "SPACE"]], //última fila del teclado
];

let mayus = false;
let shift = false;
let current = null;

renderKeyboard();

function renderKeyboard() {
  const keyboardContainer = document.querySelector("#keyboard__container");
  let empty = `<div class="key__empty"></div>`;
  const layers = keys.map((layer) => {
    return layer.map((key) => {
      if (key[0] === "SHIFT") {
        return `<button class="key key__shift rainbow rainbow-1 ${
          shift ? "activated" : ""
        }">${key[0]}</button>`;
      }
      if (key[0] === "MAYUS") {
        return `<button class="key key__mayus rainbow rainbow-1 ${
          mayus ? "activated" : ""
        }">${key[0]}</button>`;
      }
      if (key[0] === "SPACE") {
        return `<button class="key key__space rainbow rainbow-1"></button>`;
      }
      return `<button class="key key__normal rainbow rainbow-1">${
        shift
          ? key[1]
          : mayus &&
            key[0].toLocaleLowerCase().charCodeAt(0) >= 97 &&
            key[0].toLocaleLowerCase().charCodeAt(0) <= 122
          ? key[1]
          : key[0]
      }</button>`;
    });
  });

  layers[0].push(empty);
  layers[1].unshift(empty);

  const htmlLayers = layers.map((layer) => {
    return layer.join("");
  });

  keyboardContainer.innerHTML = "";

  htmlLayers.forEach((layer) => {
    keyboardContainer.innerHTML += `<div class="key__layer">${layer}</div>`;
  });

  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", (e) => {
      //console.log(e.target.innerText);
      if (current !== null) {
        if (key.textContent === "SHIFT") {
          shift = !shift;
          renderKeyboard();
        } else if (key.textContent === "MAYUS") {
          mayus = !mayus;
          renderKeyboard();
        } else if (key.textContent === "") {
          current.value += " ";
        } else {
          current.value += key.textContent;
          if (shift) {
            shift = false;
            renderKeyboard();
            current.focus();
          }
        }
      }
    });
  });
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focusin", (e) => {
    current = e.target;
    console.log(current);
  });
});

/*jQuery(document).ready(function () {
  function reorient(e) {
    let portrait = window.orientation % 180 == 0;
    console.log(portrait);
    $("body > div").css("-webkit-transform", portrait ? "rotate(-90deg)" : "");
  }
  window.onorientationchange = reorient;
  window.setTimeout(reorient, 0);
});
*/
