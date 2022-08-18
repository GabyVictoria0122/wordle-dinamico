const palavraDoDia = "ARROZ";

let linha = 1;
let entrada = [];
let acerto = false
console.log(acerto)

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
    if (!acerto) {
      entrada.pop();
      retiraLetra();
      return;
    } else return null
  }

  // VALIDAR PALAVRA
  if (char == "ENTER") {
    if (entrada.length == 5) {
      validarEntrada();
      if (!acerto) {
        linha += 1;
      }
    }
    return;
  }

  if (entrada.length >= 5) {
    return null;
  } else {
    entrada.push(char);
  }
  if (!acerto) {
    exibeLetra(char);
  }
}


const ouvinteDeTeclas = (event) => {
  trataTecla(event.key)
};


function exibeLetra(letra) {
  let elId = `l${linha}c${entrada.length}`;
  const el = document.getElementById(elId);
  el.textContent = letra;

}

function retiraLetra() {
  let elId = `l${linha}c${entrada.length + 1}`;
  const el = document.getElementById(elId);
  el.textContent = "";
}

function validarEntrada() {
  for (var i = 1; i <= 5; i++) {
    let elId = `l${linha}c${i}`;
    const el = document.getElementById(elId);
    if (palavraDoDia[i - 1] == el.textContent) {
      el.classList.add("fullcorrect")
    }
    if (palavraDoDia.includes(el.textContent)) {
      el.classList.add("correct")
    }
    else
      el.classList.add("incorrect")
  }

  if ((entrada.length = 5 && entrada.join("") == palavraDoDia.toUpperCase())) {
    let elId = `l${linha}c${entrada.length + 1}`;
    const el = document.getElementById(elId);
    alert("correto");
    acerto = true
    console.log(acerto)
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