import ProductsCategory from "./ProductsCategory";

export default function Products({ products, setProducts }) {
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
