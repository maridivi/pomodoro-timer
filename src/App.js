import React, { createContext, useState } from "react";
import Timer from "./components/Timer";
import Title from "./components/Title";
import Wrapper from "./components/Wrapper";

export const ModeContext = createContext({
  currentMode: "work",
  setCurrentMode: () => {},
  colorMode: undefined,
});

function App() {
  const [currentMode, setCurrentMode] = useState("work");

  const colorMode =
    currentMode === "work"
      ? "hsl(0, 95%, 85%)"
      : currentMode === "rest"
      ? "hsl(200, 30%, 90%)"
      : "hsl(200, 60%, 80%)";

  return (
    <ModeContext.Provider value={{ currentMode, setCurrentMode, colorMode }}>
      <Wrapper>
        <Title />
        <Timer />
      </Wrapper>
    </ModeContext.Provider>
  );
}

export default App;
