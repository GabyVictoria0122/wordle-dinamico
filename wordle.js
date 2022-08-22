let salvarStorage = ''
let palavrasValidas = []
// salvo()
palavrasValidasAcentuadas.forEach(function (element) {
  palavrasValidas.push(element.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
})
const palavrasValidasU = palavrasValidas.toUpperCase
palavraPorDia()
var palavraDoDia = 'OSSOS'

let linha = 1;
let entrada = [];
let acerto = false
aceitaPalavra = false
console.log(acerto)

function palavraPorDia() {
  listDate = []
  //gerador da lista de datas
  const dateIntervalGenerator = (() => {
    const _generateInterval = (startDate, endDate) => {
      const date = new Date(startDate.getTime());
      const dates = [];
      while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return dates;
    };
    return {
      generateIn: _generateInterval,
    };
  })();

  d1 = new Date('2022-08-19');
  d2 = new Date('2025-11-19');
  dates = dateIntervalGenerator.generateIn(d1, d2);
  //return 2022/08/19
  dates.forEach(element => {
    listDate.push(element.toLocaleDateString())
  });
  //indice lista de datas igual ao indice de 
  let indice = listDate.indexOf(new Date().toLocaleDateString())
  console.log(indice)
  let dia = palavrasValidas[indice]
  // palavraDoDia = dia.toUpperCase()
}

const trataTecla = (tecla) => {
  let char = tecla.toUpperCase();
  let alfabeto = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'ENTER', 'BACKSPACE'];

  // INVALIDAR PALAVRA
  if (!alfabeto.includes(char)) {
    console.log("tecla válida", char);
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
    //SALVANDO
    localStorage.setItem('entrada', JSON.stringify([entrada.join('')]))
    if (validarPalavra()) {
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

// function salvo() {

//   if (localStorageChar) {
//     console.log("ta indo")
//     for (var i in localStorageChar) {
//       x = localStorageChar[i]
//       exibeLetra(x)
//     }
//     return

//   }
// }


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

function validarPalavra() {
  if (entrada.length == 5) {
    for (var i of palavrasValidas) {
      if (i == entrada.join("").toLowerCase()) {
        return true
        break
      }
    }
  } if (!acerto) alert("Palavra Inválida")
  return false
}


function validarEntrada() {
  debugger
  for (var i = 1; i <= 5; i++) {
    let elId = `l${linha}c${i}`;
    const el = document.getElementById(elId);
    if (palavraDoDia[i - 1] == el.textContent) {
      teclaPinta = document.getElementById(el.textContent)
      teclaPinta.classList.add("fullcorrect")
      el.classList.add("fullcorrect")
    }
    if (palavraDoDia.includes(el.textContent)) {
      teclaPinta = document.getElementById(el.textContent)
      teclaPinta.classList.add("correct")
      el.classList.add("correct")
    }
    else {
      teclaPinta = document.getElementById(el.textContent)
      teclaPinta.classList.add("incorrect")
      el.classList.add("incorrect")
    }
  }


  if ((entrada.length = 5 && entrada.join("") == palavraDoDia)) {
    let elId = `l${linha}c${entrada.length + 1}`;
    const el = document.getElementById(elId);
    alert("correto");
    acerto = true
    console.log(acerto)
  }
  //apagar itens da entrada
  let jaEscrito = entrada.slice(entrada.length);
}
console.log("validar se " + entrada.join("") + " é igual " + palavraDoDia);


//ouve quando o cliente aperta uma tecla
document.body.addEventListener("keydown", ouvinteDeTeclas);
document.querySelectorAll(".tecla").forEach((el) => {
  el.addEventListener("click", function (el) {
    let letra = el.srcElement.textContent
    if (letra == '⌫') {
      letra = "BACKSPACE"
    }
    trataTecla(letra)

  })
})