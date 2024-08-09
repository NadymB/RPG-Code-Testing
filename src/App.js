import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { PointList } from "./components/PointList";
import {
  convertKeyToNumber,
  GAME_STATUS,
  handleGameStatus,
  HEIGHT_POINT_ELEMENT,
  convertTimeToSecond
} from "./untils/constant";

function App() {
  const [point, setPoint] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(true);
  const [pointList, setPointList] = useState([]);
  const [pointSelected, setPointSelected] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.DEFAULT);
  const [restart, setRestart] = useState(false);
  const pointRef = useRef();

  const handleChangePoint = (e) => {
    setPoint(e.target.value);
  };

  const handleRestart = (e) => {
    e.preventDefault();
    setPointList((prev) => {
      if(Number(prev.length) === Number(point)) {
        setRestart(!restart); 
      } 
      return Array.from({ length: point }, (_, index) => ({ [index]: true }))
    });
    setGameStatus(GAME_STATUS.DEFAULT);
    setSeconds(0);
    setPause(false);
  };

  const handleSelectedPoint = (point) => {
    let pointLength = pointList.length;
    let curPoint = Number(point);

    setPointSelected((prev) => {
      if (curPoint - prev === 1 && curPoint <= pointLength) {
        setPointList((prev) =>
          prev.map((item) =>
            convertKeyToNumber(item) === curPoint - 1
              ? { [curPoint - 1]: !item }
              : item
          )
        );

        if (curPoint === pointLength) {
          setGameStatus(GAME_STATUS.WIN);
          setPause(true);
          setPointList([]);
          
          return 0;
        }
        return curPoint;
      } else {
        setGameStatus(GAME_STATUS.LOST);
        setPause(true);
        
        return 0;
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pause && pointList.length > 0) {
        setSeconds((prev) => prev + 1);
      }
    }, 60);

    return () => clearInterval(timer);
  });

  useLayoutEffect(() => {
    let offsetWidthPoint = Number(pointRef.current.offsetWidth);
    let offsetHeightPoint = Number(pointRef.current.offsetHeight);
    const node = document.getElementsByClassName("point-item");

    for (let i = 0; i < point; i++) {
      if (node[i] !== undefined) {
        node[i].style.cssText = `top: ${
          Math.random() * (offsetHeightPoint - HEIGHT_POINT_ELEMENT)
        }px; left: ${
          Math.random() * (offsetWidthPoint - HEIGHT_POINT_ELEMENT)
        }px; z-index: ${point - i}`;
      }
    }
  }, [point, pointList.length, restart]);

  return (
    <main className="h-screen flex justify-center items-center p-4">
      <form className="flex flex-col gap-2 h-full w-full md:w-4/5 xl:w-1/2 p-4 border border-black">
        <h3
          className={`font-bold text-xl uppercase ${
            handleGameStatus(gameStatus).color
          }`}
        >
          {handleGameStatus(gameStatus).text}
        </h3>
        <div className="flex">
          <span className="w-40">Points:</span>
          <input
            type="number"
            min={0}
            className="pl-1 border border-black rounded outline-none"
            onChange={handleChangePoint}
            value={point}
          />
        </div>
        <div className="flex">
          <span className="w-40">Time:</span>
          <span>{convertTimeToSecond(seconds)}</span>
        </div>
        <button
          className="w-fit px-6 rounded border border-black bg-gray-200 hover:bg-green-400"
          onClick={handleRestart}
        >
          Restart
        </button>
        <PointList
          ref={pointRef}
          _onClick={handleSelectedPoint}
          data={pointList}
          pointSelected={pointSelected}
          disabledPoint={gameStatus === GAME_STATUS.LOST}
        />
      </form>
    </main>
  );
}

export default App;
