import { messages } from '../../proto/index.js';
import { YotiDate } from '../../data_type/date.js';
import AttributeIssuanceDetails from '../../data_type/attribute.issuance.details.js';
import AttributeDefinition from '../../data_type/attribute.definition.js';

class ThirdPartyAttributeConverter {
  static convertThirdPartyAttribute(protoBytes) {
    let thirdPartyProto;
    try {
      thirdPartyProto = messages.decodeThirdPartyAttribute(protoBytes);
    } catch (err) {
      console.log(`Failed to load ThirdPartyAttribute: ${err}`);
      return undefined;
    }

    const token = thirdPartyProto.issuanceToken.toString('base64');
    if (!token || token === '') {
      console.log('Failed to retrieve token from ThirdPartyAttribute');
      return undefined;
    }

    const issuingAttributes = thirdPartyProto.issuingAttributes;

    let expiryDate;
    let attributes;

    if (issuingAttributes) {
      try {
        const tmpExpiryDate = issuingAttributes.expiryDate;
        expiryDate = YotiDate.fromDateString(tmpExpiryDate);
      } catch (err) {
        console.log(`Failed to retrieve/parse expiryDate from ThirdPartyAttribute: ${err}`);
      }
      attributes = issuingAttributes.definitions.map((a) => new AttributeDefinition(a.name));
    }

    return new AttributeIssuanceDetails(token, expiryDate, attributes);
  }
}

export default ThirdPartyAttributeConverter;
