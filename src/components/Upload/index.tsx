import React, { ChangeEvent, FC, memo, useRef, useState } from "react";
import axios from "axios";
import { Button, ButtonType } from "../button";
export type FileStatus = "uploading" | "ready" | "success" | "fail";
export interface IFileProps {
  uid: string;
  status?: FileStatus;
  name: string;
  size: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface IUploadProps {
  action: string;
  onProgress?: (progress: number, file: File) => void;
  beforeUpload?: (f: File) => boolean | Promise<File>;
  onChange?: (f: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onRemoved?: () => void;
}
export const Upload: FC<IUploadProps> = memo((props) => {
  const { onChange, action, onSuccess, onProgress, onError, beforeUpload } =
    props;

  const [fileList, setFileList] = useState<IFileProps[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileRef.current) fileRef.current.click();
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileRef.current) fileRef.current.value = "";
  };
  const uploadFiles = (files: FileList) => {
    console.log(files.length, "上传文件的长度");
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (beforeUpload) {
        let res = beforeUpload(file);
        if (res && res instanceof Promise) {
          res.then((resFile) => post(resFile));
        } else if (res !== false) {
          post(file);
        }
      } else post(file);
    });
  };
  const updateFileList = (
    updateObj: IFileProps,
    updateMsg: Partial<IFileProps>
  ) => {
    setFileList((preList) => {
      let list = preList.map((v) => {
        if ((v.uid = updateObj.uid)) return { ...v, ...updateMsg };
        else return v;
      });
      console.log(list);
      return list;
    });
  };
  // 发送请求
  const post = (file: File) => {
    let fileData: IFileProps = {
      name: file.name,
      uid: "" + Date.now() + Math.random(),
      size: file.size,
      status: "ready",
      raw: file,
    };
    setFileList([...fileList, fileData]);
    let formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          let progress = Math.round((e.loaded * 100) / e.total) || 0;
          if (progress < 100) {
            updateFileList(fileData, { status: "uploading" });
            if (onProgress) onProgress(progress, file);
          }
        },
      })
      .then((res) => {
        if (onSuccess) onSuccess(res, file);
        if (onChange) onChange(file);
        updateFileList(fileData, { status: "success", response: res.data });
      })
      .catch((err) => {
        if (onError) onError(err, file);
        if (onChange) onChange(file);
        updateFileList(fileData, { status: "fail", error: err });
      });
  };
  return (
    <div className="Upload">
      <Button btnType={ButtonType.Primary} onClick={() => handleClick()}>
        Upload
      </Button>
      <input
        className="Upload-input"
        style={{ display: "none" }}
        ref={fileRef}
        type="file"
        onChange={(e) => handleFileChange(e)}
      ></input>
    </div>
  );
});
Upload.defaultProps = {
  action: "",
};
