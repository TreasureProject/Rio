class Argument {
  constructor(name, type, required = false, description = null, exampleValue = null) {
    this.name = name;
    this.type = type;
    this.required = required;
    this.description = description;
    this.exampleValue = exampleValue || type.example;
  }
}

module.exports = {
  Argument,
};
