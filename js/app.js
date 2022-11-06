const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

// let ciudad = document.querySelector("#ciudad").value;
// let pais = document.querySelector("#pais").value;


window.addEventListener("load", ()=>{
    formulario.addEventListener("submit", buscarClima)
});

function buscarClima(e) {
    e.preventDefault();
    
    //Validacion
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if(ciudad === "" || pais === "") {
        mostrarError("Todos los campos son obligatorios");
        return;
    }
    //Consulta la Api
    consultarAPI(ciudad, pais);

}

function mostrarError(mensaje) {
    const alerta = document.querySelector(".bg-red-200");
    

    if(!alerta){
        //crear una alerta
        const alerta = document.createElement("div");
        alerta.classList.add("bg-red-200", "border-red-400", "text-red-700", "px-4", "py-3","rounded","max-w-md", "mx-auto", "mt-6", "text-center");

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
            `;
        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 4000);
    }
    
};

function consultarAPI(ciudad, pais) {
    const apiId = "62631c6f674d918540d4863284f5deec";

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;

    spinner(); //muestra el spiner de carga
   

    fetch(URL).then(respuesta => respuesta.json()).then(datos => {
        limpiarHtml();
        console.log(datos)
        if(datos.cod=== "404"){
            mostrarError("Ciudad no encontrada")
            return;
        }

        //Imprime la respuesta en el HTML
        
        mostrarClima(datos);
        
    })
}

function mostrarClima(datos) {
    const {name, main:{temp, temp_max, temp_min, humidity}} = datos;
    
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);


    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent= `El clima en ${name} es`;
    nombreCiudad.classList.add("font-bold","text-3xl")

    const actual = document.createElement("p");
    actual.innerHTML= `${centigrados} &#8451;`;
    actual.classList.add("font-bold","text-5xl");

    const tempMax = document.createElement("p");
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add("text-xl");

    const tempMin = document.createElement("p");
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add("text-xl");

   


    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center","text-white" );
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
    

    resultado.appendChild(resultadoDiv);
    

}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

// function kelvinACentigrados(grados) {
//     return parseInt(grados-273.15);  //funcion equivalente
// }

function limpiarHtml() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
};

function spinner() {

    limpiarHtml();
    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-fading-circle");

    divSpinner.innerHTML= `
    <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}