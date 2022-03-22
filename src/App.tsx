import React, { useState } from "react";
import "./App.css";
import Alert, { AlertType } from "./components/Alert";
import Button, { ButtonSize, ButtonType } from "./components/button";
import Menu, { MenuItem, SubMenu } from "./components/Menu";
import Tabs, { TabItem } from "./components/Tabs";
type bool_key = [boolean, string];
function App() {
  const [show, setShow] = useState(true);
  // 元组 bool 和key可以同时刷新
  const [showAlert, setShowAlert] = useState<bool_key>([false, "Alert_key"]);
  const changeShow = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };
  const getAlert = () => {
    setShowAlert([true, showAlert[1] + "1"]);
  };
  return (
    <div className="App">
      {showAlert[0] && (
        <div key={showAlert[1]}>
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
        </div>
      )}

      <h2>Chanokh Tabs</h2>
      <Tabs defaultActive={0} defaultOpen>
        <TabItem title="Chanokh_apt Button">
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
        </TabItem>
        <TabItem title="Chanokh Alert">
          <Button btnType={ButtonType.Primary} onClick={() => getAlert()}>
            展示Alert组件
          </Button>
        </TabItem>
        {/* <TabItem title="tabber"></TabItem> */}
      </Tabs>
      {/* Menu */}
      <h2>Chanokh Menu</h2>
      <Menu defaultIdx={"2"} onSelect={(idx) => {}}>
        <MenuItem>index 0</MenuItem>
        <MenuItem>index 1</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <SubMenu title="嗨11">
          <MenuItem>abcee</MenuItem>
          <MenuItem>abc</MenuItem>
        </SubMenu>
      </Menu>
      <br />
      <Menu mode="vertical" defaultIdx={"2"} onSelect={(idx) => {}}>
        <MenuItem>index 0</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <SubMenu title="嗨12221">
          <MenuItem>abcD</MenuItem>
          <MenuItem>abc</MenuItem>
        </SubMenu>
        <SubMenu title="车队" defaultOpen>
          <MenuItem>奥迪</MenuItem>
          <MenuItem>劳斯莱斯</MenuItem>
        </SubMenu>
        <MenuItem>index 2</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
