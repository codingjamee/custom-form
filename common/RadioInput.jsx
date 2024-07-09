/**  @jsx createElement */
import { createElement, useState } from "../core/react.js";

const RadioInput = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        radio input <em style={{ color: "red" }}>*</em>
      </div>
      <div>
        <input type="radio" id="r-option1" name="radio-group" />
        <label for="r-option1">Option 1</label>
      </div>
      <div>
        <input type="radio" id="r-option2" name="radio-group" />
        <label for="r-option2">Option 2</label>
      </div>
      <div>
        <input type="radio" id="r-option3" name="radio-group" />
        <label for="r-option3">Option 3</label>
      </div>
    </div>
  );
};
export default RadioInput;
