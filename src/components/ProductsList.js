import { useState } from "react";
import ArrowUp from "./ArrowUp";
import ArrowDown from "./ArrowDown";

export default function ProductsList({ products, setProducts, children }) {
  const [isOpen, setIsOpen] = useState(true);

  const isEmpty = products.filter(
    (product) => product.categoria === `${children}`
  ).length;

  function handleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleDeleteProduct(id) {
    setProducts((products) => products.filter((product) => product.id !== id));
  }

  function handlePackProduct(id) {
    setProducts((products) =>
      products.map((product) =>
        product.id === id ? { ...product, packed: !product.packed } : product
      )
    );
  }

  return (
    <div className={isEmpty ? "products" : "hide"}>
      <h2>
        {children}
        <button onClick={handleOpen}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </button>
      </h2>
      <div className={isOpen ? "list-header" : "hide"}>
        <span></span>
        <span>Produto</span>
        <span>Quant.</span>
        <span>Valor Un.</span>
        <span>Total</span>
        <span></span>
      </div>
      <ul className={isOpen ? "product-list" : "hide"}>
        {products.map((product) =>
          product.categoria === `${children}` ? (
            <li className="product-list-item" key={product.id}>
              <input
                type="checkbox"
                value={product.packed}
                onChange={() => handlePackProduct(product.id)}
              />
              <span
                style={product.packed ? { textDecoration: "line-through" } : {}}
              >
                {product.productName}
              </span>
              <span
                style={product.packed ? { textDecoration: "line-through" } : {}}
              >
                {product.quantidade} un.
              </span>
              <span
                style={product.packed ? { textDecoration: "line-through" } : {}}
              >
                {(product.valor * 1).toFixed(2)}
              </span>
              <span
                style={product.packed ? { textDecoration: "line-through" } : {}}
              >
                R$ {(product.quantidade * product.valor).toFixed(2)}
              </span>
              <button onClick={() => handleDeleteProduct(product.id)}>
                ❌
              </button>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
}
