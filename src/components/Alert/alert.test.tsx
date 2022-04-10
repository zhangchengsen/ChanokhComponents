import { fireEvent, render, screen } from "@testing-library/react";
import { Alert, AlertType, PAlert } from "./index";
const testProps: PAlert = {
  type: AlertType.Primary,
  className: "appp Alert-Primary",
};
const timeOutProps: PAlert = {
  type: AlertType.Danger,
  duration: 1000,
};
const closeProps: PAlert = {
  type: AlertType.Success,
};
describe("test Alert component", () => {
  it("should render the correct primary alert", () => {
    render(<Alert {...testProps}>123</Alert>);
    const element = screen.getByTestId("alert_id"); //dom元素
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("appp Alert-primary");
  });
  it("should render alert disapper in 1s", () => {
    render(<Alert {...closeProps}></Alert>);
    const element = screen.getByText("x"); //dom元素
    expect(element).toBeInTheDocument();
    expect(screen.queryByTestId("alert_id")).toHaveClass("Alert-success");
    fireEvent.click(element);
    setTimeout(() => {
      expect(screen.queryByTestId("alert_id")).toBeFalsy();
    }, 100);
  });
});
