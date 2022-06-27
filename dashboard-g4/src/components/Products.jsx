import { useEffect, useState } from "react";

function Products() {
  const [count, setCount] = useState([]);
  const [secondaryCount, setSecondaryCount] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:4001/api/products");
      const data = await response.json();
      setCount(data.meta.count);
      setSecondaryCount(data.meta.countByCategory);
    }
    fetchProducts();
  }, []);

  return (
    <div className="tarjeta">
      <h1>El total de productos es: {count}</h1>
      <p>{secondaryCount.clothes} en categoria ropa</p>
      <p>{secondaryCount.shoes} en categoría calzado</p>
      <p>{secondaryCount.new} nuevos</p>
      <p>{secondaryCount.used} usados</p>
    </div>
  );
}
export default Products;
