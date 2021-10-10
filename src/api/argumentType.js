class ArgumentType {
  constructor(name) {
    this.name = name;
  }
}
ArgumentType.String = new ArgumentType('string');
ArgumentType.Integer = new ArgumentType('integer');
ArgumentType.Float = new ArgumentType('float');
ArgumentType.Array = new ArgumentType('array');
ArgumentType.Boolean = new ArgumentType('boolean');

const format = {};

format.string = (str) => {
  if (str == null) {
    return null;
  }
  return str.toString();
};

format.Int = (data) => {
  if (typeof data === 'number') {
    if (data % 1 === 0) {
      return data;
    }
    return 0;
  }
  const num = parseInt(data, 10);
  if (num == null || Number.isNaN(num)) return null;
  return num;
};

format.Float = (data) => {
  if (typeof data === 'number') {
    return data;
  }
  return parseFloat(data) || 0;
};

format.Array = (arr) => {
  let array;
  try {
    array = JSON.parse(arr);
  } catch (e) {
    array = null;
  }
  return array;
};

format.Boolean = (bool) => {
  const string = format.String(bool);
  if (string == null) {
    return null;
  }
  return string === 'true' || string === 'True';
};

module.exports = {
  ArgumentType,
  format,
};
