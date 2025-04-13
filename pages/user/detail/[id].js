import React from "react";
import dynamic from "next/dynamic";
import UserLayout from "../";
import request from "utils/request";

const DynamicUserInfo = dynamic(() => import("@/components/UserInfo"));
function UserDetail(props) {
  const [show, setShow] = React.useState(false);

  return (
    <UserLayout>
      <p>ID:{props.user.id}</p>
      <p>Name:{props.user.name}</p>

      <button onClick={() => setShow(!show)}>显示/隐藏</button>
      {show && props.user && <DynamicUserInfo user={props.user} />}
    </UserLayout>
  );
}
UserDetail.getInitialProps = async (ctx) => {
  const response = await request.get(`/api/users/${ctx?.query.id}`);
  return { user: response.data.data || { id: ctx.query.id } };
};
export default UserDetail;
