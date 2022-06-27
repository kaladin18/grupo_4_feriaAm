import { useEffect, useState } from "react";

function LastSellerDetail() {
  const [lastSeller, setLastSeller] = useState([]);
  useEffect(() => {
    async function fetchSellers() {
      const response = await fetch("http://localhost:4001/api/sellers");
      const data = await response.json();
      let vendedores = data.sellers;
      let theLastSeller = data.sellers[0];
      vendedores.forEach((element) => {
          if (element.created_at > theLastSeller.created_at) {
            theLastSeller = element;
          }
        
      });
      const responseLastSeller = await fetch("http://localhost:4001/api/sellers/" + theLastSeller.id)
      const dataLastSeller = await responseLastSeller.json();

      setLastSeller(dataLastSeller.seller);
      
    }
    fetchSellers();

  }, []);
  

  return <div className="tarjeta">
      <h2>Último vendedor registrado</h2>
      <img src={lastSeller.image} alt="" />
      <p>{lastSeller.name} {lastSeller.last_name}</p>
      <p>{lastSeller.email}</p>

  </div>;
}
export default LastSellerDetail;
