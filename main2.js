// array para correos 
const correosUtilizados = [];

// expresion de mail
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarEmail(email) {
    return emailRegex.test(email);
}

function mostrarSeccionCorreo() {
    document.getElementById('botonConfirmar2').style.display = 'none';

    // seccion para correo
    const seccionMail = document.createElement('div');
    seccionMail.id = 'seccionMail';

    const titulo = document.createElement('h2');
    titulo.textContent = 'Ingrese su correo electrónico de contacto:';
    seccionMail.appendChild(titulo);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'emailInput';
    emailInput.placeholder = 'Correo electrónico';
    seccionMail.appendChild(emailInput);

    const botonEnviar = document.createElement('button');
    botonEnviar.textContent = 'Confirmar Correo';
    seccionMail.appendChild(botonEnviar);

    const mensajeError = document.createElement('p');
    mensajeError.id = 'mensajeError';
    mensajeError.style.color = 'red';
    seccionMail.appendChild(mensajeError);

    document.body.appendChild(seccionMail);

    botonEnviar.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (!validarEmail(email)) {
            mensajeError.textContent = 'Por favor ingrese un correo electrónico válido.';
            return;
        }
        
        // comrpobar si el correo no fue utilizado
        if (correosGuardados.includes(email)) {
            mensajeError.textContent = 'Este correo electrónico ya ha sido utilizado.';
            return;
        }

        // si es valida, guardar el correo
        correosGuardados.push(email);
        localStorage.setItem('correosUtilizados', JSON.stringify(correosGuardados));
        correosUtilizados.push(email);
       

        if (correosUtilizados.length === 0) {
            mailsSeleccionados.textContent = 'No hay correos electrónicos seleccionados.';
        } else {
            const ultimoMail = correosUtilizados[correosUtilizados.length - 1];
            mailsSeleccionados.textContent = 'Correo: ' + ultimoMail + " al confirmar estos datos se le enviara un mail para proceder con el pago"
    
            // crear un boton para recargar la pagina
            const botonRefrescar = document.createElement("button");
            botonRefrescar.textContent = 'Aceptar Seleccion Final';
            botonRefrescar.addEventListener('click', function() {
                Toastify({
                    text: "En los proximos minutos se le enviara un mail para continuar con el pago",
                    duration: 4000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: false,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: false, // Prevents dismissing of toast on hover
                    style: {
                      background: "#red",
                    },
                    onClick: function(){}
                  }).showToast();
                  
                  setTimeout(function() {
                    location.reload(); // recargar despues de 4 segundos
                }, 4000);
            });
            mailsSeleccionados.appendChild(botonRefrescar);
        }
    });
}


// evento para mostrar la seccion de correo
document.getElementById('botonConfirmar2').addEventListener('click', mostrarSeccionCorreo);





