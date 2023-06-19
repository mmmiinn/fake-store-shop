import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Button, Drawer, Spin } from "antd";
import Item from "../../components/Cart/Item";
import Cart from "../../components/Cart";
import styled from "styled-components";
import { ShoppingCartOutlined } from "@ant-design/icons";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async () => {
  const res = await axios.get("https://fakestoreapi.com/products");
  return res.data;
};

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [selCartegory, setSelCartegory] = useState([]);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getCartegory = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartegory();
  }, []);

  const clickCartegory = async (category: string) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const data = await response.json();
      setSelCartegory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    clickCartegory("");
  }, []);

  const getAllCartegory = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products?limit=30");
      const data = await res.json();
      setSelCartegory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // 물건 +1 버튼
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      return isItemInCart
        ? prev.map((item) =>
            item.id === clickedItem.id
              ? { ...item, amount: item.amount + 1 }
              : item
          )
        : [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  // 물건 -1 버튼
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (error) return <p>Error</p>;

  return isLoading ? (
    <Spin size="large" />
  ) : (
    <div>
      <CartBtn onClick={showDrawer}>
        <ShoppingCartOutlined /> Open
      </CartBtn>
      <Drawer title="Cart" placement="right" onClose={onClose} open={open}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <BtnCartegoryBox>
        {category.map((product) => (
          <BtnCartegory key={product} onClick={() => clickCartegory(product)}>
            {product}
          </BtnCartegory>
        ))}
        <BtnCartegory onClick={getAllCartegory}>all cartegory</BtnCartegory>
      </BtnCartegoryBox>

      <GridContainer>
        {selCartegory.length > 0
          ? selCartegory.map((item, index) => (
              <Grid key={index.toString()}>
                <Item item={item} handleAddtoCart={handleAddToCart} />
              </Grid>
            ))
          : data?.map((item) => (
              <Grid key={item.id}>
                <Item item={item} handleAddtoCart={handleAddToCart} />
              </Grid>
            ))}
      </GridContainer>
    </div>
  );
};

export default MainPage;

const CartBtn = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
  background-color: #0e154f;
  color: #fff;
`;

const BtnCartegoryBox = styled.div`
  padding-left: 100px;
`;
const BtnCartegory = styled.button`
  padding: 10px;
  background-color: #0e154f;
  color: #fff;
  & + & {
    margin-left: 1px;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Grid = styled.div`
  flex: 20%;
`;
