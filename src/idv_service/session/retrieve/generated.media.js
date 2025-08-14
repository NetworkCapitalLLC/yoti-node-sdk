import { Validation } from '../../../yoti_common/validation.js';

class GeneratedMedia {
  constructor(media) {
    Validation.isString(media.id, 'id', true);
    /** @private */
    this.id = media.id;

    Validation.isString(media.type, 'type', true);
    /** @private */
    this.type = media.type;
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

export default GeneratedMedia;
