window.addEventListener("load", function () {
    let formulario = document.querySelector("form.product-create");
    console.log("esto funciona");
  
    formulario.addEventListener("submit", function (event) {
      console.log("esto también");
      
      let errores = [];
      let productName = document.querySelector("#productName");
      let productDescription = document.querySelector("#productDescription");
      let productImage = document.querySelector("#productImage");
      let acceptedExtensions = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
      ];
      if (productName.value == "") {
        errores.push("Debe ingresar un nombre para el producto");
      } else if (nombre.value.length < 5) {
        errores.push("El nombre del producto debe contener al menos 5 caracteres");
      }
      if (productDescription.value.length < 20) {
          errores.push("La descripción del producto debe tener al menos 20 caracteres");
      }
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(productImage.value)) {
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
  