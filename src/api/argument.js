class Argument {
  constructor(name, type, required = false, description = null, exampleValue = null, itemType = undefined) {
    this.name = name;
    this.type = type;
    this.required = required;
    this.description = description;
    this.exampleValue = exampleValue || type.example;
    this.itemType = itemType;
  }
}

module.exports = {
  Argument,
};
