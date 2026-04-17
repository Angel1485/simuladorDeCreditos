// ==================== FUNCIÓN PRINCIPAL CALCULAR ====================

function calcular() {
    // 1. Leer el valor de ingresos (float)
    let ingresos = parseFloat(document.getElementById('txtIngresos').value);
    // 2. Leer el valor de egresos (float)
    let egresos = parseFloat(document.getElementById('txtEgresos').value);
    
    // Validar que los campos no estén vacíos
    if (isNaN(ingresos)) ingresos = 0;
    if (isNaN(egresos)) egresos = 0;
    
    // 3. Llamar a la función calcularDisponible y guardar el retorno en una variable
    let disponible = calcularDisponible(ingresos, egresos);
    
    // 4. Mostrar en pantalla, en el componente spnDisponible
    document.getElementById('spnDisponible').innerText = '$' + disponible.toFixed(2);
    
    // 5. Llamar a la función calcularCapacidadPago y guardar el retorno
    // Se le pasa como parámetro el valor disponible
    let capacidadPago = calcularCapacidadPago(disponible);
    
    // 5.2 Mostrar en pantalla, en el componente spnCapacidadPago
    document.getElementById('spnCapacidadPago').innerText = '$' + capacidadPago.toFixed(2);
    
    // 7.1 Leer los valores de Monto solicitado, Plazo en años, Tasa anual simple
    let monto = parseFloat(document.getElementById('txtMonto').value);
    let plazoAnios = parseFloat(document.getElementById('txtPlazo').value);
    let tasaInteres = parseFloat(document.getElementById('txtTasaInteres').value);
    
    // Validar campos de crédito
    if (isNaN(monto)) monto = 0;
    if (isNaN(plazoAnios)) plazoAnios = 0;
    if (isNaN(tasaInteres)) tasaInteres = 0;
    
    // 7.2 Llamar a la función calcularInteresSimple y guardar el retorno
    let interesGenerado = calcularInteresSimple(monto, tasaInteres, plazoAnios);
    
    // 7.3 Mostrar en pantalla, en el componente spnInteresPagar
    document.getElementById('spnInteresPagar').innerText = '$' + interesGenerado.toFixed(2);
    
    // 9.1 Invocar a calcularTotalPagar
    let totalPagar = calcularTotalPagar(monto, interesGenerado);
    
    // 9.2 Mostrar en pantalla, en el componente spnTotalPrestamo
    document.getElementById('spnTotalPrestamo').innerText = '$' + totalPagar.toFixed(2);
    
    // 11.1 Invocar a calcularCuotaMensual
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    
    // 11.2 Mostrar en pantalla, en el componente spnCuotaMensual
    if (plazoAnios > 0 && totalPagar > 0) {
        document.getElementById('spnCuotaMensual').innerText = '$' + cuotaMensual.toFixed(2);
    } else {
        document.getElementById('spnCuotaMensual').innerText = '$0.00';
    }
    
    // 14.1 Invocar a aprobarCredito y guardar el resultado
    let creditoAprobado = aprobarCredito(capacidadPago, cuotaMensual);
    let estadoSpan = document.getElementById('spnEstadoCredito');
    
    // 14.2 Si fue aprobado mostrar "CREDITO APROBADO"
    // 14.3 Si fue rechazado mostrar "CREDITO RECHAZADO"
    if (creditoAprobado && plazoAnios > 0 && monto > 0) {
        estadoSpan.innerHTML = 'CRÉDITO APROBADO ✅';
        estadoSpan.className = 'aprobado';
    } else {
        estadoSpan.innerHTML = 'CRÉDITO RECHAZADO ❌';
        estadoSpan.className = 'rechazado';
    }
}

// ==================== FUNCIÓN REINICIAR ==================== //

function reiniciar() {
    // Limpiar campos de entrada
    document.getElementById('txtIngresos').value = '';
    document.getElementById('txtEgresos').value = '';
    document.getElementById('txtMonto').value = '';
    document.getElementById('txtPlazo').value = '';
    document.getElementById('txtTasaInteres').value = '';
    
    // Reiniciar resultados
    document.getElementById('spnDisponible').innerText = '$0.00';
    document.getElementById('spnCapacidadPago').innerText = '$0.00';
    document.getElementById('spnInteresPagar').innerText = '$0.00';
    document.getElementById('spnTotalPrestamo').innerText = '$0.00';
    document.getElementById('spnCuotaMensual').innerText = '$0.00';
    document.getElementById('spnEstadoCredito').innerHTML = 'ANALIZANDO...';
    document.getElementById('spnEstadoCredito').className = 'analizando';
}

// ==================== EVENTOS ==================== //

// // Esperar a que el DOM esté completamente cargado
// document.addEventListener('DOMContentLoaded', function() {
//     // Configurar evento del botónes cuando carga
// });

 const btnCalcular = document.getElementById('btnCalcularCredito');
    if (btnCalcular) {
        btnCalcular.addEventListener('click', calcular);
    }
    
    // Configurar evento del botón Reiniciar
    const btnReiniciar = document.getElementById('btnReiniciar');
    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', reiniciar);
    }