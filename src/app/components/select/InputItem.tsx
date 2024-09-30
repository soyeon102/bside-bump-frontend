import { ChangeEvent } from "react";

const InputItem = ({
  name,
  price,
  onChangeName,
  onChangePrice,
}: {
  name: string;
  price: number;
  onChangeName: (name: string) => void;
  onChangePrice: (price: number) => void;
}) => {
  return (
    <li>
      <div>
        <input
          type="text"
          placeholder="품목을 입력해주세요"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeName(e.currentTarget.value)
          }
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="가격을 입력해주세요"
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangePrice(Number(e.currentTarget.value))
          }
        />
        원
      </div>
    </li>
  );
};

export default InputItem;
