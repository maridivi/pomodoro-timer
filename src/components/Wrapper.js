import { useContext, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ModeContext } from "../App";
import Button from "./Button";

export default function Wrapper({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const { colorMode } = useContext(ModeContext);
  return (
    <div id="container" className={darkMode && "dark"}>
      <div
        className="dark:bg-slate-800 mx-auto border h-screen w-screen p-2 flex flex-col zoom"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0) 40%, ${
            !darkMode ? colorMode : "rgba(0,0,0,0.3"
          })`,
        }}
      >
        <div className="top-5 right-5 absolute hover:opacity-50">
          <Button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
            icon={darkMode ? <FaSun color="white" /> : <FaMoon />}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
