import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts as fetchProducts } from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  // tanstack V5 최신 강의에서는 useMutation과 useQuery에서 queryKey와 mutationKey의 명시적 지정이 권장된다. 이를 따르지 않으면 캐싱과 상태 관리 오류가 발생한다.
  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["products"],
        refetchType: "all",
      }),
  });

  return { productsQuery, addProduct };
}
