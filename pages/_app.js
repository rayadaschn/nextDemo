import App from "next/app";
import Link from "next/link";
import _appStyle from "./_app.module.css";
import "../styles/global.css";
import { Provider } from "react-redux";
import request from "../utils/request";
import createStore from "../store";
import router from "next/router";
import * as types from "../store/action-types";

function getStore(initialState) {
  if (typeof window === "undefined") {
    return createStore(initialState); //如果是服务器端,每次都返回新的仓库
  } else {
    if (!window._REDUX_STORE_) {
      window._REDUX_STORE_ = createStore(initialState);
    }
    return window._REDUX_STORE_;
  }
}

class LayoutApp extends App {
  // 9. 客户端收到数据后, 把 props 反序列化成对象, 传递给LayoutApp组件
  constructor(props) {
    super(props);
    // 5. 把 props 作为属性对象传递给 LayoutApp 组件
    // 6. 在服务器环境中, 根据 getInitialProps 得到最初状态创建新的仓库, 赋值给 store 属性

    // 10. 在客户端下, 通过服务器返回的状态创建客户端的状态仓库
    this.store = getStore(props.initialState);
    this.state = { loading: false }; // loading 状态
    console.log("LayoutApp constructor");
  }
  static async getInitialProps({ Component, ctx }) {
    console.log("LayoutApp getInitialProps");
    // 0. 在服务器走 LayoutApp.getInitialProps

    // 1.服务器后台创建新仓库。  后续每次切换路由都会执行此方法获取老仓库
    let store = getStore();
    console.log("store 初始化完成");

    // 2. 如果是服务器环境, 会调用接口获取当前的登录用户信息, 复制到仓库中
    if (typeof window == "undefined") {
      // 2.1 后台获取用户信息
      let options = { url: "/api/validate" };
      // 2.2 客户端获取到 cookie, 需要设置到请求头中
      if (ctx.req && ctx.req.headers.cookie) {
        options.headers = options.headers || {};
        options.headers.cookie = ctx.req.headers.cookie;
      }
      let response = await request(options).then((res) => res.data);
      if (response.success) {
        // 2.3 派发成功
        store.dispatch({ type: types.SET_USER_INFO, payload: response.data });
      }
    }
    let pageProps = {};
    if (Component.getInitialProps)
      pageProps = await Component.getInitialProps(ctx, store);
    const props = { pageProps };

    // 3. 在服务器环境中，把仓库的最新状态放在了属性对象的 initialState 属性中
    if (typeof window == "undefined") {
      //后台获取用赋值状态
      props.initialState = store.getState();
    }

    // 返回 props 属性对象, 这里将会成为 LayoutApp 组件的 props 属性
    return props;
  }

  componentDidMount() {
    console.log("LayoutApp componentDidMount");
    this.routeChangeStart = (url) => {
      this.setState({ loading: true });
    };
    router.events.on("routeChangeStart", this.routeChangeStart);
    this.routeChangeComplete = (url) => {
      this.setState({ loading: false });
    };
    router.events.on("routeChangeComplete", this.routeChangeComplete);
  }
  componentWillUnmount() {
    router.events.off("routeChangeStart", this.routeChangeStart);
    router.events.off("routeChangeComplete", this.routeChangeComplete);
  }
  render() {
    console.log("LayoutApp render");

    // 7. 通过使用仓库中的状态去在服务器端渲染组件, 获取组件的 HTML 字符串
    // 8. 服务器端渲染完成后, 会把 LayoutApp 的 props 序列化成字符串和 render 渲染出来的 html 一起发给客户端

    // 11. 通过客户端的仓库状态, 渲染组件, 进行水合
    let state = this.store.getState();
    let { Component, pageProps } = this.props;
    return (
      <Provider store={this.store}>
        <style jsx>
          {`
            li {
              display: inline-block;
              margin-left: 10px;
              line-height: 31px;
            }
          `}
        </style>
        <header>
          <ul>
            <li>
              <Link href="/">首页</Link>
            </li>
            <li>
              <Link href="/user/list">用户管理</Link>
            </li>
            <li>
              <Link href="/profile">个人中心</Link>
            </li>
            <li>
              {state?.currentUser.name ? (
                <span>用户: {state.currentUser.name}</span>
              ) : (
                <Link href="/login">登录</Link>
              )}
            </li>
          </ul>
        </header>
        {/* <Component {...pageProps} /> */}
        {this.state.loading ? (
          <div>切换中......</div>
        ) : (
          <Component {...pageProps} />
        )}
        <footer style={{ textAlign: "center" }}>@copyright Huy</footer>
      </Provider>
    );
  }
}
export default LayoutApp;
