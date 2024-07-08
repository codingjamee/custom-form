export function createDOM(node) {
  console.log(node);
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  Object.entries(node.props).forEach(([name, value]) => {
    if (name === "style" && typeof value === "object") {
      Object.entries(value).forEach(([styleName, styleValue]) => {
        element.style[styleName] = styleValue;
      });
    } else {
      element.setAttribute(name, value);
    }
  });

  node.children.map(createDOM).forEach(element.appendChild.bind(element));

  return element;
}

export function createElement(tag, props, ...children) {
  props = props || {};

  return { tag, props, children };
}

export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}
