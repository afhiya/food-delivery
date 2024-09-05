"use client";

import { useEffect, useState } from "react";
import ListProduct from "./ListProduct";
import Loading from "../ui/loading";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
};

const ProductView = ({
  limit = "",
  keyword = "",
  category = "",
}: {
  limit?: string,
  keyword?: string,
  category?: string
}) => {
  const [product, setProduct] = useState<{ data: Product[] }>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/product?limit=${limit}&keyword=${keyword}&category=${category}`
      );
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [category, keyword]);

  return <>{loading ? <Loading /> : <ListProduct api={product} />}</>;
};

export default ProductView;
