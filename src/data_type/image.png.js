import Image from './image.js';

/**
 * Image PNG attribute value.
 */
export default class ImagePng extends Image {
  constructor(value) {
    super(value, 'image/png');
  }
}
