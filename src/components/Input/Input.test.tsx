import React, { useEffect, useState } from "react";
import {
  fireEvent,
  render,
  screen,
  RenderResult,
  waitFor,
} from "@testing-library/react";
// import Button, { ButtonSize, ButtonType, TButtonProps } from "./index";
import { Input, InputProps } from "./index";
import { config } from "react-transition-group";
import {
  AutoComplete,
  AutoCompleteProps,
  IDataSourceType,
} from "../AutoComplete";
config.disabled = true;

const dataArr = [
  {
    value: "Kobe Bryant",
  },
  {
    value: "Pau Gasol",
  },
  {
    value: "Lamar Odom",
  },
  {
    value: "Vladimir Radmanovic",
  },
  {
    value: "Derek Fisher",
  },
  {
    value: "Luke Walton",
  },
  {
    value: "Trevor Ariza",
  },
  {
    value: "Chris Mihm",
  },
  {
    value: "Andrew Bynum",
  },
  {
    value: "Sasha Vujacic",
  },
  {
    value: "JoIra Newble",
  },
  {
    value: "Ira Newble",
  },
  {
    value: "DJ Mbenga",
  },
  {
    value: "Ronny Turiaf",
  },
  {
    value: "Coby Karl",
  },
  {
    value: "SunYue",
  },
];

const testVerProps: InputProps = {
  append: "@163.com",
  onChange: jest.fn(),
};
const RenderInput = () => {
  render(<Input {...testVerProps}></Input>);
};
const disabledProps: InputProps = {
  disabled: true,
  prepand: <div>https://</div>,
};
const RenderDisabledInput = () => {
  render(<Input {...testVerProps} {...disabledProps}></Input>);
};

const AUprops: AutoCompleteProps = {
  fetchSuggestion: () => {
    return dataArr.filter((v) => v.value.includes("K"));
  },
  onSelect: jest.fn(),
  placeholder: "hhh",
  renderOptions: (item) => (
    <h5>
      <p>name: {item.value}</p>
    </h5>
  ),
};
const RenderAU = () => {
  render(<AutoComplete {...AUprops}></AutoComplete>);
};
describe("test Input component", () => {
  it("should render the correct default Input", async () => {
    RenderInput();
    const element = screen.getByTestId("input_id"); //dom元素
    expect(element).toBeInTheDocument();
    fireEvent.change(element, { target: { value: "123" } });
    await waitFor(() => {
      expect(testVerProps.onChange).toHaveBeenCalled();
    });
  });
  it("should render the correct disabled Input", async () => {
    RenderDisabledInput();
    const element = screen.getByTestId("input_id") as HTMLElement; //dom元素
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("Input-disabled");
    expect(testVerProps.onChange).not.toHaveBeenCalled();
  });
  it("AutoComplete Input component", async () => {
    RenderAU();
    const element = screen.getByPlaceholderText("hhh") as HTMLElement; //dom元素
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("Input");
    fireEvent.change(element, { target: { value: "123" } });
    await waitFor(() => {
      const e = screen.queryByTestId("AU_ul");
      if (e) {
        expect(e).toBeInTheDocument();
        expect(e.getElementsByTagName("li").length).toBeGreaterThan(1);
        expect(e.getElementsByTagName("li").length).toBeLessThan(5);
      }
    });
  });
  it("should AutoComplete keyboard Event work correctly", async () => {
    RenderAU();
    const element = screen.getByPlaceholderText("hhh") as HTMLElement; //dom元素
    expect(element).toBeInTheDocument();
    fireEvent.change(element, { target: { value: "K" } });

    await waitFor(() => {
      const e = screen.queryByTestId("AU_ul");

      expect(e && e.getElementsByTagName("li").length).toEqual(2);
    });
    const e = screen.queryByTestId("AU_ul");
    if (e) {
      fireEvent.keyDown(element, { keyCode: 40 });
      expect(e.getElementsByTagName("li")[1]).toHaveClass("Focus_item");
      fireEvent.keyDown(element, { keyCode: 38 });
      expect(e.getElementsByTagName("li")[0]).toHaveClass("Focus_item");
      fireEvent.keyDown(element, { keyCode: 38 });
      expect(e.getElementsByTagName("li")[0]).toHaveClass("Focus_item");
      expect(e.getElementsByTagName("li")[1]).not.toHaveClass("Focus_item");
      fireEvent.keyDown(element, { keyCode: 13 });
      expect(e).not.toBeVisible();
    }
  });
});
