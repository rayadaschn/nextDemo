import React from "react";
import UserLayout from "../";
import request from "utils/request";

function UserDetail(props) {
  return (
    <UserLayout>
      <p>ID:{props.user.id}</p>
      <p>Name:{props.user.name}</p>
    </UserLayout>
  );
}
UserDetail.getInitialProps = async (ctx) => {
  const response = await request.get(`/api/users/${ctx?.query.id}`);
  return { user: response.data.data || { id: ctx.query.id } };
};
export default UserDetail;
