import router from "next/router";
import { connect } from "react-redux";
import request from "../utils/request";
function Profile(props) {
  const { currentUser } = props;
  return (
    <div>
      <p>当前登录用户:{currentUser.name}</p>
      <button onClick={() => router.back()}>返回</button>
    </div>
  );
}

Profile.getInitialProps = function (ctx, store) {
  const state = store.getState();
  const { currentUser } = state;
  if (currentUser && Object.keys(currentUser).length > 0) {
    return { currentUser };
  } else {
    // 如果当前用户未登录，则跳转到登录页面
    if (ctx.req) {
      ctx.res.writeHead(303, { Location: "/login" });
      ctx.res.end();
    } else {
      router.push("/login");
    }
    return {};
  }
};

export default Profile;

// // 受保护的路由，需要登录才能访问
// Profile.getInitialProps = async function (ctx) {
//   let options = { url: "/api/validate" };
//   if (ctx.req && ctx.req.headers.cookie) {
//     options.headers = options.headers || {};
//     options.headers.cookie = ctx.req.headers.cookie;
//   }
//   let response = await request(options).then((res) => res.data);
//   if (response.success) {
//     return { currentUser: response.data };
//   } else {
//     if (ctx.req) {
//       ctx.res.writeHead(303, { Location: "/login" });
//       ctx.res.end();
//     } else {
//       router.push("/login");
//     }
//     return {};
//   }
// };

// const WrappedProfile = connect((state) => state)(Profile);
// export default WrappedProfile;
