/**  @jsx createElement */
import App from "./App.jsx";
import { react, createElement } from "./core/react.js";
import "./main.css";

const Main = () => {
  return (
    <div class="main">
      text
      <App />
    </div>
  );
};

const root = document.querySelector("#root");
console.log(Main);
react.render(Main, root);

export default Main;
