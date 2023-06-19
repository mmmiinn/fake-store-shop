import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import winiPassLogo from "../../assets/hanger.png";

const WiniLogin: React.FC = () => {
  const navi = useNavigate();
  const [inputIdValue, setInputIdValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const loginInfoSubmit = async () => {
    if (inputIdValue === "") {
      alert("아이디를 입력해주세요");
    }
    if (inputPasswordValue === "") {
      alert("비밀번호를 입력해주세요");
    }

    try {
      fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: inputIdValue,
          password: inputPasswordValue,
        }),
      })
        .then((res) => res.json())
        .then((json) => localStorage.setItem("accessToken", json.token));

      localStorage.setItem("companyName", "바른회사");

      navi("/main");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginForm>
      <LoginLogo />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message:
                "아이디를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
            },
          ]}
        >
          <Input
            style={{ width: 360 }}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="ID"
            value={form.username}
            onChange={(e: any) => setInputIdValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message:
                "비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
            },
          ]}
        >
          <Input.Password
            style={{ width: 360 }}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="PW"
            value={form.password}
            onChange={(e: any) => setInputPasswordValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={loginInfoSubmit}
          >
            로그인
          </Button>
        </Form.Item>
      </Form>
      <LoginComment>
        로그인 계정
        <br />
        id:mor_2314
        <br />
        pw:83r5^_
      </LoginComment>
    </LoginForm>
  );
};

export default WiniLogin;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  Input {
    height: 44px;
  }
  button {
    width: 360px;
    height: 52px;
    font-size: 16px;
    font-weight: 500;
    background-color: #3f51b5;
    border-radius: 4px;
    &:hover {
      background-color: #202f84 !important;
    }
  }
  .ant-form-item {
    margin-bottom: 30px;
  }
  .ant-form-item-explain-error {
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
  .ant-input-affix-wrapper {
    border-radius: 4px;
  }
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused,
  .ant-input-affix-wrapper:hover {
    border-color: #300693;
    box-shadow: none;
  }
  .ant-input-affix-wrapper > input.ant-input {
    color: #300693;
    font-size: 16px;
    padding-left: 6px;
  }
`;
const LoginLogo = styled.div`
  &::before {
    content: "";
    width: 234px;
    height: 205px;
    background: url(${winiPassLogo}) center no-repeat;
    display: block;
    background-size: contain;
  }
`;

const LoginComment = styled.span`
  color: #716e77;
`;
