import types from '../types.js';
const { MultiValue } = types;

export default {
  /**
   * @typedef {{data: Buffer, contentType: number}} Value
   *
   * @param {Uint8Array} value
   * @returns {{values: Value[]}}
   */
  decodeMultiValue(value) {
    return /** {{values: Value[]}} */ (/** @type {*} */(MultiValue.decode(value)));
  },
}
