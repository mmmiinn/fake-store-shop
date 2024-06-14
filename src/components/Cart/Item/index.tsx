import { Button } from "antd";
import { CartItemType } from "../../../pages/MainPage";
import styled from "styled-components";

type Props = {
  item: CartItemType;
  handleAddtoCart: (item: CartItemType) => void;
};

const Item = ({ handleAddtoCart, item }: Props) => {
  return (
    <ItemBox>
      <div className="imgArea">
        <img src={item.image} alt="" />
      </div>
      <div>
        <h3>{item.title}</h3>
        <p className="description">{item.description}</p>
        <h3>$ {item.price}</h3>
      </div>
      <Button onClick={() => handleAddtoCart(item)}>Add to Cart</Button>
    </ItemBox>
  );
};

export default Item;

const ItemBox = styled.div`
  .imgArea{ text-align:center}
  img {
    max-width: 200px;
    height: 200px;
  }
  div {
    padding: 20px 0;
  }
  .description {
    height: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: break-spaces;
  }
`;
