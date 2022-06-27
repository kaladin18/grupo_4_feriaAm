import { useEffect, useState } from "react";

function ProductsList() {
    const [productsList, setProductList] = useState([]);
    useEffect(() => {
      async function fetchProductsList() {
        const response = await fetch("http://localhost:4001/api/products");
        const data = await response.json();
        setProductList(data.products);
      };
      fetchProductsList();
    }, []);
  



    return (
        <div className="tarjeta">
            <h1>Lista de productos</h1>
            
        {productsList.map(product =>{
            return (
                <div className="col-md-4" key={product.id} >
                <p>{product.name}</p>
                <img src={product.image} alt="" />
                </div>
            )
        })}
        
        </div>
    );
}



export default ProductsList;
