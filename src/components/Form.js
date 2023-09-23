import { useState } from "react";

export default function Form({ onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [categoria, setCategoria] = useState("Alimentação");
  const [quantidade, setQuantidade] = useState(1);
  const [valor, setValor] = useState("");
  const categorias = ["Alimentação", "Higiene", "Limpeza", "Outros"];

  const handleInputChange = (event) => {
    let valor = event.target.value.slice(0, 6).replace(/[^0-9.]/g, "");
    const decimalParts = valor.split(".");
    if (decimalParts.length > 1) {
      valor = `${decimalParts[0]}.${decimalParts[1].slice(0, 2)}`;
    }
    setValor(valor);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!productName || !categoria || !quantidade || !valor) return;
    if (valor === ".") return;

    const newProduct = {
      productName,
      categoria,
      quantidade,
      valor,
      packed: false,
      id: Date.now(),
    };

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
      {
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categorias.map((categoria) => (
            <option value={categoria} key={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      }

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
      <input type="text" value={valor} onChange={handleInputChange}></input>

      <button className="add-button" onSubmit={handleSubmit}>
        Adicionar produto
      </button>
    </form>
  );
}
