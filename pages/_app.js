import App from "next/app";
import Link from "next/link";
import "../styles/global.css";

class LayoutApp extends App {
  // 注册初始化 props, 这里的作用是，在页面渲染之前，先获取数据，然后传递给页面
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    // const { Component: RouteComponent, pageProps } = this.props;
    let { Component, pageProps } = this.props;
    return (
      <div>
        <style jsx>{`
          li {
            display: inline-block;
            margin: 0 10px;
            line-height: 40px;
          }
        `}</style>

        <header>
          {/* <img src="/images/logo.jpeg" /> */}
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {/* <li>
              <Link href="/user">User</Link>
            </li> */}
            <li>
              <Link href="/user/list">用户管理</Link>
            </li>
            <li>
              <Link href="/profile"> 个人中心</Link>
            </li>
          </ul>
        </header>

        {/* 将各组件的props传递给页面 */}
        <Component {...pageProps} />
        {/* <RouteComponent {...pageProps} /> */}
        <footer style={{ textAlign: "center" }}>Huy</footer>
      </div>
    );
  }
}

export default LayoutApp;
