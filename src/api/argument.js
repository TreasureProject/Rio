class Argument {
  constructor(name, type, required = false) {
    this.name = name;
    this.type = type;
    this.required = required;
  }
}

module.exports = {
  Argument,
};
