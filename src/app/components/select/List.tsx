import { Fragment } from "react";
import InputItem from "./InputItem";
import Item from "./Item";

type ComparisonItem = {
  id: string;
  name: string;
  price: number;
  isEditable: boolean;
};

type ItemList = {
  itemList: ComparisonItem[];
};

const List = ({ itemList }: ItemList) => {
  return (
    <ul>
      {itemList.map((item) => (
        <Fragment key={item.id}>
          {item.isEditable ? (
            <InputItem
              name={item.name}
              price={item.price}
              onChangeName={() => console.log("????")}
              onChangePrice={() => console.log("!!!!!")}
            />
          ) : (
            <Item name={item.name} price={item.price} />
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export default List;
