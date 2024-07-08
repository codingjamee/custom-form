import { createDOM, render, createElement } from "./core/react.js";

/**  @jsx createElement */
const App = <div>hello</div>;

console.log(App);

const root = document.querySelector("#root");
render(App, root);

/**
 * 
 * {
    "tag": "div",
    "props": {},
    "children": [
        "hello"
    ]
}
 */
