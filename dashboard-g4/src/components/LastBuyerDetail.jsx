import { useEffect, useState } from "react";

function LastBuyerDetail() {
  const [lastBuyer, setLastBuyer] = useState([]);
  useEffect(() => {
    async function fetchBuyers() {
      const response = await fetch("http://localhost:4001/api/buyers");
      const data = await response.json();
      let compradores = data.buyers;
      console.log(compradores);
      let theLastBuyer = data.buyers[0];
      compradores.forEach((element) => {
          if (element.created_at > theLastBuyer.created_at) {
            theLastBuyer = element;
          }
        
      });
      const responseLastBuyer = await fetch("http://localhost:4001/api/buyers/" + theLastBuyer.id)
      const dataLastBuyer = await responseLastBuyer.json();

      setLastBuyer(dataLastBuyer.buyer);
      
    }
    fetchBuyers();

  }, []);
  

  return <div className="tarjeta">
      <h2>Último comprador registrado</h2>
      <img className="imagen" src={lastBuyer.image} alt="" />
      <p>{lastBuyer.name} {lastBuyer.last_name}</p>
      <p>{lastBuyer.email}</p>

  </div>;
}
export default LastBuyerDetail;
