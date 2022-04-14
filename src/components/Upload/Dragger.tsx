import React, { memo, useState, DragEvent } from "react";
import classNames from "classnames";

export interface IDraggerProps {
  onFile: (f: any) => void;
}
const Dragger: React.FC<IDraggerProps> = memo((props) => {
  const { onFile } = props;
  const [over, setOver] = useState(false);
  const classes = classNames("Dragger", {
    Dragger_isOver: over,
  });

  const handleDrag = (e: DragEvent<HTMLElement>, status: boolean) => {
    e.preventDefault();

    setDragStatus(status);
  };
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragStatus(false);
    onFile(e.dataTransfer.files);
  };
  const setDragStatus = (status: boolean) => {
    setOver(status);
  };
  return (
    <div
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      className={classes}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={(e) => handleDrop(e)}
    >
      {props?.children}
    </div>
  );
});

export default Dragger;
