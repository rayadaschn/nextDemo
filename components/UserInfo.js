import React, { useState } from "react";
function UserInfo(props) {
  const [createdAt, setCreatedAt] = useState(props.user.createdAt);
  const [show, setShow] = useState(true);
  async function changeFormat() {
    const moment = await import("moment");
    setCreatedAt(moment.default(createdAt).fromNow());
    setShow(false);
  }
  return (
    <>
      <p>NAME:{props.user.name}</p>
      <p>创建时间:{createdAt}</p>
      {show && <button onClick={changeFormat}>切换为相对时间</button>}
    </>
  );
}
export default UserInfo;
