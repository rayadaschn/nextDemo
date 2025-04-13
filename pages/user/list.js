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

// UseList.loadData 在组件里定义好了, 然后在服务器端获取数据
UseList.getInitialProps = async () => {
  const response = await request.get("/api/users");
  const listDef = [
    { id: 1, name: "张三" },
    { id: 2, name: "李四" },
  ];

  const list = response.data.data || listDef;
  return { list };
};
export default UseList;
