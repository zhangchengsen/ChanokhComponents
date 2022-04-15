import React from "react";
import { Icon } from "../Icon";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fireEvent,
  render,
  screen,
  RenderResult,
  waitFor,
  queryByText,
} from "@testing-library/react";
import axios from "axios";
import { Upload, IUploadProps } from ".";
import { act } from "react-dom/test-utils";
library.add(fas);

// import Button, { ButtonSize, ButtonType, TButtonProps } from "./index";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

const testVerProps: IUploadProps = {
  action: "https://jsonplaceholder.typicode.com/posts",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
};
const dropProps: Partial<IUploadProps> = {
  drag: true,
};
const toRender = () => {
  render(<Upload {...testVerProps}>click to upload</Upload>);
};
const renderNotOpen = () => {
  render(
    <Upload {...testVerProps} {...dropProps}>
      click to upload
    </Upload>
  );
};
describe("test Upload component", () => {
  const testFile = new File(["xyz"], "test.png", { type: "image/png" });
  it("should Upload request and remove successfully", async () => {
    toRender();
    const wrapper = screen.getByText("click to upload");

    const input = screen.getByTestId("Upload-input");
    mockAxios.post.mockResolvedValue({ data: "success" });

    expect(wrapper).toBeVisible();
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { files: [testFile] } });
    await waitFor(() => {
      expect(screen.queryByText("test.png")).toBeInTheDocument();
    });
    expect(
      wrapper.getElementsByClassName("Upload-Icon-success").length
    ).toBeGreaterThan(0);
    expect(testVerProps.onSuccess).toHaveBeenCalledWith(
      { data: "success" },
      testFile
    );
    const removeButton = screen.getByTestId("Upload-delete");
    fireEvent.click(removeButton);
    await waitFor(() => {
      expect(screen.queryByText("test.png")).not.toBeInTheDocument();
    });
  });
  it("should render the drag action well ", async () => {
    renderNotOpen();
    const wrapper = screen.getByText("click to upload");
    mockAxios.post.mockResolvedValue({ data: "success" });

    const input = screen.getByTestId("Upload-input");
    expect(wrapper).toHaveClass("Dragger");
    fireEvent.dragOver(wrapper);
    expect(screen.queryByText("click to upload")).toHaveClass("Dragger_isOver");
    fireEvent.dragLeave(wrapper);
    expect(screen.queryByText("click to upload")).not.toHaveClass(
      "Dragger_isOver"
    );
    fireEvent.drop(wrapper, { dataTransfer: { files: [testFile] } });
    await waitFor(() => {
      expect(screen.queryByText("test.png")).toBeInTheDocument();
    });
    const UploadList = screen.queryByTestId("Upload-list");
    await waitFor(() => {
      expect(
        UploadList?.getElementsByClassName("Upload-Icon-success").length
      ).toBeGreaterThan(0);
    });

    expect(testVerProps.onSuccess).toHaveBeenCalledWith(
      { data: "success" },
      testFile
    );
  });
});
