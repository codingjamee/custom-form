/**  @jsx createElement */
import { createDOM, createElement, useState } from "./core/react.js";
import Input from "./Input.jsx";

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
    <div class="app">
      <div class="title">
        <div class="edge"></div>
        <div>Survey</div>
        <div class="email">
          <div>test@gmail.com</div>
          <div class="blue">계정전환</div>
        </div>
        <div class="required">* 표시는 필수 질문임</div>
      </div>
      <form class="form" onSubmit={onClickNext}>
        <Input />
        <div>{value}</div>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default App;
