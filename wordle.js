// Tirando acento das palavras
let palavrasValidas = []
let linha = 1;
let entrada = [];
let acerto = false
let aceitaPalavra = false
let palavraDoDia
let listDate = []
var indice
var indiceHoje
const palavrasValidasU = palavrasValidas.toUpperCase


palavrasValidasAcentuadas.forEach(function (element) {
  palavrasValidas.push(element.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
})

function palavraPorDia() {
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

  dates = dateIntervalGenerator.generateIn(new Date('2022-08-18'), new Date('2025-11-19'));
  //return 2022/08/19
  dates.forEach(element => {
    listDate.push(element.toLocaleDateString())
  });

  //indice lista de datas igual ao indice de palavras
  indice = listDate.indexOf(new Date().toLocaleDateString())
  console.log(indice)
  let dia = palavrasValidas[indice]
  palavraDoDia = dia.toUpperCase()
}
palavraPorDia()

const trataTecla = (tecla) => {
  let char = tecla.toUpperCase();
  let alfabeto = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'ENTER', 'BACKSPACE'];

  if (!alfabeto.includes(char)) {
    return;
  }

  if (char == "BACKSPACE") {
    if (!acerto) {
      entrada.pop();
      retiraLetra();
      return null
    }
  }

  if (char == "ENTER") {
    if (validarPalavra()) {
      let antigaEntrada = localStorage.getItem('entrada')
      if (antigaEntrada === null) antigaEntrada = "";
      localStorage.setItem('entrada', antigaEntrada + entrada.join(''))
      localStorage.setItem('innceMomento', indice)
      pintaLetras();
      if (!acerto) {
        linha += 1;
      }
    }
    return null
  }

  if (entrada.length >= 5) {
    return;
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


const exibeLetra = (letra) => {
  let elId = `l${linha}c${entrada.length}`;
  const el = document.getElementById(elId);
  el.textContent = letra;

}

const retiraLetra = () => {
  let elId = `l${linha}c${entrada.length + 1}`;
  const el = document.getElementById(elId);
  el.textContent = "";
}

const validarPalavra = () => {
  if (entrada.length == 5) {
    for (var i of palavrasValidas) {
      if (i == entrada.join("").toLowerCase()) {
        return true
      }
    }
  } if (!acerto) setTimeout(function () {
    document.getElementById('toast').style.display = 'flex'
  })
  setTimeout(function () {
    document.getElementById('toast').style.display = 'none'
  }, 3000)
  return false
}


const pintaLetras = () => {

  for (var i = 1; i <= 5; i++) {
    let elId = `l${linha}c${i}`;
    const el = document.getElementById(elId);
    if (palavraDoDia[i - 1] == el.textContent) {
      teclaPinta = document.getElementById(el.textContent)
      teclaPinta.classList.add("fullcorrect")
      el.classList.add("fullcorrect")
    }
    else
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

    // modal
    var modal = document.getElementById("modelWin").style.display = 'flex'

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      document.getElementById("modelWin").style.display = 'none'
    }
    window.onclick = function (event) {

      if (event.target != modal) {

        document.getElementById("modelWin").style.display = 'none'
      }
    }

    startConfetti();
    acerto = true

    console.log(acerto)
  }
  //apagar itens da entrada
  let jaEscrito = entrada.slice(entrada.length);
}



function exibeLocalStorage() {
  indiceHoje = indice
  var salvo = localStorage.getItem('entrada')
  localStorage.removeItem('entrada')
  let counter = 0
  for (let letra of salvo) {
    trataTecla(letra)
    counter += 1
    if (counter % 5 == 0 && counter != 0) {
      trataTecla("ENTER")
    }
    console.log(letra)
  }

}
var indiceHoje = localStorage.getItem('innceMomento')

if (indiceHoje != indice) {
  localStorage.removeItem('entrada');
  localStorage.removeItem('innceMomento')
}

//ouve quando o cliente aperta uma tecla
document.body.addEventListener("keydown", ouvinteDeTeclas);
document.querySelectorAll(".tecla").forEach((el) => {
  el.addEventListener("click", function (el) {
    let letra = el.target.textContent
    if (letra == '⌫') {
      letra = "BACKSPACE"
    }
    trataTecla(letra)
  })
})

// if (localStorage.getItem('entrada') !== null) {
exibeLocalStorage()


// }



