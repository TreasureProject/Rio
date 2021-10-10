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
ArgumentType.Map = new ArgumentType('map');

module.exports = {
  ArgumentType,
};
