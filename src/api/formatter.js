const formatter = {};

formatter.String = (str) => {
  if (str == null) {
    return null;
  }
  return str.toString();
};

formatter.Int = (data) => {
  if (typeof data === 'number') {
    if (data % 1 === 0) {
      return data;
    }
    return Math.round(data);
  }
  const num = parseInt(data, 10);
  if (num == null || Number.isNaN(num)) return null;
  return num;
};

formatter.Float = (data) => {
  if (typeof data === 'number') {
    return data;
  }
  return parseFloat(data) || 0;
};

formatter.Array = (arr) => {
  if (Array.isArray(arr)) {
    return arr;
  }

  let array;
  try {
    array = JSON.parse(arr);
  } catch (e) {
    array = null;
  }
  return array;
};

formatter.Boolean = (bool) => {
  const string = formatter.String(bool);
  if (string == null) {
    return null;
  }
  return string === 'true' || string === 'True';
};

formatter.Map = (val) => typeof val === 'object' && val !== null;

module.exports = {
  formatter,
};
