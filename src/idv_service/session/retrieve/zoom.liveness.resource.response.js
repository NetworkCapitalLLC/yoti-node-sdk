import LivenessResourceResponse from './liveness.resource.response.js';
import FrameResponse from './frame.response.js';
import FaceMapResponse from './face.map.response.js';
import { Validation } from '../../../yoti_common/validation.js';

class ZoomLivenessResourceResponse extends LivenessResourceResponse {
  constructor(resource) {
    super(resource);

    if (resource.facemap) {
      /** @private */
      this.faceMap = new FaceMapResponse(resource.facemap);
    }

    if (resource.frames) {
      Validation.isArray(resource.frames, 'frames');
      /** @private */
      this.frames = resource.frames.map((frame) => new FrameResponse(frame));
    } else {
      /** @private */
      this.frames = [];
    }
  }

  /**
   * @returns {FaceMapResponse}
   */
  getFaceMap() {
    return this.faceMap;
  }

  /**
   * @returns {FrameResponse[]}
   */
  getFrames() {
    return this.frames;
  }
}

export default ZoomLivenessResourceResponse;
