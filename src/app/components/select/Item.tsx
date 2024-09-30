const Item = ({ name, price }: { name: string; price: number }) => {
  return (
    <li>
      <div>{name}</div>
      <div>{price}</div>
    </li>
  );
};

export default Item;
