/**  @jsx createElement */
import { createElement } from "./core/react.js";
import CheckBoxInput from "./common/CheckBoxInput";
import RadioInput from "./common/RadioInput";

const Input = () => {
  return (
    <div class="input">
      <RadioInput />
      <CheckBoxInput />
    </div>
  );
};

export default Input;
