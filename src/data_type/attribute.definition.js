import Validation from '../yoti_common/validation.js';

class AttributeDefinition {
  constructor(name) {
    Validation.isString(name, 'name');

    /** @private */
    this.name = name;
  }

  getName() {
    return this.name;
  }

  toJSON() {
    return {
      name: this.name,
    };
  }
}

export default AttributeDefinition;
