export default function Stats({ valorTotal, products }) {
  const productsPacked = products.filter((product) => product.packed).length;
  const productsMissing = products.length - productsPacked;

  return (
    <div className="stats">
      <h3>
        Valor total das compras R$ <span>{Number(valorTotal).toFixed(2)}</span>
      </h3>
      <p>
        Você possui {products.length} itens na sua lista
        {productsMissing > 1
          ? `, ainda faltam ${productsMissing} itens para finalizar suas compras. 🛒`
          : productsMissing === 1
          ? ", falta apenas mais 1 item para finalizar suas compras... 👀"
          : " e todos eles já estão no carrinho, pode ir ao caixa! 🎉"}
      </p>
    </div>
  );
}
