class ArgumentType {
  constructor(name, example = null) {
    this.name = name;
    this.example = example;
  }
}
ArgumentType.String = new ArgumentType('string', 'A');
ArgumentType.Integer = new ArgumentType('integer', 1);
ArgumentType.Float = new ArgumentType('float', 1.23);
ArgumentType.Array = new ArgumentType('array', []);
ArgumentType.Boolean = new ArgumentType('boolean', true);
ArgumentType.Map = new ArgumentType('map', {});

module.exports = {
  ArgumentType,
};
