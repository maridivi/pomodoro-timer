import React from "react";
import { FaUndo } from "react-icons/fa";
import { MdSkipNext } from "react-icons/md";
import { IoPause } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

export const PlayIcon = () => {
  return <Icon icon={<FaPlay color="currentColor" size={16} />} />;
};

export const PauseIcon = () => {
  return <Icon icon={<IoPause color="currentColor" size={24} />} />;
};

export const NextIcon = () => {
  return <Icon icon={<MdSkipNext color="currentColor" size={24} />} />;
};

export const ResetIcon = () => {
  return <Icon icon={<FaUndo color="currentColor" size={16} />} />;
};

export const Icon = ({ icon: Icon }) => {
  return <div className="dark:text-white hover:opacity-20 ">{Icon}</div>;
};
