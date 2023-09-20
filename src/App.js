import { useState } from "react";

const categorias = ["Alimentação", "Higiene", "Limpeza", "Outros"];

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
      <Stats valorTotal={valorTotal} />
    </div>
  );
}

function Header() {
  return <h1>A MELHOR LISTA DE COMPRAS QUE VC JA VIU 👀</h1>;
}

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
        placeholder="Nome do produto..."
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
        placeholder="0,00"
        type="number"
        step={0.01}
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
      ></input>

      <button className="add-button">Adicionar produto</button>
    </form>
  );
}

function Products({ products, setProducts }) {
  return (
    <div>
      <ProductsCategory products={products} setProducts={setProducts}>
        Alimentação
      </ProductsCategory>
      <ProductsCategory products={products} setProducts={setProducts}>
        Higiene
      </ProductsCategory>
      <ProductsCategory products={products} setProducts={setProducts}>
        Limpeza
      </ProductsCategory>
      <ProductsCategory products={products} setProducts={setProducts}>
        Outros
      </ProductsCategory>
    </div>
  );
}

function ProductsCategory({ products, setProducts, children }) {
  return (
    <div>
      <ProductsList products={products} setProducts={setProducts}>
        {children}
      </ProductsList>
    </div>
  );
}

function ProductsList({ products, setProducts, children }) {
  const [isOpen, setIsOpen] = useState(true);
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
    <div className="products">
      <h2>
        {children}
        <button onClick={handleOpen}>{isOpen ? arrowUp : arrowDown}</button>
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
                R$ {product.valor}
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

function Stats({ valorTotal }) {
  return (
    <div>
      <h3 className="stats">
        Valor total das compras R$ <span>{Number(valorTotal).toFixed(2)}</span>
      </h3>
    </div>
  );
}
