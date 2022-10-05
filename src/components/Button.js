import React from "react";

export default function Button({ icon, onClick, name, style }) {
  return (
    <button
      onClick={onClick}
      className="mx-auto rounded-full hover:bg-opacity-20"
      name={name}
      style={style}
    >
      {icon}
    </button>
  );
}
