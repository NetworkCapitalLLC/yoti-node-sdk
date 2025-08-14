import MediaResponse from './media.response.js';

class FaceMapResponse {
  constructor(facemap) {
    if (facemap.media) {
      /** @private */
      this.media = new MediaResponse(facemap.media);
    }
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

export default FaceMapResponse;
