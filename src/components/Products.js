import ProductsList from "./ProductsList";

export default function Products({ products, setProducts }) {
  return (
    <div>
      <ProductsList products={products} setProducts={setProducts}>
        Alimentação
      </ProductsList>
      <ProductsList products={products} setProducts={setProducts}>
        Higiene
      </ProductsList>
      <ProductsList products={products} setProducts={setProducts}>
        Limpeza
      </ProductsList>
      <ProductsList products={products} setProducts={setProducts}>
        Outros
      </ProductsList>
    </div>
  );
}
