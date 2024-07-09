/**  @jsx createElement */
import { createDOM, render, createElement, useState } from "./core/react.js";
import CheckBoxInput from "./common/CheckBoxInput.jsx";
import RadioInput from "./common/RadioInput.jsx";

const App = () => {
  const [value, setValue] = useState(1);
  console.log(value);

  const onClickNext = (e) => {
    e.preventDefault();
    console.log("다음 클릭됨");
    setValue((prev) => {
      console.log(prev);
      return prev + 1;
    });
    console.log(value);
  };

  return (
    <form onSubmit={onClickNext}>
      <RadioInput />
      <CheckBoxInput />
      <div style={{width: '300px', height: '300px'}}>{value}</div>
      <button type="submit">제출</button>
    </form>
  );
};

export default App;
