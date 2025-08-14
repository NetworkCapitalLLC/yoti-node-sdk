import constants from '../constants.js';
import { messages } from '../../proto/index.js';
import { AgeVerification } from '../../data_type/age.verification.js';
import { DocumentDetails } from '../../data_type/document.details.js';
import Image from '../../data_type/image.js';
import ImageJpeg from '../../data_type/image.jpeg.js';
import ImagePng from '../../data_type/image.png.js';
import MultiValue from '../../data_type/multi.value.js';

const CONTENT_TYPE_STRING = 1;
const CONTENT_TYPE_JPEG = 2;
const CONTENT_TYPE_DATE = 3;
const CONTENT_TYPE_PNG = 4;
const CONTENT_TYPE_JSON = 5;
const CONTENT_TYPE_MULTI_VALUE = 6;
const CONTENT_TYPE_INT = 7;

export class AttributeConverter {
  static convertValueBasedOnAttributeName(value, name) {
    if (!value) {
      return null;
    }

    if (AgeVerification.isAttributeNameMatchingAgeVerification(name)) {
      return new AgeVerification(name, value);
    }

    switch (name) {
      case constants.ATTR_DOCUMENT_DETAILS:
        return new DocumentDetails(value);
      case constants.ATTR_DOCUMENT_IMAGES:
        if (!(value instanceof MultiValue)) {
          throw new Error('Document Images could not be decoded');
        }
        return value
          .allowInstance(Image)
          .getItems();
      default:
        return value;
    }
  }

  static convertValueBasedOnContentType(value, contentType) {
    if (
      !value
      || (contentType !== CONTENT_TYPE_STRING && !value.length)
    ) {
      throw new Error('Warning: value is NULL');
    }

    switch (contentType) {
      case CONTENT_TYPE_STRING: // STRING means the value is UTF-8 encoded text.
        return value.toString('utf8');
      case CONTENT_TYPE_DATE:
        return new Date(value);
      case CONTENT_TYPE_JSON: {
        const jsonString = value.toString('utf8');
        return JSON.parse(jsonString);
      }
      case CONTENT_TYPE_JPEG:
        return new ImageJpeg(value);
      case CONTENT_TYPE_PNG:
        return new ImagePng(value);
      case CONTENT_TYPE_MULTI_VALUE:
        return AttributeConverter.convertMultiValue(value);
      case CONTENT_TYPE_INT:
        return parseInt(value.toString('utf8'), 10);
      default:
        console.log(`Unknown Content Type '${contentType}', parsing as a String`);
        return value.toString('utf8');
    }
  }

  static convertMultiValue(value) {
    const protoMultiValue = /** @type {any} */ (messages.decodeMultiValue(value));
    const items = [];
    protoMultiValue.values.forEach((item) => {
      items.push(AttributeConverter.convertValueBasedOnContentType(
        item.data,
        item.contentType
      ));
    });
    return new MultiValue(items);
  }
}
