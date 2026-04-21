// ==================== FUNCIÓN PRINCIPAL CALCULAR CON VALIDACIONES ====================

function limpiarErrores() {
    document.getElementById('errorIngresos').innerHTML = '';
    document.getElementById('errorIngresos').classList.remove('visible');
    document.getElementById('errorMonto').innerHTML = '';
    document.getElementById('errorMonto').classList.remove('visible');
    document.getElementById('errorPlazo').innerHTML = '';
    document.getElementById('errorPlazo').classList.remove('visible');
    document.getElementById('errorTasa').innerHTML = '';
    document.getElementById('errorTasa').classList.remove('visible');
    document.getElementById('errorGeneral').innerHTML = '';
    document.getElementById('errorGeneral').classList.remove('visible');

    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        group.classList.remove('error', 'valid');
    });
}

function mostrarError(elementId, mensaje) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerHTML = mensaje;
    errorElement.classList.add('visible');

    const inputGroup = errorElement.closest('.input-group');
    if (inputGroup) {
        inputGroup.classList.add('error');
    }
}

function marcarValido(inputId) {
    const inputGroup = document.getElementById(inputId).closest('.input-group');
    if (inputGroup) {
        inputGroup.classList.remove('error');
        inputGroup.classList.add('valid');
    }
}

function validarCampos() {
    let esValido = true;

    let ingresos = document.getElementById('txtIngresos').value.trim();
    let arriendo = document.getElementById('txtArriendo').value.trim();
    let alimentacion = document.getElementById('txtAlimentacion').value.trim();
    let varios = document.getElementById('txtVarios').value.trim();
    let monto = document.getElementById('txtMonto').value.trim();
    let plazo = document.getElementById('txtPlazo').value.trim();
    let tasa = document.getElementById('txtTasaInteres').value.trim();

    // Ingresos
    if (ingresos === '' || isNaN(ingresos)) {
        mostrarError('errorIngresos', '⚠️ Ingrese ingresos válidos');
        esValido = false;
    } else {
        marcarValido('txtIngresos');
    }

    // Gastos (suma)
    let totalGastos =
        (parseFloat(arriendo) || 0) +
        (parseFloat(alimentacion) || 0) +
        (parseFloat(varios) || 0);

    if (totalGastos < 0) {
        mostrarError('errorGeneral', '⚠️ Gastos inválidos');
        esValido = false;
    }

    // Monto
    if (monto === '' || isNaN(monto)) {
        mostrarError('errorMonto', '⚠️ Monto inválido');
        esValido = false;
    } else {
        marcarValido('txtMonto');
    }

    // Plazo
    if (plazo === '' || isNaN(plazo)) {
        mostrarError('errorPlazo', '⚠️ Plazo inválido');
        esValido = false;
    } else {
        marcarValido('txtPlazo');
    }

    // Tasa
    if (tasa === '' || isNaN(tasa)) {
        mostrarError('errorTasa', '⚠️ Tasa inválida');
        esValido = false;
    } else {
        marcarValido('txtTasaInteres');
    }

    return esValido;
}

function calcular() {
    limpiarErrores();

    if (!validarCampos()) return;

    let ingresos = parseFloat(document.getElementById('txtIngresos').value);

    let arriendo = parseFloat(document.getElementById('txtArriendo').value) || 0;
    let alimentacion = parseFloat(document.getElementById('txtAlimentacion').value) || 0;
    let varios = parseFloat(document.getElementById('txtVarios').value) || 0;

    let egresos = arriendo + alimentacion + varios;

    // MOSTRAR TOTAL GASTOS
    document.getElementById('spnTotalGastos').innerText = '$' + egresos.toFixed(2);

    let monto = parseFloat(document.getElementById('txtMonto').value);
    let plazoAnios = parseFloat(document.getElementById('txtPlazo').value);
    let tasaInteres = parseFloat(document.getElementById('txtTasaInteres').value);

    let disponible = calcularDisponible(ingresos, egresos);
    let capacidadPago = calcularCapacidadPago(disponible);

    document.getElementById('spnDisponible').innerText = '$' + disponible.toFixed(2);
    document.getElementById('spnCapacidadPago').innerText = '$' + capacidadPago.toFixed(2);

    let interes = calcularInteresSimple(monto, tasaInteres, plazoAnios);
    let total = calcularTotalPagar(monto, interes);
    let cuota = calcularCuotaMensual(total, plazoAnios);

    document.getElementById('spnInteresPagar').innerText = '$' + interes.toFixed(2);
    document.getElementById('spnTotalPrestamo').innerText = '$' + total.toFixed(2);
    document.getElementById('spnCuotaMensual').innerText = '$' + cuota.toFixed(2);

    let aprobado = aprobarCredito(capacidadPago, cuota);
    let estado = document.getElementById('spnEstadoCredito');

    if (aprobado) {
        estado.innerHTML = 'CRÉDITO APROBADO ✅';
        estado.className = 'aprobado';
    } else {
        estado.innerHTML = 'CRÉDITO RECHAZADO ❌';
        estado.className = 'rechazado';
    }
}

function reiniciar() {
    document.getElementById('txtIngresos').value = '';
    document.getElementById('txtArriendo').value = '';
    document.getElementById('txtAlimentacion').value = '';
    document.getElementById('txtVarios').value = '';
    document.getElementById('txtMonto').value = '';
    document.getElementById('txtPlazo').value = '';
    document.getElementById('txtTasaInteres').value = '';

    document.getElementById('spnTotalGastos').innerText = '$0.00';
    document.getElementById('spnDisponible').innerText = '$0.00';
    document.getElementById('spnCapacidadPago').innerText = '$0.00';
    document.getElementById('spnInteresPagar').innerText = '$0.00';
    document.getElementById('spnTotalPrestamo').innerText = '$0.00';
    document.getElementById('spnCuotaMensual').innerText = '$0.00';
    document.getElementById('spnEstadoCredito').innerHTML = 'ANALIZANDO...';

    limpiarErrores();
}

// EVENTOS
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnCalcularCredito').addEventListener('click', calcular);
    document.getElementById('btnReiniciar').addEventListener('click', reiniciar);
});