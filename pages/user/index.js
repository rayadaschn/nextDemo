import Link from "next/link";

function UserLayout(props) {
  return (
    <div>
      <div>
        <ul>
          <li>
            <Link href="/user/list">
              <span>用户列表</span>
            </Link>
          </li>
          <li>
            <Link href="/user/add">
              <span>添加用户</span>
            </Link>
          </li>
        </ul>
        <div>{props.children}</div>
      </div>
    </div>
  );
}
export default UserLayout;
