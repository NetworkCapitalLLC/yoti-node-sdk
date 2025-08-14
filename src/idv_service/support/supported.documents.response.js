import SupportedCountry from './supported.country.js';

class SupportedDocumentsResponse {
  constructor(response) {
    if (response.supported_countries) {
      /** @private */
      this.supportedCountries = response.supported_countries
        .map((country) => new SupportedCountry(country));
    } else {
      /** @private */
      this.supportedCountries = [];
    }
  }

  getSupportedCountries() {
    return this.supportedCountries;
  }
}

export default SupportedDocumentsResponse;
