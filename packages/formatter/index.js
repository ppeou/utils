const creator = ({ format, mapper } = {}) => {
  if (!format || !mapper) {
    return templateData =>
      (templateData === null || templateData === undefined
        ? ""
        : templateData
      ).toString();
  }

  const fields = Object.keys(mapper).map(c => `${mapper[c]} = ''`);

  const fm = Object.keys(mapper).reduce((p, c) => {
    return p.replace(new RegExp(c, "g"), `\${${mapper[c]}}`);
  }, format);

  return new Function(`{${fields.join(",")}}`, "return `" + fm + "`;");
};
export default creator;
//module.exports = creator;


//another implementation
function create(template) {
  const fields = template.match(/\$\{\w+\}/g).map(v => v.match(/\w+/)[0]);
  return new Function(`{${fields.join(",")}}`, "return `" + template + "`;");
}

const t3Closure = create("I'm ${name}. I'm almost ${age} years old.");
console.log(t3Closure({ name: "MDN", age: 30 })); // I'm MDN. I'm almost 30 years old.
