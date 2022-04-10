import React from "react";
import {
  fireEvent,
  render,
  screen,
  RenderResult,
  waitFor,
} from "@testing-library/react";
// import Button, { ButtonSize, ButtonType, TButtonProps } from "./index";
import { Tabs, TabItem, ITabs } from "./index";

const testVerProps: ITabs = {
  defaultActive: 0,
  defaultOpen: true,
  onSelect: () => {
    console.log(2);
  },

  // defaultOpenSubMenus: ['4']
};
const toRender = () => {
  render(
    <Tabs defaultActive={0} defaultOpen>
      <TabItem title="tab1">
        <div>111</div>
      </TabItem>
      <TabItem title="tab2">
        <div>222</div>
      </TabItem>
    </Tabs>
  );
};
const renderNotOpen = () => {
  render(
    <Tabs defaultActive={1}>
      <TabItem title="tab1">
        <div>111</div>
      </TabItem>
      <TabItem title="tab2">
        <div>222</div>
      </TabItem>
    </Tabs>
  );
};
describe("test Tabs component", () => {
  it("should render the correct default Tabs", async () => {
    toRender();
    const t1 = screen.getByText("tab1");
    const t2 = screen.getByText("tab2");
    expect(t1).toBeInTheDocument();
    expect(t2).toBeInTheDocument();
    fireEvent.click(t2);
    await waitFor(() => {
      expect(t2).toHaveClass("TabItem-active");
    });
  });
  it("should render the drag icon work successfully ", async () => {
    toRender();
    const dragIcon = screen.getByTestId("drag");
    expect(dragIcon).toBeInTheDocument();
    expect(screen.queryByTestId("drag")).toHaveClass("icon-shangla");

    fireEvent.click(dragIcon);
    expect(screen.queryByTestId("drag")).not.toHaveClass("icon-shangla");
    expect(screen.queryByTestId("drag")).toHaveClass("icon-shangla1");
  });
  it("should function defaultOpen & default Active  work successfully", async () => {
    renderNotOpen();
    expect(screen.queryByText("222")).toBeFalsy();
    const dragIcon = screen.getByTestId("drag");
    const tab2 = screen.getByText("tab2");
    expect(tab2).toHaveClass("TabItem-active");
    fireEvent.click(dragIcon);
    await waitFor(() => {
      expect(screen.queryByText("222")).toBeVisible();
    });
  });
});
