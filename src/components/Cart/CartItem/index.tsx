import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { CartItemType } from "../../../pages/MainPage";
import styled from "styled-components";

type Props = {
  item: CartItemType;
  addToCart: (clickItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <CartItemList>
      <div>
        <span><CloseOutlined onClick={() => removeFromCart(item.id)} /></span>
        <h3>{item.title}</h3>
        <img src={item.image} alt={item.title} />
        <div className="countBtn">
          <Button size="small" onClick={() => removeFromCart(item.id)}>
            -
          </Button>
          <p>{item.amount}</p>
          <Button size="small" onClick={() => addToCart(item)}>
            +
          </Button>
        </div>
      </div>

      <div className="priceBox">
        <span>Price: ${item.price}</span>
        <span>Total: ${(item.amount * item.price).toFixed(2)}</span>
      </div>
    </CartItemList>
  );
};

export default CartItem;

const CartItemList = styled.div`
  h3 {
    margin-bottom: 15px;
  }
  img {
    width: 100px;
    height: 100px;
  }
  .countBtn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    p{
      margin:0
    }
  }
  .priceBox {
    display: flex;
    justify-content: space-between;
  }
`;
