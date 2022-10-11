import React from "react";

export const Clock = ({ seconds, playState, modeColor, resetAnimation }) => {
  const clockTicks = new Array(16).fill("");
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: modeColor,
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.05), 0px 4px 14px -2px rgba(0,0,0,0.05), 0px 6px 30px -4px rgba(0,0,0,0.05)",
      }}
      className="rounded-full relative bg-white dark:bg-slate-300 "
    >
      {clockTicks.map((_, index) => (
        <div
          key={index}
          style={{
            width: size,
            height: size,

            transform: `rotate(${(index * 360) / clockTicks.length}deg)`,
          }}
          className={`absolute origin-center`}
        >
          <Tick />
        </div>
      ))}
      <div
        key={resetAnimation}
        style={{
          width: size,
          height: size,
          animationName: "spin",
          animationPlayState: playState,
          animationDuration: `${seconds}s`,
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        }}
        className={"absolute origin-center"}
      >
        <ClockHand />
      </div>
    </div>
  );
};

const ClockHand = () => {
  return (
    <div className="flex flex-col ">
      <ArrowUp />
      <div
        style={{
          left: "calc( 50% - 1px )",
          width: 3,
          top: 15,
          height: size / 2.3,
          borderRadius: 4,
        }}
        className="bg-black absolute"
      />
    </div>
  );
};

const Tick = () => {
  return (
    <div
      style={{
        left: "calc( 50% - 1px )",
        width: 4,
        top: 8,
        height: 12,
        borderRadius: 4,
        backgroundColor: "rgba(0,0,0,0.1)",
        backdropFilter: "saturate(3)",
      }}
      className="absolute"
    ></div>
  );
};

const ArrowUp = () => {
  return (
    <div
      style={{
        top: "12px",
        position: "absolute",
        left: "calc( 50% - 4px )",
        width: "0",
        height: "0",
        borderLeft: "5px solid transparent",
        borderRight: "4px solid transparent",
        borderBottom: "8px solid black",
      }}
    ></div>
  );
};

const size = 250;
