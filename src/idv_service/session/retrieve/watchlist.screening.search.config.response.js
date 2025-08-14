import { Validation } from '../../../yoti_common/validation.js';
import WatchlistSearchConfigResponse from './watchlist.search.config.response.js';

class WatchlistScreeningSearchConfigResponse extends WatchlistSearchConfigResponse {
  constructor(searchConfig) {
    super();

    if (searchConfig.categories) {
      Validation.isArrayOfStrings(searchConfig.categories, 'categories');
      /** @private */
      this.categories = searchConfig.categories;
    } else {
      /** @private */
      this.categories = [];
    }
  }

  /**
   * @returns {string[]}
   */
  getCategories() {
    return this.categories;
  }
}

export default WatchlistScreeningSearchConfigResponse;
