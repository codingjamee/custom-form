/**  @jsx createElement */
import App from "./App.jsx";

import { render, createElement } from "./core/react.js";

const Main = () => {
  return (
    <div
      style={{
        width: "600px",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <App />
    </div>
  );
};

const root = document.querySelector("#root");
render(<Main />, root);

export default Main;
