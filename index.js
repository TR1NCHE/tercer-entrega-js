document.getElementById("formCotizacion").addEventListener("submit", function (event) {
    event.preventDefault();
    cotizarSeguro();
});

function cotizarSeguro() {
    const añoActual = new Date().getFullYear();

    // Datos de marcas y precios base
    const marcas = [
        { nombre: 'fiat', precioBase: 500 },
        { nombre: 'ford', precioBase: 600 },
        { nombre: 'bmw', precioBase: 700 },
        { nombre: 'honda', precioBase: 800 }
    ];

    const versiones = [
        { nombre: 'basica', factor: 0.9 },
        { nombre: 'media', factor: 1.0 },
        { nombre: 'premium', factor: 1.3 }
    ];

    // Obtener datos del formulario
    const marcaSeleccionada = document.getElementById("marca").value.toLowerCase();
    const año = parseInt(document.getElementById("año").value);
    const versionSeleccionada = document.getElementById("version").value.toLowerCase();

    // Obtener precio base de la marca seleccionada
    const precioBase = marcas.find(m => m.nombre === marcaSeleccionada).precioBase;

    // Calcular el factor según el año
    const factorAño = año >= 2024 ? 1.2 : año >= 2010 ? 1.0 : 0.8;

    // Obtener el factor de la versión seleccionada
    const factorVersion = versiones.find(v => v.nombre === versionSeleccionada).factor;

    // Calcular el presupuesto final
    const presupuestoFinal = precioBase * factorAño * factorVersion;

    // Mostrar el presupuesto en el DOM
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.textContent = `El presupuesto para tu seguro es: $${presupuestoFinal.toFixed(2)}`;

    // Guardar en localStorage
    const cotizacion = {
        marca: marcaSeleccionada,
        año: año,
        version: versionSeleccionada,
        presupuesto: presupuestoFinal.toFixed(2)
    };
    localStorage.setItem("cotizacion", JSON.stringify(cotizacion));
}

// Cargar cotización guardada (si existe)
window.addEventListener("load", function () {
    const cotizacionGuardada = JSON.parse(localStorage.getItem("cotizacion"));
    if (cotizacionGuardada) {
        document.getElementById("resultado").textContent = `Última cotización: $${cotizacionGuardada.presupuesto}`;
    }
});
