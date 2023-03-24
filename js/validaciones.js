export function valida(input){
    const tipoDeInput = input.dataset.tipo //ste dataset lo que nosotros estamos obteniendo es la colección de todos los datas

    if(validadores[tipoDeInput]){ 
        //verificar si dentro de validadores existe el tipo de input.
        validadores[tipoDeInput](input)
    }
    if(input.validity.valid){
                             //si es valido quitar la clase y q no salga el mnsaje con inner '""
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput , input);
    }
}

const tipoDeErrores = 
[ "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
]

const mensajesDeError = {
    nombre : {
        valueMissing : "Este campo esta vacio"
    },
    email :{
        valueMissing : "Este campo esta vacio",
        typeMismatch : "El correo no es válido"
    },
    password : {
        valueMissing : "Este campo esta vacio",
        patternMismatch : "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento : {
        valueMissing : "Este campo esta vacio",
        customError : "Debes tener almenos 18 años de edad"
    },
    numero : {
        valueMissing : "Este campo no puede estar vacio",
        patternMismatch : "El formato requerido es de 10 números"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
      },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
      },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres.",
      },
};

const validadores = {
    nacimiento : input => validarNacimiento(input),
  
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(( error) => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];//mensaje va a ser igual a mensajesdDeError, entre corchetes, 
            //el tipoDeError para poder acceder a si es nombre, email, password, nacimiento, el tipo de input y ahora sí por último, nuestro error.
        }
    
    })
   
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value); // para acceder a la fecha
    let mensaje = "";
   if (!mayorEdad(fechaCliente)){
    mensaje = "Debes tener almenos 18 años de edad";
   }
   
   input.setCustomValidity(mensaje);//SetCustomValidity define el mensaje de validación personalizado 
   //para el elemento seleccionad
}

function mayorEdad(fecha){
    const fechaActual = new Date(); 
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    
    return diferenciaFechas <= fechaActual;

}
//blur” o cuando quite el input o el foco de ese espacio o de ese input.