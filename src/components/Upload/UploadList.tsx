import React, { memo } from "react";
import { Icon } from "../Icon";
import { IFileProps } from ".";
import { Progress } from "../Progress";
export interface UploadListProps extends IFileProps {
  onRemoved: (e: IFileProps) => void;
}
export const UploadList: React.FC<UploadListProps> = memo((props) => {
  const renderIcon = () => {
    if (props.status === "ready") {
      return (
        <Icon
          className={`Upload-Icon-${props.status}`}
          icon="minus"
          theme="primary"
        ></Icon>
      );
    } else if (props.status === "uploading")
      return (
        <Icon
          className={`Upload-Icon-${props.status}`}
          icon="spinner"
          theme="primary"
          spin
        ></Icon>
      );
    else if (props.status === "fail")
      return (
        <Icon
          className={`Upload-Icon-${props.status}`}
          icon="times-circle"
          theme="danger"
        ></Icon>
      );
    else if (props.status === "success")
      return (
        <Icon
          className={`Upload-Icon-${props.status}`}
          icon="check-circle"
          theme="success"
        ></Icon>
      );
    else return <div></div>;
  };
  return (
    <div style={{ width: "300px" }} data-testid="Upload-list">
      <div className="UploadList">
        <div className="UploadList-left">
          <span className={`Upload-${props.status}`}>
            <Icon icon="file-alt" theme="secondary"></Icon>
          </span>
          <div style={{ marginLeft: "10px" }}>{props.name}</div>
        </div>
        <div
          className="UploadList-right"
          onClick={() => props.onRemoved && props.onRemoved(props)}
        >
          <div className="Upload-Icon">{renderIcon()}</div>
          <div className="Upload-delete" data-testid="Upload-delete">
            <Icon icon="times"></Icon>
          </div>
        </div>
      </div>
      {props.status === "uploading" && props.percent && (
        <Progress
          data-testid="uploading"
          percent={props.percent}
          width="100%"
        ></Progress>
      )}
    </div>
  );
});
