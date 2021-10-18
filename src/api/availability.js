class Availability {
  constructor(name) {
    this.name = name;
  }
}

Availability.public = new Availability('public');
Availability.private = new Availability('private');
Availability.thirdParty = new Availability('thirdParty');

module.exports = {
  Availability,
};
