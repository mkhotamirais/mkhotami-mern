import { useEffect } from "react";
import { useGetProductsQuery } from "../../../app/api/productApiSlice";
import { Err, Loading, PostBtn } from "../../../components/Components";
import AdmProductCard from "./AdmProductCard";
import { H2 } from "../../../components/Tags";

const AdmProduct = () => {
  const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  useEffect(() => {
    console.log(products);
  }, [products]);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const renderedProducts = products && products.map((item) => <AdmProductCard key={item?._id} item={item} />);
    content = <div className="grid gap-1 md:gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">{renderedProducts}</div>;
  }

  return (
    <div>
      <div className="py-3 flex justify-between">
        <H2>Product List</H2>
        <PostBtn />
      </div>
      {content}
    </div>
  );
};

export default AdmProduct;
