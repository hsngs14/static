console.log('background script running33');
/*
chrome.webNavigation.onErrorOccurred.addListener(function(details) {
  if (details.error === "net::ERR_CONNECTION_CLOSED") {
    chrome.tabs.reload(details.tabId);
  }
});
*/

/*
chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    for (var i = 0; i < details.responseHeaders.length; i++) {
      if (details.responseHeaders[i].name.toLowerCase() === "content-security-policy" ||
          details.responseHeaders[i].name.toLowerCase() === "referrer-policy") {
        details.responseHeaders[i].value = '';
      }
    }

    var accessControlHeader = {
      'name': 'Access-Control-Allow-Origin',
      'value': '*'
    };

    details.responseHeaders.push(accessControlHeader);

    return { responseHeaders: details.responseHeaders };
  },
  { urls: ["https://algeria.blsspainglobal.com/*","https://www.blsspainmorocco.net/*"] }, // Corrected URL pattern
  ["blocking", "responseHeaders"]
);

*/


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log('URL:', details.url);
    if (details.url.includes('5f2749aa43d4.695b66d7.eu-central-1.token.awswaf.com')) {
      console.log('Blocking request to:', details.url);
      return { cancel: true };
    }
    console.log('Not blocking request to:', details.url);
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

/*
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    // Specify the URLs of the websites where you want this code to run
    var targetWebsites = ["https://algeria.blsspainglobal.com", "https://anotherexample.com"];

    // Check if the request URL matches any of the target websites
    if (targetWebsites.some(website => details.url.startsWith(website))) {
      // Generate a random number for the fourth octet (x)
      var fourthOctet = Math.floor(Math.random() * 256);

      // Generate the original IP address with the first three octets fixed at 154.246 and the fourth octet randomized
      var originalIP = `154.246.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;

      // Modify headers here
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'X-Forwarded-For') {
          // Append original IP to existing X-Forwarded-For header
          details.requestHeaders[i].value += ', ' + originalIP;
          return { requestHeaders: details.requestHeaders };
        }
      }
      // Add X-Forwarded-For header if it doesn't exist
      details.requestHeaders.push({ name: 'X-Forwarded-For', value: originalIP });
    }

    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
);
*/

const RETRY_DELAY = 500; // 500 milliseconds

chrome.webNavigation.onErrorOccurred.addListener((details) => {
  // Common connection errors that might need retry or fallback handling
  switch (details.error) {
    case 'net::ERR_CONNECTION_CLOSED':
    case 'net::ERR_CONNECTION_RESET':
    case 'net::ERR_CONNECTION_REFUSED':
    case 'net::ERR_CONNECTION_TIMED_OUT':
    case 'net::ERR_CONNECTION_FAILED':
    case 'net::ERR_NETWORK_CHANGED':
    case 'net::ERR_INTERNET_DISCONNECTED':
    case 'net::ERR_NAME_NOT_RESOLVED':
    case 'net::ERR_NETWORK_IO_SUSPENDED':
    case 'net::ERR_PROXY_CONNECTION_FAILED':
    case 'net::ERR_EMPTY_RESPONSE':
    case 'net::ERR_SSL_PROTOCOL_ERROR':
      setTimeout(() => {
        chrome.tabs.reload(details.tabId, { bypassCache: false });
      }, RETRY_DELAY);
      break;

    // Handle HTTP 400 and 405 errors by going back to the previous page
    case 'net::ERR_HTTP_RESPONSE_CODE_FAILURE':
      if (details.frameId === 0 && (details.statusCode === 400 || details.statusCode === 405)) { 
        // Ensure it's the main frame and a 400 or 405 error
        chrome.tabs.goBack(details.tabId);
      }
      break;
  }
});
