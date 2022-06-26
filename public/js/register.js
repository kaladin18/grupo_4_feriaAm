
window.addEventListener("load", function () {
  let formularioRegistro = document.querySelector("#register-form");
  

  formularioRegistro.addEventListener("submit", function (event) {
    
    console.log("Esto también esta andando");
    let errores = [];
    let nombre = document.querySelector("#name");
    let apellido = document.querySelector("#lastName");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let rePassword = document.querySelector("#rePassword")
    let userImage = document.querySelector("#userImage");
    let acceptedExtensions = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    if (nombre.value == "") {
      errores.push("Debe ingresar un nombre");
    } else if (nombre.value.length < 2) {
      errores.push("El nombre debe contener al menos 2 caracteres");
    }
    if (apellido.value == "") {
      errores.push("Debe ingresar un apellido");
    } else if (apellido.value.length < 2) {
      errores.push("El apellido debe contener al menos 2 caracteres");
    }
    if (email.value == "") {
      errores.push("Debe ingresar un email");
    } else if (!email.value.includes("@")) {
      errores.push("Debe ingresar un email válido");
    }
    if (password.value == "") {
      errores.push("Debe ingresar una contraseña");
    } else if (password.value.length < 8) {
      errores.push("La contraseña debe contener al menos 8 caracteres");
    } else if (password.value != rePassword.value) {
        errores.push("Las contraseñas deben coincidir");
    }
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(userImage.value)) {
      errores.push("El archivo debe ser .jpg, .jpeg, .png o .gif");
    }
    if (errores.length > 0) {
        event.preventDefault();
        let ulErrores = document.querySelector(".errores ul");
        errores.forEach(error => {
            ulErrores.innerHTML += `<li>${error}</li>`
        });
    }
  });


});
