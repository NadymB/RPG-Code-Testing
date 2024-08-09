import { forwardRef } from "react";
import { convertKeyToNumber } from "../untils/constant";

export const PointList = forwardRef(({ data, _onClick, disabledPoint }, ref) => {
  return (
    <div
      ref={ref}
      className="relative h-full border border-black"
    >
      {data.length > 0 &&
        data.map((item, index) => {
          const pointIndex = convertKeyToNumber(item) + 1;
          
          return (
            <button
              key={index}
              className={`point-item absolute ${
                item[index] ? "bg-white opacity-100" : "bg-red-400 opacity-0"
              } transition-opacity duration-1000 ease-in-out flex items-center justify-center w-8 h-8 rounded-full border border-black font-medium ${
                !disabledPoint && "hover:bg-red-400 cursor-pointer"
              }`}
              onClick={(e) => {
                e.preventDefault();
                _onClick(pointIndex);
              }}
              disabled={disabledPoint}
            >
              {pointIndex}
            </button>
          );
        })}
    </div>
  );
});
