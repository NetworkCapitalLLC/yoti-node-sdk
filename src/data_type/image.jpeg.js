import Image from './image.js';

/**
 * Image JPEG attribute value.
 */
export default class ImageJpeg extends Image {
  constructor(value) {
    super(value, 'image/jpeg');
  }
}
