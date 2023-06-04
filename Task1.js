// //Задача №1

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "application/xml");

function parseXMLToJS(xml) {
  const result = [];

  const parseNode = (node) => {
    const obj = {};
    const childNodes = node.childNodes;

    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i];

      if (childNode.nodeType === Node.ELEMENT_NODE) {
        const nodeName = childNode.nodeName;
        const parsedChild = parseNode(childNode);

        if (childNode.hasAttributes()) {
          const attributes = childNode.attributes;
          for (let j = 0; j < attributes.length; j++) {
            const attr = attributes[j];
            obj[attr.name] = attr.value;
          }
        }

        if (obj.hasOwnProperty(nodeName)) {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(parsedChild);
        } else {
          obj[nodeName] = parsedChild;
        }
      } else if (childNode.nodeType === Node.TEXT_NODE) {
        const textValue = childNode.nodeValue.trim();
        if (textValue) {
          obj.value = textValue;
        }
      }
    }
    return obj;
  };

  const rootNode = xml.documentElement;
  const childNodes = rootNode.childNodes;

  for (let i = 0; i < childNodes.length; i++) {
    const childNode = childNodes[i];
    if (childNode.nodeType === Node.ELEMENT_NODE) {
      result.push(parseNode(childNode));
    }
  }

  return result;
}

const jsObject = parseXMLToJS(xmlDoc);
console.log(jsObject);
