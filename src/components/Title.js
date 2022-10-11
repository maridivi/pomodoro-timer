import React from "react";
import { GiTomato } from "react-icons/gi";

export default function Title() {
  return (
    <div className="flex flex-row justify-center">
      <div className="pt-6">
        <GiTomato size="25px" color="red" />
      </div>
      <h1 className="dark:text-white text-slate-700 m-6 text-2xl text-center font-extrabold  font-inter ml-1">
        Pomozone
      </h1>
    </div>
  );
}
