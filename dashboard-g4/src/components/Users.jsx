import { useEffect, useState } from "react";

function Users() {
  const [sellerCount, setSellerCount] = useState([]);
  const [buyerCount, setBuyerCount] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const responseSellers = await fetch("http://localhost:4001/api/sellers");
      const responseBuyers = await fetch("http://localhost:4001/api/buyers");


      const dataSellers = await responseSellers.json();
      const dataBuyers = await responseBuyers.json();
      setSellerCount(dataSellers.meta.count);
      setBuyerCount(dataBuyers.meta.count)
    }
    fetchUsers();
  }, []);

  return (
    <div className="tarjeta">
      <h1>El total de usuarios es: {sellerCount + buyerCount}</h1>
      <p>{sellerCount} son compradores</p>
      <p>{buyerCount} son vendedores</p>
      
    </div>
  
  );
}
export default Users;
