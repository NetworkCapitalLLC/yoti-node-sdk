import WatchlistScreeningSearchConfigResponse from './watchlist.screening.search.config.response.js';
import WatchlistSummaryResponse from './watchlist.summary.response.js';

class WatchlistScreeningSummaryResponse extends WatchlistSummaryResponse {
  constructor(summary) {
    super(summary);

    if (summary.search_config) {
      /** @private */
      this.searchConfig = new WatchlistScreeningSearchConfigResponse(summary.search_config);
    }
  }

  /**
   * @returns {WatchlistScreeningSearchConfigResponse}
   */
  getSearchConfig() {
    return this.searchConfig;
  }
}

export default WatchlistScreeningSummaryResponse;
