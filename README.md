# nextDemo 实践

> [!TIP] next 的路由事件
>
> - `routeChangeStart(url)` 路由开始切换时触发
> - `routeChangeComplete(url)` 完成路由切换时触发
> - `routeChangeError(err, url)` 路由切换报错时触发
> - `beforeHistoryChange(url)` 浏览器 history 模式开始切换时触发
> - `hashChangeStart(url)` 开始切换 hash 值但是没有切换页面路由时触发
> - `hashChangeComplete(url)` 完成切换 hash 值但是没有切换页面路由时触发

## 部署及其成果物

指令:

```bash
pnpm build
```

利用 pm2 部署:

将生成的 `.next/` 、`public`, `package.json`, `package-lock.json`, 环境变量文件以及任何必要的配置文件上传到了云服务器上的项目根目录。目录拷贝到服务器上，然后运行：

```bash
pm2 start npm --name "nextDemo" -- start
```

> Next.js 的成果物既可以是 **纯静态页面（HTML）**，也可以是 **服务端渲染的 Node.js 应用（Serverless 函数）**，还可以混合使用两者。

构建产物（运行 `next build` 后）包含：

### 1. `.next/` 目录（最核心的构建成果）

这个目录里是 Next 构建后的真正成果物：

| 目录             | 内容说明                                 |
| ---------------- | ---------------------------------------- |
| `.next/server`   | SSR 相关代码（服务端渲染逻辑、API 路由） |
| `.next/static`   | 静态资源，包括预渲染页面、JS/CSS、图片等 |
| `.next/cache`    | 编译缓存，加快二次构建速度               |
| `.next/BUILD_ID` | 用于客户端和服务端保持构建同步           |

---

### 2. 根据不同构建模式，成果物有所不同：

| 模式                                | 成果物类型              | 说明                         |
| ----------------------------------- | ----------------------- | ---------------------------- |
| `getStaticProps` + `getStaticPaths` | 静态 HTML 文件（SSG）   | 可部署到 CDN，不依赖 Node.js |
| `getServerSideProps`                | SSR 页面（Node 函数）   | 每次请求时动态渲染           |
| `API Routes`                        | Serverless API 函数     | 可用作后端接口               |
| `public/` 中的资源                  | 原样复制到 `/` 根路径下 | 比如图片、字体文件等         |

---

## 构建后的部署成果物类型

你选择不同的部署目标，成果物也不一样：

### 本地部署（Node.js 环境）

```bash
next build
next start
```

成果物为 SSR + 静态文件混合，使用 `.next/` 内部的资源。

---

### 静态部署（无服务器，纯前端 CDN）

```bash
next export
```

成果物是：

- `out/` 文件夹：里面是纯 HTML、CSS、JS，可以托管到 Vercel、Netlify、GitHub Pages、阿里云 OSS 等。

🚫 不支持 `getServerSideProps`、API 路由。

---

### Vercel（官方推荐）

部署到 Vercel 会自动分离：

- 静态页面 CDN 缓存
- SSR 页面作为 Serverless 函数部署
- API 路由也作为独立 Serverless 函数

---

## ✨ 可视化理解：

```txt
.next/
├── static/              --> 静态资源（预渲染页面、JS、CSS）
├── server/              --> SSR 页面渲染函数 + API 路由代码
├── cache/               --> 编译缓存
└── BUILD_ID             --> 构建版本号
```
