// ==================== FUNCIONES MATEMÁTICAS DEL SIMULADOR ==================== //

// Función 2: calcularDisponible
// Calcula el valor disponible (ingresos - egresos). Si es menor que cero, retorna 0.
function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    if (disponible < 0) {
        return 0;
    }
    return disponible;
}

// Función 4: calcularCapacidadPago
// Calcula la capacidad de pago (50% del valor disponible)
function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.5;
}

// Función 6: calcularInteresSimple
// Calcula el interés: plazoEnAños * monto * (tasa / 100)
function calcularInteresSimple(monto, tasa, plazoAnios) {
    return plazoAnios * monto * (tasa / 100);
}

// Función 8: calcularTotalPagar
// Calcula total a pagar: monto + interés + USD 100 (impuestos SOLCA)
function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

// Función 10: calcularCuotaMensual
// Calcula cuota mensual: total a pagar / (plazoEnAños * 12)
function calcularCuotaMensual(total, plazoAnios) {
    let numeroMeses = plazoAnios * 12;
    return total / numeroMeses;
}

// Función 13: aprobarCredito
// Retorna true si capacidadPago > cuotaMensual, false en caso contrario
function aprobarCredito(capacidadPago, cuotaMensual) {
    if (capacidadPago > cuotaMensual) {
        return true;
    } else {
        return false;
    }
}