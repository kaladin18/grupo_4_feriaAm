import { useEffect, useState } from "react";

function LastProductDetail() {
  const [lastProduct, setLastProduct] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:4001/api/products");
      const data = await response.json();
      let productos = data.products;
      let theLastProduct = data.products[0];
      productos.forEach((element) => {
          if (element.created_at > theLastProduct.created_at) {
            theLastProduct = element;
          }
        
      });
      const responseLastProduct = await fetch("http://localhost:4001/api/products/" + theLastProduct.id)
      const dataLastProduct = await responseLastProduct.json();

      setLastProduct(dataLastProduct.product);
      
    }
    fetchProducts();

  }, []);
  

  return <div className="tarjeta">
      <h2>Último producto creado</h2>
      <img src={lastProduct.image} alt="" />
      <p>{lastProduct.price}</p>
      <p>{lastProduct.name}</p>
      <p>Descripción: {lastProduct.description}</p>
  </div>;
}
export default LastProductDetail;
