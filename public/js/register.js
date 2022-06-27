window.addEventListener("load", function () {
  let formularioRegistro = document.querySelector("#register-form");

  let nombre = document.querySelector("#name");
  let apellido = document.querySelector("#lastName");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let rePassword = document.querySelector("#rePassword");
  let userImage = document.querySelector("#userImage");

  //error contraseña
  let passwordDiv = document.querySelector(".contraseña");
  let errorPassword = document.createElement("p");
  errorPassword.style.display = "none";
  errorPassword.style.color = "red";
  const contenidoPassword = document.createTextNode(
    "Su contraseña debe contener al menos 8 caracteres"
  );
  errorPassword.appendChild(contenidoPassword);
  passwordDiv.appendChild(errorPassword);
  //error confirmacion contraseña
  let rePasswordDiv = document.querySelector(".repetir-contraseña");
  let errorRePassword = document.createElement("p");
  errorRePassword.style.display = "none";
  errorRePassword.style.color = "red";
  const contenidoRePassword = document.createTextNode(
    "Las contraseñas deben coincidir"
  );
  errorRePassword.appendChild(contenidoRePassword);
  rePasswordDiv.appendChild(errorRePassword);
  //Error nombre y apellido
  let nameDiv = document.querySelector(".nombre");
  let errorName = document.createElement("p");
  errorName.style.display = "none";
  errorName.style.color = "red";
  const contenidoName = document.createTextNode("Debe ingresar un nombre");
  errorName.appendChild(contenidoName);
  nameDiv.appendChild(errorName);
  let lastNameDiv = document.querySelector(".last-name");
  let errorLastName = document.createElement("p");
  errorLastName.style.display = "none";
  errorLastName.style.color = "red";
  const contenidoLastName = document.createTextNode(
    "Debe ingresar un apellido"
  );
  errorLastName.appendChild(contenidoLastName);
  lastNameDiv.appendChild(errorLastName);

  //Error email
  let emailDiv = document.querySelector(".email");
  let errorEmail = document.createElement("p");
  errorEmail.style.display = "none";
  errorEmail.style.color = "red";
  const contenidoEmail = document.createTextNode("Debe ingresar un email válido");
  errorEmail.appendChild(contenidoEmail);
  emailDiv.appendChild(errorEmail);

  formularioRegistro.addEventListener("submit", function (event) {
    console.log("Esto también esta andando");
    let errores = [];
    let nombre = document.querySelector("#name");
    let apellido = document.querySelector("#lastName");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let rePassword = document.querySelector("#rePassword");
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
      ulErrores.innerHTML = "";
      ulErrores.style.color = "red";
      ulErrores.style.fontSize = "15px"
      errores.forEach((error) => {
        ulErrores.innerHTML += `<li>${error}</li>`;
      });
      
    }
  });
  password.addEventListener("keyup", function (event) {
    if (password.value.length < 8) {
      errorPassword.style.display = "block";
    } else {
      errorPassword.style.display = "none";
    }
  });
  rePassword.addEventListener("keyup", function (event) {
    if (password.value != rePassword.value) {
      errorRePassword.style.display = "block";
    } else {
      errorRePassword.style.display = "none";
    }
  });

  nombre.addEventListener("blur", function (event) {
    if (nombre.value == "") {
      errorName.style.display = "block";
    } else {
      errorName.style.display = "none";
    }
  });
  apellido.addEventListener("blur", function (event) {
    if (apellido.value == "") {
      errorLastName.style.display = "block";
    } else {
      errorLastName.style.display = "none";
    }
  });
  email.addEventListener("keyup", function (event) {
    if (!email.value.includes("@")) {
      errorEmail.style.display = "block";
    } else {
      errorEmail.style.display = "none";
    }
  });
});
