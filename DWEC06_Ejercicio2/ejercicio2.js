document.addEventListener("DOMContentLoaded", function() {
    //Título
    const contenedorTitulo = document.createElement("div");
    contenedorTitulo.classList.add("contenedor");
    
    const titulo = document.createElement("h2");
    titulo.textContent = "LOTERÍA PRIMITIVA";
    titulo.classList.add("titulo");
    contenedorTitulo.appendChild(titulo);
    document.body.appendChild(contenedorTitulo);

    //Contenedor de los botones
    const boleto = document.createElement("div");
    boleto.classList.add("contenedor");
    
    const botonesNumeros = document.createElement("div");
    botonesNumeros.id = "botonesNumeros";
    boleto.appendChild(botonesNumeros);

    //Botones del 1 al 49
    for(let i = 1; i <= 49; i++) {
        const botonNum = document.createElement("button");
        botonNum.textContent = i;
        botonNum.classList.add("botonNum");
        botonesNumeros.appendChild(botonNum);
    }
    document.body.appendChild(boleto);

    //Contenedor de resultados
    const contenedorResultados = document.createElement("div");
    contenedorResultados.classList.add("contenedor", "contenedorResultados");

    const botonSortear = document.createElement("button");
    botonSortear.id = "botonSortear";
    botonSortear.innerHTML = "Realizar sorteo";
    contenedorResultados.appendChild(botonSortear);

    const resultados = document.createElement("div");
    resultados.id = "resultados";

    //Números resultados del sorteo
    for (let i = 0; i < 6; i++) {
        const numResultado = document.createElement("div");
        numResultado.classList.add("numResultado");
        resultados.appendChild(numResultado);
    }

    contenedorResultados.appendChild(resultados);
    document.body.appendChild(contenedorResultados);

    //Contenedor del mensaje
    const contenedorMensaje = document.createElement("div");
    contenedorMensaje.classList.add("contenedor");

    const mensaje = document.createElement("p");
    mensaje.id = "mensaje";
    contenedorMensaje.appendChild(mensaje);
    document.body.appendChild(contenedorMensaje);

    //Selección de números
    //Array con los números que se han seleccionado
    let seleccionados = []; 

    //Clicks que se realizan en el boleto
    boleto.addEventListener("click", function (e) {
        //Si se hace click en un botón del boleto
        if(e.target.tagName === "BUTTON") {
            //Se guarda en num el número del botón que se ha pulsado
            const num = parseInt(e.target.textContent);
            //Si ese botón ya está seleccionado, se deselecciona
            if(seleccionados.includes(num)) {
                //Se quita del array de números seleccionados y se le quita la clase "seleccionado"
                seleccionados = seleccionados.filter(n => n !== num);
                e.target.classList.remove("seleccionado");
            }
            //Si no estaba seleccionado y aún no hay 6 números seleccionados, se añade al array y se le añade la clase "seleccionado"
            else {
                if(seleccionados.length < 6) {
                    seleccionados.push(num);
                    e.target.classList.add("seleccionado")
                }
            }
        }
    });

    //Lógica del sorteo
    botonSortear.addEventListener("click", function() {
        //Si no hay 6 números seleccionados, se muestra el aviso y no se realiza el sorteo
        if (seleccionados.length !== 6) {
            mensaje.textContent = "Debes seleccionar 6 números.";
            mensaje.style.color = "red";
            return;
        }
        //Array para guardar los números del sorteo
        const sorteo = [];
        //Mientras que la longitud del array sea menor que 6 
        while (sorteo.length < 6) {
            //Se guarda en la variable n un número aleatorio entre 1 y 49
            const n = Math.floor(Math.random() * 49) + 1;
            //Si el número no está ya en el array de resultados del sorteo, se incluye en el array
            if(!sorteo.includes(n)) {
                sorteo.push(n);
            }
        }

        //resultadosNumeros es un array con las casillas que tienen los números del resultado
        const resultadosNumeros = document.querySelectorAll(".numResultado");
        //Se recorre el arary 
        resultadosNumeros.forEach((res, i) => {
            //Se pone el número de cada resultado en cada casilla 
            res.textContent = sorteo[i];
            //Se quita la clase acierto si ya estaba anteriormente en algún resultado
            res.classList.remove("acierto");

            //Si entre los números del resultado está uno de los seleccionados, le he puesto la clase acierto
            //Esto es para ver mejor qué números se han acertado, he decidido ponerlos en negrita y color verde para poder comprobarlos mejor
            if(seleccionados.includes(sorteo[i])) {
                res.classList.add("acierto");
            }
        });

        //Se guarda en aciertos la longitud de los números seleccionados que coinciden con los números guardados en sorteo
        const aciertos = seleccionados.filter(n => sorteo.includes(n)).length;
        //Para que no quede mal, he puesto que si el número de aciertos es 1, se muestre acierto en singular y no en plural. Además, lo pongo en color negro
        if(aciertos==1) {
            mensaje.textContent = `Has tenido ${aciertos} acierto.`;
            mensaje.style.color = "black";
        }
        //En caso de que los aciertos sean 0, no se muestra "Has tenido 0 aciertos" sino "No has acertado ningún número". Lo pongo en color rojo
        else if (aciertos == 0) {
            mensaje.textContent = `No has acertado ningún número.`;
            mensaje.style.color = "red";
        }
        //Si se acierta más de un número pero no todos, se muestran los aciertos en color negro
        else if (aciertos > 1 && aciertos < 6) {
            mensaje.textContent = `Has tenido ${aciertos} aciertos.`;
            mensaje.style.color = "black";
        }
        //Si se aciertan todos los números del sorteo se muestra el mensaje en verde
        else {
            mensaje.textContent = `Has acertado todos los números. Enhorabuena!`;
            mensaje.style.color = "green";
        }
    });
});