import { valida } from "./validaciones.js";

const input = document.querySelectorAll("input"); // voy a ponerle todos mis elementos que sean de tipo input.

    
//blur” o cuando quite el input o el foco de ese espacio o de ese input.
input.forEach( input => {

    input.addEventListener("blur", (input)=>{
        valida(input.target);

    }
    );

});
