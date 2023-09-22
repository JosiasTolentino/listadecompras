import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import Products from "./Products";
import Stats from "./Stats";

const initialProducts = [
  {
    productName: "Arroz",
    categoria: "Alimentação",
    quantidade: 4,
    valor: "6.79",
    packed: false,
    id: 123,
  },
  {
    productName: "Feijao",
    categoria: "Alimentação",
    quantidade: 2,
    valor: "4.29",
    packed: false,
    id: 124,
  },
  {
    productName: "Sabonete",
    categoria: "Higiene",
    quantidade: 5,
    valor: "3.89",
    packed: false,
    id: 125,
  },
  {
    productName: "Detergente",
    categoria: "Limpeza",
    quantidade: 4,
    valor: "2.39",
    packed: false,
    id: 126,
  },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);

  function handleAddProduct(product) {
    setProducts((products) => [...products, product]);
  }

  const valorTotal = products
    .map((product) => Number(product.quantidade * product.valor))
    .reduce((a, b) => a + b);

  return (
    <div className="app">
      <Header />
      <Form onAddProduct={handleAddProduct} />
      <Products products={products} setProducts={setProducts} />
      <Stats valorTotal={valorTotal} products={products} />
    </div>
  );
}
