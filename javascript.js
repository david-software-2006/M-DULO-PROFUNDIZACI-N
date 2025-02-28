let nombres = "David Herrera";
var edades = 19;
const cualquiercosa = 20;
let activo = true;
let variablenula = null;
let indefinido;
// cualquiercosa = "Serna";

console.log(nombres);
console.log(edades);
console.log(cualquiercosa);

console.log(typeof activo);
console.log(typeof variablenula);
console.log(typeof indefinido);

console.log(10 + 6);

console.log(20 == "20");
console.log(10 === "10");

let mensaje = edades >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(mensaje);

function saludar(nombres, edades) {
  return "Hola " + nombres + " tienes " + edades + " años";
}

console.log(saludar(nombres, edades));

const PI = 3.1416;
const sumar = (a, b) => a + b;

console.log(sumar(11, 2));

let frutas = ["Cereza", "Frambueza", "Pera"];

console.log(frutas);

frutas.push("Marañon");

console.log(frutas);

frutas.pop();

console.log(frutas);

console.log(frutas.length);

frutas.push("Melocotón");

let filtrar = frutas.filter((f) => f.startsWith("M"));
console.log(filtrar);

let persona = {
  nombre: "David",
  edad: 18,
  saludar: function () {
    console.log(`Hola ${this.nombre}, edad ${this.edad}`);
  },
};

persona.saludar();

persona.nombre = "David Herrera";

console.log(persona);

const { nombre, edad } = persona;

console.log(persona.nombre);
console.log(nombre);

function esperar() {
  return new Promise((resolver) => {
    setTimeout(() => {
      resolver("Hecho");
    }, 2000);
  });
}

async function ejecutar() {
  console.log("Esperando...");
  let resultado = await esperar();
  console.log(resultado);
}

ejecutar(); 

// let elemento = document.getElementById("boton");
// console.log(elemento);

// elemento.addEventListener("click", () => {
//   alert("¡Haz hecho clic en el botón!");
// });

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    console.log("Datos obtenidos de la API:", data);
  });

async function llamarapi() {
  try {
    let respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((response) => response.json());
    console.log("Datos obtenidos con async/await:", respuesta);
  } catch (error) {
    console.log("Error al obtener los datos: " + error);
  }
}

llamarapi(); 

class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hacerSonido() {
    console.log(`${this.nombre} hace sonido`);
  }
}

let perro = new Animal("Gallina");
perro.hacerSonido();

localStorage.setItem("usuario", "David");
console.log("Usuario almacenado:", localStorage.getItem("usuario"));


// BOTON EN JAVASCRIPT TAREA 🔘🔘
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const operacion = document.getElementById("operacion");
const resultado = document.getElementById("resultado");

function calcular() {
  const numero1 = parseFloat(num1.value);
  const numero2 = parseFloat(num2.value); 
  const tipoOperacion = operacion.value;

  if (isNaN(numero1) || (isNaN(numero2) && tipoOperacion !== "raiz" && tipoOperacion !== "absoluto")) {
    resultado.textContent = "Por favor ingresa números válidos.";
    return;
  }

  let resultadoOperacion;

  switch (tipoOperacion) {
    case "sumar":
      resultadoOperacion = numero1 + numero2;
      break;
    case "restar":
      resultadoOperacion = numero1 - numero2;
      break;
    case "multiplicar":
      resultadoOperacion = numero1 * numero2;
      break;
    case "dividir":
      if (numero2 === 0) {
        resultado.textContent = "Error: División entre 0 no permitida.";
        return;
      }
      resultadoOperacion = numero1 / numero2;
      break;
    case "modulo":
      resultadoOperacion = numero1 % numero2;
      break;
    case "raiz":
      resultadoOperacion = Math.sqrt(numero1);
      break;
    case "absoluto":
      resultadoOperacion = Math.abs(numero1);
      break;
    default:
      resultadoOperacion = "Operación no válida.";
  }

  resultado.textContent = resultadoOperacion;
}

document.getElementById("calcular").addEventListener("click", calcular);
