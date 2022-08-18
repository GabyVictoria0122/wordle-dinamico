const palavraDoDia = "ARROZ";

let linha = 1;
let entrada = [];

const trataTecla = (tecla) => {
  let char = tecla.toUpperCase();
  let alfabeto = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'ENTER', 'BACKSPACE'];

  // INVALIDAR PALAVRA
  if (!alfabeto.includes(char)) {
    console.log("tecla inválida", char);
    return null;
  }

  // REMOVE LETRA
  if (char == "BACKSPACE") {
    entrada.pop();
    console.log(entrada);
    retiraLetra();
    return;
  }

  // VALIDAR PALAVRA
  if (char == "ENTER") {
    if (entrada.length == 5) {
      validarEntrada();
      linha += 1;
    }
    return;
  }

  if (entrada.length >= 5) {
    return null;
  } else {
    entrada.push(char);
  }
  console.log(entrada, "coluna");
  console.log(linha, "linha");

  exibeLetra(char);
}


const ouvinteDeTeclas = (event) => {
  trataTecla(event.key)
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
  for (var i = 1; i <= 5; i++) {
    let elId = `l${linha}c${i}`;
    const el = document.getElementById(elId);
    if (palavraDoDia[i - 1] == el.textContent) {
      el.classList.add("fullcorrect")
      console.log(entrada.indexOf(palavraDoDia[i]), 'posição')
    }
    if (palavraDoDia.includes(el.textContent)) {
      el.classList.add("correct")
      console.log(elId)
      console.log(entrada.includes(palavraDoDia[i]))
    }
    else
      el.classList.add("incorrect")


    // RETORNA O INDICE DO VALOR(POSIÇÃO)
  }



  if ((entrada.length = 5 && entrada.join("") == palavraDoDia.toUpperCase())) {
    // let elId = `l${linha}c${entrada.length}`;
    // const el = document.getElementById(elId);
    // if (entrada.join("").search(palavraDoDia)) {
    //   el.classList.add("fullcorrect")
    // }


    // if () {
    el.classList.add("correct")
    // }
    el.classList.add("incorrect")

    alert("correto");
  }
}
//apagar itens da entrada
entrada.slice(entrada.length);
console.log("validar se " + entrada.join("") + " é igual " + palavraDoDia);


//ouve quando o cliente aperta uma tecla
document.body.addEventListener("keydown", ouvinteDeTeclas);
document.querySelectorAll(".tecla").forEach((el) => {
  el.addEventListener("click", function (el) {
    let letra = el.srcElement.textContent
    if (letra == '') {
      letra = "BACKSPACE"
    }
    trataTecla(letra)

  })
})