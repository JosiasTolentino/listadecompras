import ProductsList from "./ProductsList";

export default function ProductsCategory({ products, setProducts, children }) {
  return (
    <div>
      <ProductsList products={products} setProducts={setProducts}>
        {children}
      </ProductsList>
    </div>
  );
}
