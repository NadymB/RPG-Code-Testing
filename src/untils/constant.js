export const HEIGHT_POINT_ELEMENT = 34;

export const GAME_STATUS = Object.freeze({
  DEFAULT: "default",
  WIN: "win",
  LOST: "lost",
});

export const convertKeyToNumber = (value) => {
  return Number(Object.keys(value));
};

export const handleGameStatus = (status) => {
  switch (status) {
    case GAME_STATUS.WIN:
      return { text: "All cleared", color: "text-green-400" };
    case GAME_STATUS.LOST:
      return { text: "Game over", color: "text-red-400" };
    default:
      return { text: "Let's play", color: "text-black" };
  }
};

export const convertTimeToSecond = (value) => {
  return `${Number(value / 10).toFixed(1)}s`;
};
