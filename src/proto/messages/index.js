import attributeList from './proto.attribute.list.js';
import multiValue from './proto.multi.value.js';
import encryptedData from './proto.common.encrypted-data.js';
import extraData from './proto.share.extra-data.js';
import thirdPartyAttribute from './proto.share.third-party-attribute.js';
import signedTimestamp from './proto.signed.timestamp.js';

export default {
  ...attributeList,
  ...multiValue,
  ...encryptedData,
  ...extraData,
  ...thirdPartyAttribute,
  ...signedTimestamp,
};
