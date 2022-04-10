import { fireEvent, render, screen } from "@testing-library/react";
import { Button, ButtonSize, ButtonType, TButtonProps } from "./index";
const defaultProps = {
  onClick: jest.fn(),
};
const testProps: TButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "appp",
};
const buttonLinkProps: TButtonProps = {
  btnType: ButtonType.Link,
  size: ButtonSize.Large,
  onClick: jest.fn(),
  href: "http://abc.y.xyz",
};
const disabledTypeProps: TButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  onClick: jest.fn(),
  disabled: true,
};

describe("test Button component", () => {
  it("should render the correct default button", () => {
    render(<Button {...defaultProps}>123</Button>);
    const element = screen.getByText(/123/i) as HTMLButtonElement; //dom元素
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render the correct component based on difficult props", () => {
    render(<Button {...testProps}>button1</Button>);
    const element = screen.getByText(/button1/i); //dom元素
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-primary btn-lg appp");
  });
  it("should render a link when btnType equals link and href is provided", () => {
    render(<Button {...buttonLinkProps}>button2</Button>);
    const element = screen.getByText(/button2/i); //dom元素
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link btn-lg");
  });
  it("should render a disabled when disabled set to true", () => {
    render(<Button {...disabledTypeProps}>button3</Button>);
    const element = screen.getByText(/button3/i) as HTMLButtonElement; //dom元素
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledTypeProps.onClick).not.toHaveBeenCalled();
  });
});
