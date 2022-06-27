import Products from "./components/Products";
import Users from "./components/users";
import LastBuyerDetail from "./components/LastBuyerDetail";
import LastSellerDetail from "./components/LastSellerDetail";
import LastProductDetail from "./components/lastProductDetail";
import ProductsList from "./components/AllProducts";
function App() {
  return (
    <div className="bg-dark text-white">
      <h1>Dashboard Feria Americana G4</h1>
      <div className="parent">
        <Users />
        <LastBuyerDetail />
        <LastSellerDetail />
        <Products />
        <LastProductDetail />
        <ProductsList />
      </div>
    </div>
  );
}
export default App;
