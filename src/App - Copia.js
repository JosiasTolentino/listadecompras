import { useState } from "react";

const categorias = ["Alimentação", "Higiene", "Limpeza"];

const initialProducts = [
  {
    productName: "Arroz",
    categoria: "Alimentação",
    quantidade: 4,
    valor: 3.5,
    packed: false,
    id: 123,
  },
  {
    productName: "Feijao",
    categoria: "Alimentação",
    quantidade: 2,
    valor: 4.2,
    packed: false,
    id: 124,
  },
  {
    productName: "Sabonete",
    categoria: "Higiene",
    quantidade: 5,
    valor: 2.5,
    packed: false,
    id: 125,
  },
  {
    productName: "Detergente",
    categoria: "Limpeza",
    quantidade: 4,
    valor: 1.8,
    packed: false,
    id: 126,
  },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);

  function handleAddProduct(product) {
    setProducts((products) => [...products, product]);
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

  const valorTotal = products
    .map((product) => product.quantidade * product.valor)
    .reduce((a, b) => a + b);

  const arrowUp = (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#2c5364"
        viewBox="0 0 256 256"
      >
        <path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path>
      </svg>
    </span>
  );

  const arrowDown = (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#2c5364"
        viewBox="0 0 256 256"
        className="svg"
      >
        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
      </svg>
    </span>
  );

  return (
    <div className="app">
      <Header />
      <Form onAddProduct={handleAddProduct} />
      <ProductsListAlimentacao
        products={products}
        onDeleteProduct={handleDeleteProduct}
        arrowUp={arrowUp}
        arrowDown={arrowDown}
        onPack={handlePackProduct}
      />
      <ProductsListHigiene
        products={products}
        onDeleteProduct={handleDeleteProduct}
        arrowUp={arrowUp}
        arrowDown={arrowDown}
        onPack={handlePackProduct}
      />
      <ProductsListLimpeza
        products={products}
        onDeleteProduct={handleDeleteProduct}
        arrowUp={arrowUp}
        arrowDown={arrowDown}
        onPack={handlePackProduct}
      />
      <Stats valorTotal={valorTotal} />
    </div>
  );
}

function Header() {}

function Form({ onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [categoria, setCategoria] = useState("Alimentação");
  const [quantidade, setQuantidade] = useState(1);
  const [valor, setValor] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!productName || !categoria || !quantidade || !valor) return;

    const newProduct = {
      productName,
      categoria,
      quantidade,
      valor,
      packed: false,
      id: Date.now(),
    };
    console.log(newProduct);

    onAddProduct(newProduct);

    setProductName("");
    setCategoria("Alimentação");
    setQuantidade(1);
    setValor("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Produto: </label>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      ></input>

      <label>Categoria: </label>
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        {categorias.map((categoria) => (
          <option value={categoria} key={categoria}>
            {categoria}
          </option>
        ))}
      </select>

      <label>Quantidade: </label>
      <select
        value={quantidade}
        onChange={(e) => setQuantidade(Number(e.target.value))}
      >
        {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <label>Valor:</label>
      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
      ></input>

      <button className="add-button">Adicionar produto</button>
    </form>
  );
}

function ProductsHeader({ isOpen }) {
  return (
    <div className={isOpen ? "list-header" : "hide"}>
      <span></span>
      <span>Produto</span>
      <span>Quantidade</span>
      <span>Valor Un.</span>
      <span>Total</span>
      <span></span>
    </div>
  );
}

function ProductsListAlimentacao({
  products,
  onDeleteProduct,
  onPack,
  arrowUp,
  arrowDown,
}) {
  const [isOpen, setIsOpen] = useState(true);
  function handleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="products">
      <h2>
        Alimentação
        <button onClick={handleOpen}>{isOpen ? arrowUp : arrowDown}</button>
      </h2>
      <ProductsHeader isOpen={isOpen} />
      <ul className={isOpen ? "product-list" : "hide"}>
        {products.map((product) =>
          product.categoria === "Alimentação" ? (
            <li className="product-list-item" key={product.id}>
              <input
                type="checkbox"
                value={product.packed}
                onChange={() => onPack(product.id)}
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
                R$ {product.valor}
              </span>
              <span
                style={product.packed ? { textDecoration: "line-through" } : {}}
              >
                R$ {product.quantidade * product.valor}
              </span>
              <button onClick={() => onDeleteProduct(product.id)}>❌</button>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
}

function ProductsListHigiene({
  products,
  onDeleteProduct,
  onPack,
  arrowUp,
  arrowDown,
}) {
  const [isOpen, setIsOpen] = useState(true);
  function handleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="products">
      <h2>
        Higiene
        <button onClick={handleOpen}>{isOpen ? arrowUp : arrowDown}</button>
      </h2>
      <ProductsHeader isOpen={isOpen} />
      <ul className={isOpen ? "product-list" : "hide"}>
        {products.map((product) =>
          product.categoria === "Higiene" ? (
            <li className="product-list-item" key={product.id}>
              <input
                type="checkbox"
                value={product.packed}
                onChange={() => onPack(product.id)}
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
                R$ {product.valor}
              </span>
              <span
                style={product.packed ? { textDecoration: "line-through" } : {}}
              >
                R$ {product.quantidade * product.valor}
              </span>
              <button onClick={() => onDeleteProduct(product.id)}>❌</button>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
}

function ProductsListLimpeza({
  products,
  onDeleteProduct,
  onPack,
  arrowUp,
  arrowDown,
}) {
  const [isOpen, setIsOpen] = useState(true);
  function handleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <div className="products">
      <h2>
        Limpeza{" "}
        <button onClick={handleOpen}>{isOpen ? arrowUp : arrowDown}</button>
      </h2>
      <ProductsHeader isOpen={isOpen} />
      <ul className={isOpen ? "product-list" : "hide"}>
        {products.map((product) =>
          product.categoria === "Limpeza" ? (
            <li className="product-list-item" key={product.id}>
              <input
                type="checkbox"
                value={product.packed}
                onChange={() => onPack(product.id)}
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
                R$ {product.valor}
              </span>
              <span
                style={product.packed ? { textDecoration: "line-through" } : {}}
              >
                R$ {product.quantidade * product.valor}
              </span>
              <button onClick={() => onDeleteProduct(product.id)}>❌</button>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
}

function Stats({ valorTotal }) {
  return (
    <div>
      <h3>
        Valor total das compras R$ <span>{Number(valorTotal)}</span>
      </h3>
    </div>
  );
}
