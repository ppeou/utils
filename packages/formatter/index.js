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
