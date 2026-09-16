function getInnerHTMLIncludingShadow(root) {
  function serialize(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return '';
    }

    const el = node;
    let html = `<${el.tagName.toLowerCase()}`;

    for (const attr of el.attributes) {
      html += ` ${attr.name}="${attr.value.replace(/"/g, '&quot;')}"`;
    }

    html += '>';

    if (el.shadowRoot) {
      html += Array.from(el.shadowRoot.childNodes)
        .map(serialize)
        .join('');
    }

    html += Array.from(el.childNodes)
      .map(serialize)
      .join('');

    html += `</${el.tagName.toLowerCase()}>`;
    return html;
  }

  return Array.from(root.childNodes).map(serialize).join('');
}