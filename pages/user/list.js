import Link from "next/link";
import UserLayout from "./";
import request from "utils/request";
function UseList(props) {
  return (
    <UserLayout>
      <ul>
        {props.list.map((user) => (
          <li key={user.id}>
            <Link href={`/user/detail/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </UserLayout>
  );
}

// // UseList.loadData 在组件里定义好了, 然后在服务器端获取数据
// UseList.getInitialProps = async () => {
//   const response = await request.get("/api/users");
//   const listDef = [
//     { id: 1, name: "张三" },
//     { id: 2, name: "李四" },
//   ];

//   const list = response.data.data || listDef;
//   return { list };
// };

// getInitialProps 已经不推荐使用了!!! , 服务器端获取数据用 getServerSideProps
export async function getServerSideProps() {
  console.log("🚀 ~ getServerSideProps ~ 只会在服务端执行");
  const res = await request.get("http://localhost:3007/api/users");
  return {
    props: {
      list: res.data.data,
    },
  };
}

// getStaticProps 会在服务端执行, 但是会缓存, 适合静态页面
// export async function getStaticProps() {
//   console.log("🚀 ~ getStaticProps ~ 只会在服务端执行");
//   const res = await request.get("http://localhost:3007/api/users");
//   return {
//     props: {
//       list: res.data.data,
//     },
//   };
// }

export default UseList;
