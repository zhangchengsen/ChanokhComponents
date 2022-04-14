import React, {
  ChangeEvent,
  FC,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
// import { Button, ButtonType } from "../button";
import { UploadList } from "./UploadList";
import Dragger from "./Dragger";
// export type FileStatus = "uploading" | "ready" | "success" | "fail";
export interface IFileProps {
  uid: string;
  //   status?: FileStatus;
  status?: string;
  name: string;
  size: number;
  raw?: File | object;
  response?: any;
  error?: any;
  percent?: number;
}
export interface IUploadProps {
  action: string;
  onProgress?: (progress: number, file: File) => void;
  beforeUpload?: (f: File) => boolean | Promise<File>;
  onChange?: (f: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onRemoved?: (f: IFileProps) => void;
  multiple?: boolean;
  accept?: string;
  defaultUploadList?: IFileProps[];
  name?: string;
  headers?: { [key: string]: any };
  data?: { [key: string]: any };
  withCredentials?: boolean;
  drag?: boolean;
  width?: string;
}
export const Upload: FC<IUploadProps> = memo((props) => {
  const {
    name,
    headers,
    data,
    withCredentials,
    onChange,
    action,
    accept,
    multiple,
    onSuccess,
    onProgress,
    onError,
    beforeUpload,
    defaultUploadList,
    drag,
    children,
    onRemoved,
    width,
    ...restProps
  } = props;
  useEffect(() => {
    if (defaultUploadList && defaultUploadList.length) {
      setFileList([...defaultUploadList]);
    }
  }, [defaultUploadList]);
  const [fileList, setFileList] = useState<IFileProps[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  // 点击事件
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
  // 上传文件
  const uploadFiles = (files: FileList) => {
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
  // 更新文件列表信息
  const updateFileList = (
    updateObj: IFileProps,
    updateMsg: Partial<IFileProps>
  ) => {
    // if (Object.keys(updateMsg).length)
    setFileList((preList) => {
      return preList.map((v) => {
        if (v.uid === updateObj.uid) return { ...v, ...updateMsg };
        else return v;
      });
    });
  };
  // 发送post请求
  const post = (file: File) => {
    let fileData: IFileProps = {
      name: file.name,
      uid: "" + Date.now() + Math.random(),
      size: file.size,
      status: "ready",
      raw: file,
      percent: 0,
    };
    setFileList((preList) => {
      return [...preList, fileData];
    });
    let formData = new FormData();
    formData.append(name || "file", file);
    if (data)
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let progress = Math.round((e.loaded * 100) / e.total) || 0;
          if (progress < 100) {
            updateFileList(fileData, {
              status: "uploading",
              percent: progress,
            });
            if (onProgress) onProgress(progress, file);
          }
        },
      })
      .then((res) => {
        if (onSuccess) onSuccess(res, file);
        if (onChange) onChange(file);
        updateFileList(fileData, {
          status: "success",
          response: res.data,
          percent: 100,
        });
      })
      .catch((err) => {
        if (onError) onError(err, file);
        if (onChange) onChange(file);
        updateFileList(fileData, { status: "fail", error: err });
      });
  };
  // 删除
  const handleRemove = (item: IFileProps) => {
    setFileList((preList) => {
      return preList.filter((v) => {
        return item.uid !== v.uid;
      });
    });
    if (onRemoved) onRemoved(item);
  };

  return (
    <div
      className="Upload"
      style={{ width }}
      onClick={() => handleClick()}
      {...restProps}
    >
      {/* <Button btnType={ButtonType.Primary} onClick={() => handleClick()}>
        Upload
      </Button> */}

      {drag ? (
        <Dragger onFile={(e) => uploadFiles(e)}>{children}</Dragger>
      ) : (
        children
      )}
      <input
        className="Upload-input"
        style={{ display: "none" }}
        accept={accept}
        data-testid="Upload-input"
        multiple={multiple}
        ref={fileRef}
        type="file"
        onChange={(e) => handleFileChange(e)}
      ></input>
      {!!fileList.length &&
        fileList.map((v) => {
          return (
            <UploadList
              key={v.uid}
              {...v}
              onRemoved={(f: IFileProps) => {
                handleRemove(f);
              }}
            ></UploadList>
          );
        })}
    </div>
  );
});

Upload.defaultProps = {
  action: "",
  width: "100%",
};
