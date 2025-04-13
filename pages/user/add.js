import UserLayout from "./";
import React from "react";
import router from "next/router";
import request from "utils/request";

function UserAdd() {
  const nameRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await request
      .post("/api/register", user)
      .then((response) => response.data);
    if (response.success) {
      // 跳转到用户列表页面
      router.push("/user/list");
    } else {
      alert(response.message);
    }
  };
  return (
    <UserLayout>
      <form onSubmit={handleSubmit}>
        用户名:
        <input ref={nameRef} />
        密码:
        <input ref={passwordRef} />
        <button type="submit">添加</button>
      </form>
    </UserLayout>
  );
}

export default UserAdd;
