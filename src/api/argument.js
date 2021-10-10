class Argument {
  constructor(name, type, required = false, description = null) {
    this.name = name;
    this.type = type;
    this.required = required;
    this.description = description;
  }
}

module.exports = {
  Argument,
};
