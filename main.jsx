import { createDOM, render, createElement } from "./core/react.js";

/**  @jsx createElement */
const App = <div style={{ width: "200px", height: "200px", backgroundColor: 'white', color: 'black' }}>hello</div>;

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
