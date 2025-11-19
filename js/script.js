let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

function obtenerTotal() {
    return movimientos.reduce((acc, mov) => acc + mov.cantidad, 0);
}

function actualizarTotal() {
    document.getElementById("total").textContent = "$" + obtenerTotal();
}

function mostrarMovimientos() {
    const lista = document.getElementById("lista-movimientos");
    lista.innerHTML = "";

    movimientos.forEach(m => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <div><strong>${m.tipo}</strong></div>
            </td>
            <td>
                <div>$${m.cantidad}</div>
            </td>
        `;

        lista.appendChild(fila);
    });
}


function guardarLS() {
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
}


document.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", () => {
        const valor = Number(btn.dataset.value);

        movimientos.push({
            tipo: "Ahorro",
            cantidad: valor
        });

        guardarLS();
        actualizarTotal();
        mostrarMovimientos();
    });
});

document.getElementById("btn-retirar").addEventListener("click", () => {
    const cantidad = Number(document.getElementById("retiro").value);
    const totalActual = obtenerTotal();

    if (cantidad <= 0) {
        alert("Ingresa una cantidad válida");
        return;
    }

    if (cantidad > totalActual) {
        alert("No puedes retirar más de lo que tienes ahorrado");
        return;
    }

    movimientos.push({
        tipo: "Retiro",
        cantidad: -cantidad
    });

    guardarLS();
    actualizarTotal();
    mostrarMovimientos();

    document.getElementById("retiro").value = "";
});

actualizarTotal();
mostrarMovimientos();
