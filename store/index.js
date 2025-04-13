import { createStore } from "redux";
import reducer from "./reducer";

// 每个用户都有一个新仓库
export default function getStore(initialState) {
  console.log("store 初始化");

  return createStore(reducer, initialState);
}
