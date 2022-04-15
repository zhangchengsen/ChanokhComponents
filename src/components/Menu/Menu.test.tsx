import React from "react";
import {
  fireEvent,
  render,
  screen,
  RenderResult,
} from "@testing-library/react";
// import Button, { ButtonSize, ButtonType, TButtonProps } from "./index";
import { MenuItem, IMenuProps, SubMenu, Menu } from "./index";
const testProps: IMenuProps = {
  defaultIdx: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: IMenuProps = {
  defaultIdx: "0",
  mode: "vertical",
  // defaultOpenSubMenus: ['4']
};
describe("test Menu component", () => {
  render(
    <Menu {...testProps}>
      <MenuItem>0</MenuItem>
      <MenuItem>1</MenuItem>
      <MenuItem disabled>2</MenuItem>
      <SubMenu title="汽车" defaultOpen>
        <MenuItem>A8</MenuItem>
        <MenuItem>3</MenuItem>
      </SubMenu>
    </Menu>
  );
  const ele = screen.getByTestId("Menu-wrap"); //dom元素
  const eleChild1 = screen.getByText(/1/); //dom元素
  const eleChild2 = screen.getByText(/2/); //dom元素
  it("should render the correct default Menu", () => {
    expect(ele).toBeInTheDocument();
    expect(eleChild1).toBeInTheDocument();
    expect(ele).toHaveClass("Menu-horizontal");
  });
  it("should render the correct component work successfully after being clicked", () => {
    fireEvent.click(eleChild1);
    setTimeout(() => {
      expect(eleChild1).toHaveClass("Menu-active");
    }, 10);
    expect(eleChild2).toHaveClass("Menu-disabled");
  });
  it("should render SubMenu work successfully", () => {
    render(
      <Menu {...testProps} mode="vertical">
        <MenuItem>0</MenuItem>
        <MenuItem>1</MenuItem>
        <MenuItem disabled>2</MenuItem>
        <SubMenu title="汽车" defaultOpen>
          <MenuItem>A8</MenuItem>
          <MenuItem>3</MenuItem>
        </SubMenu>
      </Menu>
    );
    const subChild1 = screen.getByText(/3/);
    const sub = screen.getByText("汽车");
    const Menuer = screen.getByTestId("Menu-wrap");
    expect(subChild1).toBeInTheDocument();
    expect(Menuer).toHaveClass("Menu");
    expect(Menuer.getElementsByTagName("li").length).toEqual(6);
    expect(sub).toBeInTheDocument();

    fireEvent.click(subChild1);
    setTimeout(() => {
      expect(sub).toHaveClass("border-left");
    }, 100);
  });
  it("should render Menu which type is vertical", () => {
    render(<Menu mode="horizontal" {...testProps}></Menu>);
    const el = screen.getByTestId("Menu-wrap");
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("Menu-horizontal");
  });
});
