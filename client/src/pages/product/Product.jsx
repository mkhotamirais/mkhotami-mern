import { useEffect } from "react";
import { useGetProductsQuery } from "../../app/api/productApiSlice";
import { Err, Loading } from "../../components/Components";
import { H2 } from "../../components/Tags";
import ProductCard from "./ProductCard";
import Carousel from "../../components/Carousel";

const Product = () => {
  const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  useEffect(() => {
    console.log(products);
  }, [products]);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const renderedProducts = products && products.map((item) => <ProductCard key={item?._id} item={item} />);
    content = <div className="grid gap-1 md:gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">{renderedProducts}</div>;
  }

  return (
    <div>
      <Carousel />
      <div className="py-3 flex justify-between">
        <H2>Product List</H2>
        <div>sort</div>
      </div>
      {content}
    </div>
  );
};

export default Product;
