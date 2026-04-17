// ==================== FUNCIÓN PRINCIPAL CALCULAR CON VALIDACIONES ====================

function limpiarErrores() {
    // Limpiar todos los mensajes de error
    document.getElementById('errorIngresos').innerHTML = '';
    document.getElementById('errorIngresos').classList.remove('visible');
    document.getElementById('errorEgresos').innerHTML = '';
    document.getElementById('errorEgresos').classList.remove('visible');
    document.getElementById('errorMonto').innerHTML = '';
    document.getElementById('errorMonto').classList.remove('visible');
    document.getElementById('errorPlazo').innerHTML = '';
    document.getElementById('errorPlazo').classList.remove('visible');
    document.getElementById('errorTasa').innerHTML = '';
    document.getElementById('errorTasa').classList.remove('visible');
    document.getElementById('errorGeneral').innerHTML = '';
    document.getElementById('errorGeneral').classList.remove('visible');
    
    // Limpiar clases de error/valid en inputs
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        group.classList.remove('error', 'valid');
    });
}

function mostrarError(elementId, mensaje) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerHTML = mensaje;
    errorElement.classList.add('visible');
    
    // Agregar clase error al grupo del input
    const inputGroup = errorElement.closest('.input-group');
    if (inputGroup) {
        inputGroup.classList.add('error');
    }
    
    // Animación de sacudida
    const input = errorElement.previousElementSibling;
    if (input) {
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 300);
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
    
    // Obtener valores
    let ingresos = document.getElementById('txtIngresos').value.trim();
    let egresos = document.getElementById('txtEgresos').value.trim();
    let monto = document.getElementById('txtMonto').value.trim();
    let plazo = document.getElementById('txtPlazo').value.trim();
    let tasa = document.getElementById('txtTasaInteres').value.trim();
    
    // Validar Ingresos
    if (ingresos === '') {
        mostrarError('errorIngresos', '⚠️ El campo Ingresos es obligatorio');
        esValido = false;
    } else {
        let ingresosNum = parseFloat(ingresos);
        if (isNaN(ingresosNum)) {
            mostrarError('errorIngresos', '⚠️ Ingrese un número válido');
            esValido = false;
        } else if (ingresosNum < 100) {
            mostrarError('errorIngresos', '⚠️ Los ingresos deben ser al menos $100');
            esValido = false;
        } else if (ingresosNum > 100000) {
            mostrarError('errorIngresos', '⚠️ Los ingresos no pueden superar $100,000');
            esValido = false;
        } else {
            marcarValido('txtIngresos');
        }
    }
    
    // Validar Egresos
    if (egresos === '') {
        mostrarError('errorEgresos', '⚠️ El campo Egresos es obligatorio');
        esValido = false;
    } else {
        let egresosNum = parseFloat(egresos);
        let ingresosNum = parseFloat(ingresos) || 0;
        
        if (isNaN(egresosNum)) {
            mostrarError('errorEgresos', '⚠️ Ingrese un número válido');
            esValido = false;
        } else if (egresosNum < 0) {
            mostrarError('errorEgresos', '⚠️ Los egresos no pueden ser negativos');
            esValido = false;
        } else if (egresosNum > 99999) {
            mostrarError('errorEgresos', '⚠️ Los egresos no pueden superar $99,999');
            esValido = false;
        } else if (ingresosNum !== 0 && egresosNum > ingresosNum) {
            mostrarError('errorEgresos', '⚠️ Los egresos no pueden ser mayores que los ingresos');
            esValido = false;
        } else {
            marcarValido('txtEgresos');
        }
    }
    
    // Validar Monto
    if (monto === '') {
        mostrarError('errorMonto', '⚠️ El campo Monto es obligatorio');
        esValido = false;
    } else {
        let montoNum = parseFloat(monto);
        if (isNaN(montoNum)) {
            mostrarError('errorMonto', '⚠️ Ingrese un número válido');
            esValido = false;
        } else if (montoNum < 100) {
            mostrarError('errorMonto', '⚠️ El monto mínimo es $100');
            esValido = false;
        } else if (montoNum > 50000) {
            mostrarError('errorMonto', '⚠️ El monto máximo es $50,000');
            esValido = false;
        } else {
            marcarValido('txtMonto');
        }
    }
    
    // Validar Plazo
    if (plazo === '') {
        mostrarError('errorPlazo', '⚠️ El campo Plazo es obligatorio');
        esValido = false;
    } else {
        let plazoNum = parseFloat(plazo);
        if (isNaN(plazoNum)) {
            mostrarError('errorPlazo', '⚠️ Ingrese un número válido');
            esValido = false;
        } else if (plazoNum < 1) {
            mostrarError('errorPlazo', '⚠️ El plazo mínimo es 1 año');
            esValido = false;
        } else if (plazoNum > 30) {
            mostrarError('errorPlazo', '⚠️ El plazo máximo es 30 años');
            esValido = false;
        } else {
            marcarValido('txtPlazo');
        }
    }
    
    // Validar Tasa
    if (tasa === '') {
        mostrarError('errorTasa', '⚠️ El campo Tasa de interés es obligatorio');
        esValido = false;
    } else {
        let tasaNum = parseFloat(tasa);
        if (isNaN(tasaNum)) {
            mostrarError('errorTasa', '⚠️ Ingrese un número válido');
            esValido = false;
        } else if (tasaNum < 1) {
            mostrarError('errorTasa', '⚠️ La tasa mínima es 1%');
            esValido = false;
        } else if (tasaNum > 30) {
            mostrarError('errorTasa', '⚠️ La tasa máxima es 30%');
            esValido = false;
        } else {
            marcarValido('txtTasaInteres');
        }
    }
    
    return esValido;
}

