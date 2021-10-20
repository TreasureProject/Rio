class ArgumentType {
  constructor(name, example = null, oasType = null, oasFormat = null) {
    this.name = name;
    this.example = example;
    this.oasType = oasType;
    this.oasFormat = oasFormat;
  }
}
ArgumentType.String = new ArgumentType('string', 'A', 'string', null);
ArgumentType.Integer = new ArgumentType('integer', 1, 'integer', 'int64');
ArgumentType.Float = new ArgumentType('float', 1.23, 'number', 'double');
ArgumentType.Array = new ArgumentType('array', [], 'array', null);
ArgumentType.Boolean = new ArgumentType('boolean', true, 'boolean', null);
ArgumentType.Map = new ArgumentType('map', {}, 'object', null);

module.exports = {
  ArgumentType,
};
