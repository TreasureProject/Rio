class Status {
  constructor(name) {
    this.name = name;
  }
}

Status.deprecated = new Status('deprecated');
Status.preview = new Status('preview');
Status.live = new Status('live');

module.exports = {
  Status,
};
