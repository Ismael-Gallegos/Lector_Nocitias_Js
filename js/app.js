/* ============================================
   Configuración de la API
============================================ */
const API_KEY = "TU_API_KEY_AQUI"; 
const API_URL = `https://newsapi.org/v2/top-headlines?country=mx&category=technology&apiKey=${API_KEY}`;

/* Elementos del DOM */
const contenedorNoticias = document.getElementById("contenedorNoticias");
const mensajes = document.getElementById("mensajes");
const btnRefrescar = document.getElementById("btnRefrescar");

/* ===========================================
Función principal para cargar las noticias
============================================*/
async function cargarNoticias() {
    mostrarMensaje("Cargando noticias...", "info");

    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("Error al conectar con la API");
        }

        const datos = await respuesta.json();

        if (!datos.articles || datos.articles.length === 0) {
            mostrarMensaje("No hay noticias disponibles en este momento.", "error");
            contenedorNoticias.innerHTML = "";
            return;
        }

        mostrarNoticias(datos.articles);
        mensajes.style.display = "none";

    } catch (error) {
        mostrarMensaje("No se pudieron cargar las noticias. Intente de nuevo más tarde.", "error");
        contenedorNoticias.innerHTML = "";
        console.error(error);
    }
}

/* ===================================
Mostar noticias en tarjetas
==================================== */
function mostrarNoticias(lista) {
    contenedorNoticias.innerHTML = "";

    lista.forEach(noticia => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `
            <h3 onclick="window.open('${noticia.url}', '_blank')">
                ${noticia.title || "Titulo no disponible"}
            </h3>

            <p>${noticia.description || "Descripción no disponible"}</p>

            <small>${noticia.publishedAt ? new Date(noticia.publishedAt).toLocaleString() : "Fecha no disponible"}</small>

            <br>

            <a href="${noticia.url}" target="_blank">Leer noticia completa</a>
        `;

        contenedorNoticias.appendChild(tarjeta);
    });
}


/* ===================================
Mostrar mensajes: errores, avisos
==================================== */
function mostrarMensaje(texto, tipo) {
    mensajes.style.display = "block";
    mensajes.textContent = texto;

    if (tipo === "error") {
        mensajes.style.borderLeftColor = "#ff5252";
    } else {
        mensajes.style.borderLeftColor = "#ff9800";
    }
}

/* ===========================
Botón para refrescar noticias
============================= */
btnRefrescar.addEventListener("click", () => {
    cargarNoticias();
});

/* =========================================
Cargar noticias al iniciar
========================================== */
cargarNoticias();