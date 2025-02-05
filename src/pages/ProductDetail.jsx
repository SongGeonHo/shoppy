import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSucces] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSucces("장바구니에 추가되었습니다.");
        setTimeout(() => setSucces(null), 3000);
      },
    });
  };
  return (
    <section>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4 ">
          <h2 className="text-3xl font-bold py-2 border-b border-gray-400">
            {title}
          </h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            ₩{price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              옵션:
            </label>
            <select
              id="select"
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-non"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map(
                  (
                    option,
                    index // 값이 동적으로 바뀌는 곳엔 index 사용할 수 없다는 점 명심하기 !!
                  ) => <option key={index}>{option}</option>
                )}
            </select>
          </div>
          {success && <p className="my-2">✅{success}</p>}
          <Button text="바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </section>
  );
}
