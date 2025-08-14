'use strict';

const { YotiResponse } = require('./response');
const yotiCommon = require('../yoti_common');

/**
 * Default HTTP request handler.
 * @typedef {import('./request').YotiRequest} YotiRequest
 *
 * @param {YotiRequest} yotiRequest
 * @param {boolean} buffer Return the response as a Buffer.
 *
 * @returns {Promise} Resolves {YotiResponse}
 */
module.exports.execute = async (yotiRequest, buffer = false) => {
  const url = yotiRequest.getUrl();
  const method = yotiRequest.getMethod();
  const headers = yotiRequest.getHeaders() || {};

  const requestCanSendPayload = yotiCommon.requestCanSendPayload(method);
  const payload = yotiRequest.getPayload();
  let body = null;

  if (requestCanSendPayload && payload) {
    body = payload.getPayloadData();
  }

  try {
    const fetchOptions = {
      method,
      headers,
    };

    if (body) {
      fetchOptions.body = body;
    }

    const response = await fetch(url, fetchOptions);
    
    let parsedResponse = null;
    let responseBody = null;
    let receipt = null;

    const contentType = response.headers.get('content-type') || '';
    
    if (buffer || contentType.includes('application/octet-stream')) {
      const arrayBuffer = await response.arrayBuffer();
      responseBody = Buffer.from(arrayBuffer);
      parsedResponse = responseBody;
    } else if (contentType.includes('application/json')) {
      const text = await response.text();
      responseBody = text;
      parsedResponse = JSON.parse(text);
      receipt = parsedResponse.receipt || null;
    } else {
      responseBody = await response.text();
      parsedResponse = responseBody;
    }

    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return new YotiResponse(
      parsedResponse,
      response.status,
      receipt,
      responseBody,
      responseHeaders
    );
  } catch (err) {
    console.log(`Error getting data from Yoti API: ${err.message}`);
    throw err;
  }
};
