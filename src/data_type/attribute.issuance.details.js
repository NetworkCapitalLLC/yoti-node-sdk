import Validation from '../yoti_common/validation.js';
import AttributeDefinition from './attribute.definition.js';

class AttributeIssuanceDetails {
  /**
   * @param {string} token
   * @param {Date} [expiryDate]
   * @param {AttributeDefinition[]} [issuingAttributes]
   */
  constructor(token, expiryDate, issuingAttributes = []) {
    Validation.isString(token, 'token');
    /** @private */
    this.token = token;

    if (expiryDate !== undefined) {
      Validation.instanceOf(expiryDate, Date, 'expiryDate');
    }
    /** @private */
    this.expiryDate = expiryDate;

    Validation.isArrayOfType(issuingAttributes, AttributeDefinition, 'issuingAttributes');
    /** @private */
    this.issuingAttributes = issuingAttributes;
  }

  getToken() {
    return this.token;
  }

  getExpiryDate() {
    return this.expiryDate;
  }

  getIssuingAttributes() {
    return this.issuingAttributes;
  }
}

export default AttributeIssuanceDetails;
