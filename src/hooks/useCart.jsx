import { useAuthContext } from "../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["carts", uid || ""], // 고유 키 지정
    queryFn: () => getCart(uid), // 데이터 가져오는 함수
    enabled: !!uid, // uid가 유효할 때만 활성화
  });

  const addOrUpdateItem = useMutation({
    mutationKey: ["addOrUpdateItem"], // Mutation 고유 키 지정 (선택 사항)
    mutationFn: (product) => addOrUpdateToCart(uid, product), // 실행 함수
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]); // 관련 캐시 무효화
    },
  });

  const removeItem = useMutation({
    mutationKey: ["removeFromCart"], //Mutation 고유 키 지정 선택 사항이지만 여러개의 useMutation이 있으면 필수로 사용할 것
    mutationFn: (id) => removeFromCart(uid, id), // 실행 함수
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]); // 관련 캐시 무효화
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