function calcular() {
    // Limpiar errores anteriores
    limpiarErrores();
    
    // Validar campos
    if (!validarCampos()) {
        return; // No continuar si hay errores
    }
    
    // Obtener valores (ya validados)
    let ingresos = parseFloat(document.getElementById('txtIngresos').value);
    let egresos = parseFloat(document.getElementById('txtEgresos').value);
    let monto = parseFloat(document.getElementById('txtMonto').value);
    let plazoAnios = parseFloat(document.getElementById('txtPlazo').value);
    let tasaInteres = parseFloat(document.getElementById('txtTasaInteres').value);
    
    // Calcular disponibilidad
    let disponible = calcularDisponible(ingresos, egresos);
    let capacidadPago = calcularCapacidadPago(disponible);
    
    // Mostrar resultados básicos
    document.getElementById('spnDisponible').innerText = '$' + disponible.toFixed(2);
    document.getElementById('spnCapacidadPago').innerText = '$' + capacidadPago.toFixed(2);
    
    // Calcular crédito
    let interesGenerado = calcularInteresSimple(monto, tasaInteres, plazoAnios);
    let totalPagar = calcularTotalPagar(monto, interesGenerado);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    
    // Mostrar resultados del crédito
    document.getElementById('spnInteresPagar').innerText = '$' + interesGenerado.toFixed(2);
    document.getElementById('spnTotalPrestamo').innerText = '$' + totalPagar.toFixed(2);
    document.getElementById('spnCuotaMensual').innerText = '$' + cuotaMensual.toFixed(2);
    
    // Validación adicional: cuota mensual vs capacidad de pago
    if (capacidadPago > 0 && cuotaMensual > capacidadPago) {
        mostrarError('errorGeneral', '⚠️ ADVERTENCIA: La cuota mensual excede su capacidad de pago. Considere reducir el monto o aumentar el plazo.');
    }
    
    // Aprobar o rechazar crédito
    let creditoAprobado = aprobarCredito(capacidadPago, cuotaMensual);
    let estadoSpan = document.getElementById('spnEstadoCredito');
    
    if (creditoAprobado && plazoAnios > 0 && monto > 0) {
        estadoSpan.innerHTML = 'CRÉDITO APROBADO ✅';
        estadoSpan.className = 'aprobado';
    } else {
        estadoSpan.innerHTML = 'CRÉDITO RECHAZADO ❌';
        estadoSpan.className = 'rechazado';
        if (capacidadPago <= cuotaMensual && capacidadPago > 0) {
            mostrarError('errorGeneral', '⚠️ Crédito rechazado: La cuota mensual excede su capacidad de pago');
        }
    }
}

// Limpiar error al escribir en un campo
function agregarEventosLimpiarErrores() {
    const inputs = ['txtIngresos', 'txtEgresos', 'txtMonto', 'txtPlazo', 'txtTasaInteres'];
    
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                const errorId = 'error' + id.charAt(0).toUpperCase() + id.slice(1);
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.innerHTML = '';
                    errorElement.classList.remove('visible');
                }
                const inputGroup = this.closest('.input-group');
                if (inputGroup) {
                    inputGroup.classList.remove('error');
                }
            });
        }
    });
}

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
    
    // Limpiar errores y validaciones
    limpiarErrores();
}

// ==================== EVENTOS ====================

document.addEventListener('DOMContentLoaded', function() {
    const btnCalcular = document.getElementById('btnCalcularCredito');
    if (btnCalcular) {
        btnCalcular.addEventListener('click', calcular);
    }
    
    const btnReiniciar = document.getElementById('btnReiniciar');
    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', reiniciar);
    }
    
    agregarEventosLimpiarErrores();
});