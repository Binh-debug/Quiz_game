import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import "antd/dist/antd.css";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();
  const onFinish = ({ username, password }) => {
    Axios.post(`https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/login`, {
      username: username,
      password: password,
    })
      .then((response) => {
        let data = response.data;

        localStorage.setItem("token", JSON.stringify(data.tokens.access.token));
        if (data.user.role === "admin") {
          navigate("/admin");
        }
        if (data.user.role === "user") {
          navigate("/user");
        }
      })
      .catch(() => {
        alert("Đăng nhập không thành công");
      });
  };

  return (
    <div
      className="container"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAACA8",
        backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)",
      }}
    >
      <div style={{ width: 350 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <NavLink to="register">register now!</NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
