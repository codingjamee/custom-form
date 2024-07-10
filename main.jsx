/**  @jsx createElement */
import App from "./App.jsx";
import {
  render,
  createElement,
  updateElement,
  createDOM,
} from "./core/react.js";

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
render(<Main />, root)
// updateElement(root, createDOM(<Main />), createDOM(<Main />));

export default Main;

//왜 setState에서는 안되고, main.jsx에서는 될까? 