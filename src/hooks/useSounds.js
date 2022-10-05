export default function useSounds() {
  const endWorkSound =
    typeof Audio !== "undefined" ? new Audio("sounds/endWork.mp3") : undefined;

  const endPauseSound =
    typeof Audio !== "undefined" ? new Audio("sounds/endPause.mp3") : undefined;

  return {
    endWorkSound,
    endPauseSound,
  };
}
