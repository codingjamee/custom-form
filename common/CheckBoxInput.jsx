/**  @jsx createElement */
import { createElement } from "../core/react.js";

const CheckBoxInput = () => {
  return (
    <div>
      <div>
        checkbox input <em style={{ color: "red" }}>*</em>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <input type="checkbox" id="c-option1" name="checkbox-group" />
          <label for="c-option1">Option 1</label>
        </div>
        <div>
          <input type="checkbox" id="c-option2" name="checkbox-group" />
          <label for="c-option2">Option 2</label>
        </div>
        <div>
          <input type="checkbox" id="c-option3" name="checkbox-group" />
          <label for="c-option3">Option 3</label>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxInput;
