import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Drawer, Spin } from "antd";
import Item from "../../components/Cart/Item";
import Cart from "../../components/Cart";
import styled from "styled-components";

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
  const [scrollY, setScrollY] = useState<number>(0);
  const [btnTop, setBtnTop] = useState(false);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const handleScroll = ()=>{
    setScrollY(window.scrollY)
    scrollY > 200 ? setBtnTop(true) : setBtnTop(false);   
  }
  
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);

    return()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])

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
      const res = await fetch("https://fakestoreapi.com/products?limit=50");
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
    <MainCart>
      <TopInfo>
        <div>
          <button onClick={showDrawer}>
            Cart<span>
            {cartItems.length}
            </span>
          </button>
        </div>
      </TopInfo>
      <MainCartArea>
        <Drawer title="Cart" placement="right" onClose={onClose} open={open}>
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <BtnCartegoryBox>
          <p>Scroll Y: {scrollY}</p>
          <span>Fake-shop</span>
          <BtnCartegory onClick={getAllCartegory}>all cartegory</BtnCartegory>
          {category.map((product) => (
            <BtnCartegory key={product} onClick={() => clickCartegory(product)}>
              {product}
            </BtnCartegory>
          ))}
          
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
      </MainCartArea>
      <BtnTop className={btnTop? '': 'on'}>

      </BtnTop>
    </MainCart>
  );
};

export default MainPage;

const MainCart = styled.div`
display:flex;
flex-direction:column;
`

const TopInfo = styled.div`
padding: 10px;
background-color:#0e154f;
  div{
    width:1200px;
    margin:0 auto;
    text-align: right;
  }
  button{
    background: transparent;
    border: none;
    color:#fff;
    font-weight:600;
    cursor:pointer;
    position:relative;
    span{
      position:absolute;
      right:-20px;
      top:-8px;
      padding:3px 5px;
      border-radius:50%;
      background-color:#f00;
      color:#fff;
      font-size:10px;
    }
  }
`
const MainCartArea = styled.div`
  display:flex;
  gap: 20px;
  width: 1200px;
  margin: 50px auto;
`;

const BtnCartegoryBox = styled.div`
  flex:200px 0 0;
  span{
    display:block;
    text-align: center;
    font-family: 'Indie Flower', cursive;font-size:42px;
    border-bottom: 2px solid #000;
    margin-bottom:40px;
  }
`;
const BtnCartegory = styled.a`
display: block;
width: inherit;
  padding: 10px;
  background-color: #0e154f;
  color: #fff;
  & + & {
    border-top: 1px solid #fff;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;
const Grid = styled.div`
`
const BtnTop = styled.span`
  position: fixed;
  bottom:30px;right:30px;
  border: 1px solid #aaa;
  border-radius: 50%;
  color:#000;
`;
