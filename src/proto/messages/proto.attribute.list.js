import types from '../types.js';
const { AttributeList } = types;

/**
 * @typedef {import('../types.js').Attribute} Attribute
 */

export default {

  /**
   * Decode all attributes.
   *
   * @param {Uint8Array} binaryData
   *
   * @returns {{attributes: Attribute[]}}
   */
  decodeAttributeList(binaryData) {
    const { attributes } = /** @type {{attributes: Attribute[]}} */ (
      /** @type {*} */(AttributeList.decode(binaryData)));
    return { attributes };
  },

  encodeAttributeList(attributesData) {
    return AttributeList.encode({ attributes: attributesData }).finish();
  },
}
