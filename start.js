const express = require("express");
const cors = require("cors");
const session = require("express-session");
const logger = require("morgan");

// 部署相关
const next = require("next");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000", // 允许的源
      credentials: true, // 允许携带cookie
    })
  ); // 允许跨域
  app.use(express.json()); // 解析json格式的请求体
  app.use(express.urlencoded({ extended: true })); // 解析urlencoded格式的请求体
  app.use(logger("dev")); // 日志

  app.use(
    session({
      secret: "huy", // 用于生成session的签名
      resave: false, // 是否每次都重新保存session，默认为true
      saveUninitialized: true, // 是否保存未初始化的session，默认为true
      cookie: { secure: false }, // 是否使用安全cookie，默认为false
    })
  );

  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
  ];
  app.get("/api/users", (req, res) => {
    res.json({
      success: true,
      data: users,
    });
  });

  app.get("/api/users/:id", (req, res) => {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    res.json({
      success: true,
      data: user,
    });
  });

  // 登录
  app.post("/api/login", (req, res) => {
    const user = req.body;
    req.session.user = user;
    res.json({ success: true, data: user });
  });

  // 登出
  app.post("/api/logout", (req, res) => {
    console.log("🚀 ~ app.post ~ req:", req);
    req.session.user = null;
    res.json({ success: true });
  });

  // 有效性校验
  app.post("/api/validate", (req, res) => {
    const user = req.session?.user;
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.json({ success: false, error: "用户未登录" });
    }
  });

  app.get("/api/validate", (req, res) => {
    const user = req.session.user;
    if (user) {
      res.json({
        success: true,
        data: user,
      });
    } else {
      res.json({
        success: false,
        error: `用户未登录`,
      });
    }
  });

  // 注册
  app.post("/api/register", (req, res) => {
    const user = req.body;
    user.id = Date.now() + 1;
    user.createdAt = new Date().toISOString();

    users.push(user);

    req.session.user = user;
    res.json({ success: true, data: user });
  });

  // 没有匹配到, 则走这里
  app.get("*", async (req, res) => {
    await handle(req, res);
  });
  app.listen(3007, () => {
    console.log("API listening on port 3007: http://localhost:3007/");
  });
});
