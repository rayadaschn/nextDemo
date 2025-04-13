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
// UserDetail.getInitialProps = async (ctx) => {
//   const response = await request.get(`/api/users/${ctx?.query.id}`);
//   return { user: response.data.data || { id: ctx.query.id } };
// };

export async function getServerSideProps(ctx) {
  const response = await request.get(
    `http://localhost:3007/api/users/${ctx?.query.id}`
  );
  return { props: { user: response.data.data || { id: ctx.query.id } } };
}

// 静态路径, 适合博客文档类的内容
// export async function getStaticPaths() {
//   const response = await request.get(`http://localhost:3007/api/users`);
//   const users = response.data.data;
//   // 这是一个用户详情页的路径，需要根据用户id生成
//   // 在编译的时候, 会调用此方法获取路径的数组, 然后依次访问这些路径, 把这个路径生成静态的html文件
//   const paths = users.map((user) => `/user/detail/${user.id}`);

//   return { paths };
// }

export default UserDetail;
