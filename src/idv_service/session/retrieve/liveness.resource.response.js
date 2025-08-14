import ResourceResponse from './resource.response.js';
import { Validation } from '../../../yoti_common/validation.js';

class LivenessResourceResponse extends ResourceResponse {
  constructor(resource) {
    super(resource);

    Validation.isString(resource.liveness_type, 'liveness_type', true);
    /** @private */
    this.livenessType = resource.liveness_type;
  }

  /**
   * @returns {string}
   */
  getLivenessType() {
    return this.livenessType;
  }
}

export default LivenessResourceResponse;
