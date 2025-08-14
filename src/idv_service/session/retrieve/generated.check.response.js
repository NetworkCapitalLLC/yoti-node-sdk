import { Validation } from '../../../yoti_common/validation.js';

class GeneratedCheckResponse {
  constructor(check) {
    Validation.isString(check.id, 'id', true);
    /** @private */
    this.id = check.id;

    Validation.isString(check.type, 'type', true);
    /** @private */
    this.type = check.type;
  }

  /**
   * @returns {string}
   */
  getId() {
    return this.id;
  }

  /**
   * @returns {string}
   */
  getType() {
    return this.type;
  }
}

export default GeneratedCheckResponse;
