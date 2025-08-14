import { Validation } from '../../../yoti_common/validation.js';
import GeneratedCheckResponse from './generated.check.response.js';
import GeneratedTextDataCheckResponse from './generated.text.data.check.response.js';
import GeneratedSupplementaryDocumentTextDataCheckResponse from './generated.supplementary.document.text.data.check.response.js';
import GeneratedMedia from './generated.media.js';
import IDVConstants from '../../idv.constants.js';
import { YotiDate } from '../../../data_type/date.js';

class TaskResponse {
  constructor(task) {
    Validation.isString(task.type, 'type', true);
    /** @private */
    this.type = task.type;

    Validation.isString(task.id, 'id', true);
    /** @private */
    this.id = task.id;

    Validation.isString(task.state, 'state', true);
    /** @private */
    this.state = task.state;

    if (task.created) {
      Validation.isString(task.created, 'created');
      /** @private */
      this.created = YotiDate.fromDateString(task.created);
    }

    if (task.last_updated) {
      Validation.isString(task.last_updated, 'last_updated');
      /** @private */
      this.lastUpdated = YotiDate.fromDateString(task.last_updated);
    }

    if (task.generated_checks) {
      Validation.isArray(task.generated_checks, 'generated_checks');
      /** @private */
      this.generatedChecks = task.generated_checks
        .map((check) => {
          switch (check.type) {
            case IDVConstants.ID_DOCUMENT_TEXT_DATA_CHECK:
              return new GeneratedTextDataCheckResponse(check);
            case IDVConstants.SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK:
              return new GeneratedSupplementaryDocumentTextDataCheckResponse(check);
            default:
              return new GeneratedCheckResponse(check);
          }
        });
    } else {
      /** @private */
      this.generatedChecks = [];
    }

    if (task.generated_media) {
      Validation.isArray(task.generated_media, 'generated_media');
      /** @private */
      this.generatedMedia = task.generated_media.map((media) => new GeneratedMedia(media));
    } else {
      /** @private */
      this.generatedMedia = [];
    }
  }

  /**
   * @returns {string}
   */
  getType() {
    return this.type;
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
  getState() {
    return this.state;
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

  /**
   * @returns {GeneratedCheckResponse[]}
   */
  getGeneratedChecks() {
    return this.generatedChecks;
  }

  /**
   * @deprecated this method is now implemented on subclasses.
   *
   * @returns {GeneratedTextDataCheckResponse[]}
   */
  getGeneratedTextDataChecks() {
    return this
      .getGeneratedChecks()
      .filter((check) => check instanceof GeneratedTextDataCheckResponse);
  }

  /**
   * @returns {GeneratedMedia[]}
   */
  getGeneratedMedia() {
    return this.generatedMedia;
  }
}

export default TaskResponse;
