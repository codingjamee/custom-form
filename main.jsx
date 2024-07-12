/**  @jsx createElement */
import App from "./App.jsx";
import { React, createElement } from "./core/react.js";
import "./main.css";

const Main = () => {
  return (
    <div class="main">
      <App />
    </div>
  );
};

const root = document.querySelector("#root");
React().render(Main, root);

export default Main;
