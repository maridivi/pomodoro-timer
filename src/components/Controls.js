import React from "react";
import Button from "./Button";
import { NextIcon, ResetIcon } from "./Icons";

export default function Controls({
  onResetClick,
  onStartClick,
  onNextClick,
  icon,
  style,
}) {
  return (
    <div className="flex gap-1 w-60 mx-auto mt-10  ">
      <Button
        style={{ width: "25px" }}
        name="reset"
        onClick={onResetClick}
        icon={<ResetIcon />}
      />

      <Button name="start-pause" onClick={onStartClick} icon={icon}></Button>

      <Button
        name="next"
        onClick={onNextClick}
        icon={
          <div className="lightgray dark:text-gray-300" style={style}>
            <NextIcon color="currentColor" />
          </div>
        }
      />
    </div>
  );
}
