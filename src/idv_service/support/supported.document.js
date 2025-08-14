import { Validation } from '../../yoti_common/validation.js';

class SupportedDocument {
  constructor(document) {
    Validation.isString(document.type, 'type', true);
    /** @private */
    this.type = document.type;

    Validation.isBoolean(document.is_strictly_latin, 'is_strictly_latin', true);
    /** @private */
    this.isStrictlyLatin = document.is_strictly_latin;
  }

  /**
   *
   * @return {string|undefined}
   */
  getType() {
    return this.type;
  }

  /**
   *
   * @return {boolean|undefined}
   */
  getIsStrictlyLatin() {
    return this.isStrictlyLatin;
  }
}

export default SupportedDocument;
