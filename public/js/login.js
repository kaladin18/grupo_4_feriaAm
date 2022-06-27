window.addEventListener("load", function () {
  let formularioRegistro = document.querySelector("#login-form");
  
  
  
  //ERROR email
  let emailDiv = document.querySelector(".email");
  let errorEmail = document.createElement("p");
  errorEmail.style.display = "none";
  errorEmail.style.color = "red";
  const contenidoEmail = document.createTextNode("Debe ingresar su email");
  errorEmail.appendChild(contenidoEmail);
  emailDiv.appendChild(errorEmail);

  //ERROR password
  let passwordDiv = document.querySelector(".contraseña");
  let errorPassword = document.createElement("p");
  errorPassword.style.display = "none";
  errorPassword.style.color = "red";
  const contenidoPassword = document.createTextNode("Debe ingresar su contraseña");
  errorPassword.appendChild(contenidoPassword);
  passwordDiv.appendChild(errorPassword);

  formularioRegistro.addEventListener("submit", function (event) {
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let comprador = document.querySelector("#buyer").checked;
    let vendedor = document.querySelector("#seller").checked;
    console.log("Esto también esta andando");
    let errores = [];

    if (email.value == "") {
      errores.push("Debe ingresar un email");
    }
    if (password.value == "") {
      errores.push("Debe ingresar una contraseña");
    }
    if (!comprador && !vendedor) {
      errores.push("Debe elegir su tipo de cuenta");
    }
    if (errores.length > 0) {
      event.preventDefault();
      let ulErrores = document.querySelector(".errores ul");
      errores.forEach((error) => {
        ulErrores.innerHTML += `<li>${error}</li>`;
      });
    }
  });

  email.addEventListener("blur", function (event) {
      console.log(errorEmail);
    if (email.value == "") {
      errorEmail.style.display = "block";
    }
    if (email.value != "") {
        errorEmail.style.display = "none";
    }
  });

  password.addEventListener("blur", function (event) {
    
    if (password.value == "") {
        errorPassword.style.display = "block";
    }
    if (password.value != "") {
        errorPassword.style.display = "none";
      }
    
  });
});
