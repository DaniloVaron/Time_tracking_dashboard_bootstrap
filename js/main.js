let tiempo = "weekly";
const container = document.querySelector(".container");

let tarjetas;

const card_autor_tiempo = document.querySelectorAll(".card-button");

card_autor_tiempo.forEach((elemento) => {
  elemento.addEventListener("click", card_autorClick);
});

// JSON
let datos = {};

fetch("./js/data.json")
  .then((resp) => resp.json())
  .then((jsonData) => {
    // Creacion de las tarjetas
    jsonData.forEach((accion) => {
      container.insertAdjacentHTML(
        "beforeend",
        creacionTarjeta(accion, tiempo)
      );
    });

    // Actualizacion de las tarjetas
    jsonData.forEach((accion) => {
      datos[accion.title] = accion.timeframes;
    });

    tarjetas = document.querySelectorAll(".card");
  });

// Funciones
function card_autorClick(accion) {
  card_autor_tiempo.forEach((elemento) => {
    elemento.classList.remove("card-active");
  });

  accion.target.classList.add("card-active");
  tiempo = accion.target.innerText.toLowerCase();

  actualizarTarjetas(tiempo);
}

// Función para la actualización de la tarjeta 1
function actualizarTarjetas(tiempo) {
  tarjetas.forEach((actual) => {
    actualizarTarjeta(actual, tiempo);
  });
}

// Función para la actualización de la tarjeta 2
function actualizarTarjeta(actual, tiempo) {
  const title = actual.querySelector(".title").innerText;
  const current = datos[title][tiempo]["current"];
  const previous = datos[title][tiempo]["previous"];

  const variantes = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  const horas = actual.querySelector(".hora");
  horas.innerText = `${current}hrs`;
  const mensaje = actual.querySelector(".mensaje");
  mensaje.innerText = `${variantes[tiempo]} - ${previous}hrs`;
}

// Función para la creacion de la tarjeta
function creacionTarjeta(accion, tiempo) {
  let titulo = accion["title"];
  let tiempo_actual = accion["timeframes"][tiempo]["current"];
  let tiempo_previo = accion["timeframes"][tiempo]["previous"];

  const variantes = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  return ` 
<article class="card ${titulo.toLowerCase().replace(/\s/g, "")}">
    <div class="card-body p-0 px-4 position-relative">

    <div class="d-flex align-items-center justify-content-between m-0 mt-3 my-sm-3 card-title">
        <h3 class="fs-6 title">${titulo}</h3>
        <div><img src="./images/icon-ellipsis.svg" alt="icono elipsis"></div>
    </div>

    <div class="d-flex flex-sm-column align-items-center align-items-sm-start justify-content-between mb-4 m-sm-0 card-info">
        <h3 class="m-0 fs-2 hora">${tiempo_actual}hrs</h3>
        <p class="m-0 mt-sm-2 mb-sm-4 mensaje">${
          variantes[tiempo]
        } - ${tiempo_previo}</p>
    </div>

    </div>
</article>`;
}
