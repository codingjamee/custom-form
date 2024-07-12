/**  @jsx createElement */

import Main from "../main";

const prevVdom = { DOM: {} };

export function createDOM(node) {
  console.log({ node, tag: node.tag, type: typeof node });
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  if (typeof node === "number") {
    return document.createTextNode(node.toString());
  }

  if (typeof node.tag === "function") {
    console.log(node.tag);
    const componentVNode = node.tag(node.props);
    return createDOM(componentVNode);
  }

  const element = document.createElement(node.tag);

  if (node.props)
    Object.entries(node.props).forEach(([name, value]) => {
      if (typeof value === "function") {
        console.log(value);
        const type = name.split("on")[1].toLowerCase();
        element.addEventListener(type, value);
      }
      if (name === "style" && typeof value === "object") {
        Object.entries(value).forEach(([styleName, styleValue]) => {
          element.style[styleName] = styleValue;
        });
      } else {
        element.setAttribute(name, value);
      }
    });

  node.children?.map(createDOM).forEach(element.appendChild.bind(element));

  return element;
}

export function createElement(tag, props, ...children) {
  props = props || {};

  return { tag, props, children };
}

export const React = () => {
  let dom = null;
  let target = null;

  function render(vdom, container) {
    dom = vdom;
    target = container;

    _render(vdom, container);
  }

  function _render(vdom, container) {
    container.appendChild(createDOM(vdom));
    prevVdom.DOM = createDOM(vdom);
  }

  return { render, target };
};

export function useState(initialState) {
  let state;
  if (!state) state = initialState;

  const setState = (mutate) => {
    if (typeof mutate === "function") {
      state = mutate(state);
    } else {
      state = mutate;
    }
    updateElement(React().target, React().render, prevVdom.DOM);
  };
  return [state, setState];
}

export function updateElement(parent, newNode, oldNode) {
  if (!newNode && oldNode) {
    if (oldNode.parentNode) {
      oldNode.parentNode.removeChild(oldNode);
    }
    return oldNode.remove();
  }
  if (newNode && !oldNode) return parent.appendChild(newNode);
  if (newNode instanceof Text && oldNode instanceof Text) {
    if (oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }
  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);
    if (oldNode.parentNode) {
      oldNode.parentNode.removeChild(oldNode);
    }
    console.log(parent, newNode);
    parent.appendChild(newNode, index);
    return;
  }
  updateAttributes(oldNode, newNode);

  const newChildren = [...newNode.childNodes];
  const oldChildren = [...oldNode.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}

function updateAttributes(oldNode, newNode) {
  const oldProps = newNode.props || {};
  const newProps = oldNode.props || {};

  // 달라지거나 추가된 Props를 반영
  for (const [name, value] of Object.entries(newProps)) {
    if (value !== oldProps[name]) {
      oldNode.setAttribute(name, value);
    }
  }
  for (const name in oldProps) {
    if (!(name in newProps)) {
      oldNode.removeAttribute(name);
    }
  }
}
