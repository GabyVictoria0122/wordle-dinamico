const palavrasValidas = ["arroz", "amora", "teste"];

const palavraDoDia = "arroz";

let linha = 1;
let entrada = [];

const ouvinteDeTeclas = (event) => {
  let char = event.key.toUpperCase();
  let alfabeto = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "ENTER",
    "BACKSPACE",
  ];

  if (!alfabeto.includes(char)) {
    // INVALIDAR PALAVRA
    console.log("tecla inválida", char);
    return null;
  }

  if (char == "BACKSPACE") {
    // REMOVE LETRA
    entrada.pop();
    console.log(entrada);
    retiraLetra();
    return;
  }

  if (char == "ENTER") {
    // VALIDAR PALAVRA
    validarEntrada();
    linha += 1;
    return;
  }

  entrada.push(char);
  console.log(entrada.length, "coluna");
  console.log(linha, "linha");

  exibeLetra(char);
};

function exibeLetra(letra) {
  let elId = `l${linha}c${entrada.length}`;
  const el = document.getElementById(elId);
  el.textContent = letra;
}

function retiraLetra(letra) {
  let elId = `l${linha}c${entrada.length + 1}`;
  const el = document.getElementById(elId);

  el.textContent = "";
  console.log(entrada.length, "coluna");
}

function validarEntrada() {
  if (entrada.join("") == palavraDoDia.toUpperCase()) {
    alert("correto");
  }
  console.log("validar se " + entrada.join("") + " é igual " + palavraDoDia);
}

document.body.addEventListener("keydown", ouvinteDeTeclas);
