/**  @jsx createElement */

const prevVdom = { DOM: {} };

export function createDOM(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  if (typeof node === "number") {
    return document.createTextNode(node.toString());
  }

  if (typeof node.tag === "function") {
    const componentVNode = node.tag(node.props);
    return createDOM(componentVNode);
  }

  const element = document.createElement(node.tag);

  if (node.props)
    Object.entries(node.props).forEach(([name, value]) => {
      if (typeof value === "function") {
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

function React() {
  let dom = null;
  let target = null;
  let state;

  function _render(vdom, container) {
    console.log({ vdom, container });
    const virtualDom = createElement(vdom);
    if (container) container.appendChild(createDOM(virtualDom));
    prevVdom.DOM = vdom;
  }

  this.render = function (vdom, container) {
    if (vdom) {
      dom = vdom;
    }
    if (container) {
      target = container;
    }

    _render(dom, target);
  };

  this.useState = function (initialState) {
    if (!state) state = initialState;

    const setState = (mutate) => {
      if (typeof mutate === "function") {
        state = mutate(state);
      } else {
        state = mutate;
      }
      updateElement(target, dom, prevVdom.DOM);
    };
    return [state, setState];
  };
}

export const react = new React();

export function updateElement(parent, newNode, oldNode) {
  console.log(parent);
  console.log(newNode);
  console.log(oldNode);
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
    const parentNodes = [...parent.childNodes];
    console.log(parentNodes);
    const index = parentNodes.indexOf(oldNode);
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
