import React, { useState } from "react";
import Button from "./components/Button";
import Timer from "./components/Timer";
import Title from "./components/Title";
import { FaMoon, FaSun } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div id="container" className={darkMode && "dark"}>
      <div className="bg-customBackground dark:bg-slate-800 mx-auto border h-screen w-screen">
        <div>
          <Title />
          <div className="top-5 right-5 absolute hover:opacity-50">
            <Button
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              icon={darkMode ? <FaSun color="white" /> : <FaMoon />}
            />
          </div>
        </div>
        <div className="w-fit mx-auto my-40 ">
          <Timer />
        </div>
      </div>
    </div>
  );
}

export default App;
