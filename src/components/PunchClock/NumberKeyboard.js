import React from "react";

const NumberKeyboard = ({ onKeyPress }) => {
  return (
    <div className="number-keyboard">
      <div className="flex-x bottom-border">
        <div
          className="flex-1 key-button right-border"
          onClick={() => onKeyPress(1)}
        >
          1
        </div>
        <div
          className="flex-1 key-button right-border"
          onClick={() => onKeyPress(2)}
        >
          2
        </div>
        <div className="flex-1 key-button" onClick={() => onKeyPress(3)}>
          3
        </div>
      </div>
      <div className="flex-x bottom-border">
        <div
          className="flex-1 key-button right-border"
          onClick={() => onKeyPress(4)}
        >
          4
        </div>
        <div
          className="flex-1 key-button right-border"
          onClick={() => onKeyPress(5)}
        >
          5
        </div>
        <div className="flex-1 key-button" onClick={() => onKeyPress(6)}>
          6
        </div>
      </div>
      <div className="flex-x bottom-border">
        <div
          className="flex-1 key-button right-border"
          onClick={() => onKeyPress(7)}
        >
          7
        </div>
        <div
          className="flex-1 key-button right-border"
          onClick={() => onKeyPress(8)}
        >
          8
        </div>
        <div className="flex-1 key-button" onClick={() => onKeyPress(9)}>
          9
        </div>
      </div>
      <div className="flex-x">
        <div
          className="flex-1 key-button right-border"
          onClick={() => onKeyPress("clear")}
        >
          Clear
        </div>
        <div
          className="flex-1 key-button right-border"
          onClick={() => onKeyPress(0)}
        >
          0
        </div>
        <div className="flex-1 key-button" onClick={() => onKeyPress("delete")}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default NumberKeyboard;
