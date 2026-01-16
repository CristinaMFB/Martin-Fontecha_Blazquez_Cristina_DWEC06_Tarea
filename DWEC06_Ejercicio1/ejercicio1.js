document.addEventListener("DOMContentLoaded", function() {
    //Contenedor principal
    let contenedor = document.createElement("div");
    contenedor.id = "contenedorPrincipal"
    document.body.appendChild(contenedor);


    //Campo donde se visualizan los carácteres ocultos
    let pantalla = document.createElement("input");
    pantalla.type = "password";
    pantalla.disabled = true;
    pantalla.id = "pantalla";
    contenedor.appendChild(pantalla);

    //Contenedor de botones
    let contenedorBotones = document.createElement("div");
    contenedorBotones.id = "contenedorBotones";
    contenedor.appendChild(contenedorBotones);

    //Números de los botones aleatorios
    let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    numeros.sort(() => 
        Math.random()  - 0.5);

    //Añadir los botones con los números
    numeros.forEach(num => {
        let boton = document.createElement("button");
        boton.textContent = num;
        //Al pulsar el botón con el número, si no hay ya 4 dígitos en la pantalla, añadir ese número
        boton.addEventListener("click", function() {
            if(pantalla.value.length < 4) {
                pantalla.value += num;
            }
        });

        contenedorBotones.appendChild(boton);
    });

    //Botón C
    let botonC = document.createElement("button");
    botonC.textContent = "C";
    botonC.classList.add("botonC");

    //Al pulsar el botón, se borra el último dígito que se ha introducido (el último que hay en la pantalla)
    botonC.addEventListener("click", function() {
        pantalla.value = pantalla.value.slice(0, -1);
    });

    contenedorBotones.appendChild(botonC);
    
    //Botón validar
    let botonValidar = document.createElement("button");
    botonValidar.textContent = "VALIDAR";
    botonValidar.classList.add("validar");
    
    //Al pulsar el botón, se llama a la función validarClave
    botonValidar.addEventListener("click", function() {
        validarClave(pantalla.value);
    });

    contenedorBotones.appendChild(botonValidar);

    //Mensajes
    let mensaje = document.createElement("div");
    mensaje.id = "mensaje";
    document.body.appendChild(mensaje);

    //FUNCIÓN PARA VALIDAR LA CONTRASEÑA
    function validarClave(clave) {
        //Hay que tener 4 números, si no hay 4 números, se muestra el mensaje.
        if(clave.length !== 4) {
            mensaje.textContent = "La contraseña debe tener 4 dígitos.";
            mensaje.style.color = "red";
            return;
        }

        //Expresión regular con la clave
        let expReg = /^9999$/;

        //Si la clave coincide con la expresión regular, la clave es correcta.
        if(expReg.test(clave)) {
            mensaje.textContent = "Clave correcta.";
            mensaje.style.color = "green";
        }
        //Si no, la clave es incorrecta.
        else {
            mensaje.textContent = "Clave incorrecta.";
            mensaje.style.color = "red";
        }
    }

});