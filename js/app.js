/**PROYECTO CONSTRUIDO CON TAILWIND, LIBRERÍA PARECIDA A BOOTSTRAP CON CLASES PRE-DEFINIDAS */
/*RECURSO PARA SPINNERS 'SPINKIT'*/
/******** VARIABLES ********/

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn')
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const expReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



/******** EVENT LISTENERS ********/

registrarEventListeners();

function registrarEventListeners() {
    //Cuando iniciar la app Enviar desactivado
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Validación campos del formulario
    email.addEventListener('blur', validarFormulario); //cuando click en un campo del formulario y luego me salgo sin completar
    asunto.addEventListener('blur', validarFormulario); //cuando click en un campo del formulario y luego me salgo sin completar
    mensaje.addEventListener('blur', validarFormulario); //cuando click en un campo del formulario y luego me salgo sin completar

    //Enviar el email
    formulario.addEventListener('submit', enviarEmail);

    //Reinicia formulario
    btnReset.addEventListener('click', resetearFormulario);
}


/******** FUNCTIONS ********/

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {

    if (e.target.value.length > 0) {
        //elimino los errores y sus clases
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    } else {
        // e.target.style.borderBottomColor = 'red'; //añadir directamente border con style
        // e.target.classList.add('error'); //definir en la hoja de estilos la clase error y añadirla aquí
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {
        if (expReg.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('El email no es válido');

        }
        // const resultado = e.target.value.indexOf('@'); //si no encuentra da -1, si @ exsite da posición
        // if (resultado < 0) {
        //     mostrarError('El email no es válido');
        // }
    }

    if (expReg.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));

    }
    //no podemos utilizar querySelector porque en caso de vacío devuelve un null, 
    // y entonces no podemos utilizar la propiedad length
    //además, podemos tener varios errores
    //querySelectorAll devuelve un objeto
    // const errores = document.querySelector('.error');
    // if (!errores) {
    //     formulario.appendChild(mensajeError);
    // }
}

function enviarEmail (e) {
    e.preventDefault();

    //colocar el spinner y texto "mensaje enviado correctamente"
    //spinner con display none

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    //después de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Mensaje enviado correctamente';
        parrafo.classList.add('text-center','my-10','p-5','bg-green','text-white','font-bold','uppercase');
        //inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo,spinner);
        //elimina el mesaje de enviado correctamente
        setTimeout( () => {
            parrafo.remove();
            resetearFormulario();
            iniciarApp();
        }, 5000 );

    }, 3000 );
    //set Interval --> cada 3 segundos se volverá a ejecutar
    // setInterval( () => {
            // (code)
    // }, 3000 );
    
}

function resetearFormulario () {
    formulario.reset(); //es una función común que ya viene en el standar de js
}
