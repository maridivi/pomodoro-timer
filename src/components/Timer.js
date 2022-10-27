import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ModeContext } from "../App";
import useSounds from "../hooks/useSounds";

import { Clock } from "./Clock";
import Controls from "./Controls";
import { PauseIcon, PlayIcon } from "./Icons";

const LONG_BREAK_INTERVAL = 4;

const modesTimes = {
  rest: 5,
  work: 25,
  longRest: 15,
};

const [MODE_REST, MODE_WORK, MODE_LONG_REST] = ["rest", "work", "longRest"];

export default function Timer() {
  const [isActive, setIsActive] = useState(false);
  const { currentMode, setCurrentMode, colorMode } = useContext(ModeContext);
  const [remainingTime, setRemainingTime] = useState({
    total: modesTimes[currentMode] * 60,
    minutes: modesTimes[currentMode],
    seconds: 0,
  });
  const [resetCountAnimationKey, setResetCountAnimationKey] = useState(0);

  const [session, setSession] = useState(0);

  const minutes = remainingTime.minutes;
  const seconds = remainingTime.seconds;

  const { endWorkSound, endPauseSound } = useSounds();

  const interval = useRef();

  const calculateProgressSeconds = useCallback(() => {
    if (currentMode === MODE_WORK) return 1500;
    if (currentMode === MODE_REST) return 300;
    if (currentMode === MODE_LONG_REST) return 900;
  }, [currentMode]);

  function showCurrentMode() {
    if (currentMode === MODE_WORK) return "FOCUS";
    if (currentMode === MODE_REST) return "BREAK";
    if (currentMode === MODE_LONG_REST) return "LONG BREAK";
  }

  const increaseSession = useCallback(() => {
    setSession((current) => current + 1);
  }, []);

  function resetTimer() {
    setIsActive(false);

    setRemainingTime({
      total: modesTimes[currentMode] * 60,
      minutes: modesTimes[currentMode],
      seconds: 0,
    });
    setResetCountAnimationKey(resetCountAnimationKey + 1);
  }

  function handleStartStop() {
    setIsActive(!isActive);
  }

  function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());

    const difference = endTime - currentTime;

    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);

    return {
      total,
      minutes,
      seconds,
    };
  }
  console.log(session);

  const goToNextMode = useCallback(() => {
    if (currentMode === MODE_WORK) {
      increaseSession();
    }

    setIsActive(false);
    setResetCountAnimationKey(resetCountAnimationKey + 1);

    const isLongRest = (session * 1) % LONG_BREAK_INTERVAL === 0;

    let newMode;

    if (isLongRest && currentMode === MODE_WORK && session !== 0) {
      newMode = MODE_LONG_REST;
      document.title = "🥣 Long Break";
      endWorkSound.play();
    } else if (currentMode === MODE_WORK) {
      newMode = MODE_REST;
      document.title = "🧘🏾‍♀️ Break";
      endWorkSound.play();
    } else {
      newMode = MODE_WORK;
      document.title = "🍅 Focus";
      endPauseSound.play();
    }

    setRemainingTime({
      total: modesTimes[newMode] * 60,
      minutes: modesTimes[newMode],
      seconds: 0,
    });

    setCurrentMode(newMode);
  }, [
    resetCountAnimationKey,
    currentMode,
    endPauseSound,
    endWorkSound,
    increaseSession,
    session,
    setCurrentMode,
  ]);

  // handle timer
  useEffect(() => {
    const { total } = remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;

    if (isActive) {
      interval.current = setInterval(() => {
        const remainingTime = getRemainingTime(endTime);

        setRemainingTime(remainingTime);

        // When the time ends, switch to the next mode
        if (total <= 0) {
          clearInterval(interval.current);
          setIsActive(false);
          goToNextMode();
        }
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [
    isActive,
    currentMode,
    calculateProgressSeconds,
    remainingTime,
    goToNextMode,
  ]);

  return (
    <div className="w-fit mx-auto flex items-center flex-1 pb-10">
      <div>
        <h2 className="mx-auto w-fit mb-4 font-extrabold dark:text-white text-slate-700 font-inter text-lg">
          {showCurrentMode()}
        </h2>
        <Clock
          seconds={calculateProgressSeconds()}
          playState={isActive ? "running" : "paused"}
          modeColor={colorMode}
          resetAnimation={resetCountAnimationKey.toString()}
        />

        <h1 className="mx-auto w-fit font-extrabold mt-8 dark:text-white font-inter text-2xl text-slate-700 ">
          {`${minutes}`.padStart(2, "0")}:{`${seconds}`.padStart(2, "0")}
        </h1>
        <h3 className=" text-slate-700 mx-auto w-fit font-extrabold mt-4 dark:text-white font-inter text-lg">{`#${session}`}</h3>

        <Controls
          style={{ opacity: isActive ? 1 : 0.1 }}
          onResetClick={resetTimer}
          onStartClick={handleStartStop}
          onNextClick={goToNextMode}
          icon={isActive ? <PauseIcon /> : <PlayIcon />}
        />
      </div>
    </div>
  );
}
