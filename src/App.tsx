import React, { useState } from "react";
import "./App.css";
import Alert, { AlertType } from "./components/Alert";
import Button, { ButtonSize, ButtonType } from "./components/button";

function App() {
  const [show, setShow] = useState(true);
  const changeShow = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };
  return (
    <div className="App">
      <Alert title="Chanokh_apt Alert~">Alert组件展示</Alert>
      <Alert type={AlertType.Info}></Alert>
      <Alert
        type={AlertType.Danger}
        onClose={() => alert("我被关闭了")}
        description="关闭我还能多一个弹窗！"
      ></Alert>
      <Alert type={AlertType.Default}></Alert>
      <Alert type={AlertType.Success}></Alert>
      <Alert duration={1000}></Alert>
      <h2>Chanokh_apt Button</h2>
      <Button>Button</Button>
      <Button autoFocus>AutoFocus Button</Button>
      <Button disabled>Button</Button>
      {show && <Button onClick={() => changeShow()}>Click Button</Button>}
      <Button size={ButtonSize.Large}>Button Large</Button>
      <Button size={ButtonSize.Small}>Button Small</Button>
      <Button btnType={ButtonType.Primary}>Button Primary</Button>
      <Button btnType={ButtonType.Danger}>Button Danger</Button>
      <Button btnType={ButtonType.Default}>Button Default</Button>
      <Button btnType={ButtonType.Link}>Button Link</Button>
      <Button btnType={ButtonType.Link} href="http://wechatweb.ymtx.xyz">
        Button Link Redirect
      </Button>
      <Button btnType={ButtonType.Link} disabled>
        Link Disabled
      </Button>
    </div>
  );
}

export default App;
