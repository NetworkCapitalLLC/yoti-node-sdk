import MediaResponse from './media.response.js';

class FrameResponse {
  constructor(frame) {
    if (frame.media) {
      /** @private */
      this.media = new MediaResponse(frame.media);
    }
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

export default FrameResponse;
