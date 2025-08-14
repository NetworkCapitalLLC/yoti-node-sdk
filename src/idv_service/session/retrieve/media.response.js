import { Validation } from '../../../yoti_common/validation.js';
import { YotiDate } from '../../../data_type/date.js';

class MediaResponse {
  constructor(media) {
    Validation.isString(media.id, 'id', true);
    /** @private */
    this.id = media.id;

    Validation.isString(media.type, 'type', true);
    /** @private */
    this.type = media.type;

    if (media.created) {
      Validation.isString(media.created, 'created');
      /** @private */
      this.created = YotiDate.fromDateString(media.created);
    }

    if (media.last_updated) {
      Validation.isString(media.last_updated, 'last_updated');
      /** @private */
      this.lastUpdated = YotiDate.fromDateString(media.last_updated);
    }
  }

  /**
   * @returns {string}
   */
  getId() {
    return this.id;
  }

  /**
   * @returns {string}
   */
  getType() {
    return this.type;
  }

  /**
   * @returns {YotiDate}
   */
  getCreated() {
    return this.created;
  }

  /**
   * @returns {YotiDate}
   */
  getLastUpdated() {
    return this.lastUpdated;
  }
}

export default MediaResponse;
