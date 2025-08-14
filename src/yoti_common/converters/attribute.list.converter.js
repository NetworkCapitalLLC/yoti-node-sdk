import { AttributeConverter } from './attribute.converter.js';
import { AnchorProcessor } from '../anchor.processor.js';

export class AttributeListConverter {
  static convertAttributeList(attributes = []) {
    const convertedAttributes = [];

    for (let i = 0; i < attributes.length; i += 1) {
      const attribute = attributes[i];
      const attrName = attribute.name;
      const attrValue = attribute.value;
      const attrType = attribute.contentType;
      const attrId = attribute.ephemeralId;
      const processedAnchors = AnchorProcessor.process(attribute.anchors);

      let attrData = null;
      try {
        const convertedValueByType = AttributeConverter
          .convertValueBasedOnContentType(attrValue, attrType);
        const convertedValueByName = AttributeConverter
          .convertValueBasedOnAttributeName(convertedValueByType, attrName);
        attrData = {
          name: attrName,
          value: convertedValueByName,
          sources: processedAnchors.sources,
          verifiers: processedAnchors.verifiers,
          anchors: processedAnchors,
          id: attrId,
        };
      } catch (err) {
        console.log(`${err.message} (Attribute: ${attrName})`);
      }
      convertedAttributes.push(attrData);
    }

    return convertedAttributes;
  }
}
