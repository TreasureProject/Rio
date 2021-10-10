class ArgumentType {
  constructor(name) {
    this.name = name;
  }
}
ArgumentType.String = new ArgumentType('string');
ArgumentType.Integer = new ArgumentType('integer');

module.exports = {
  ArgumentType,
};
