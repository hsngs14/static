// extension part
let appointmentBooked = false;
let changeProxy = false;
chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    if (details.statusCode === 400) {
      // Create URL object to easily get origin
      const urlObj = new URL(details.url);
      
      console.log('HTTP 400 Error detected - Navigating to origin:', {
        url: details.url,
        origin: urlObj.origin,
        timestamp: new Date().toISOString(),
        tabId: details.tabId
      });

      chrome.tabs.update(details.tabId, {
        url: urlObj.origin
      });
    }
  },
  { urls: ["<all_urls>"] }
);






chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SET_VARIABLE') {
      switch(message.variable) {
          case 'appointmentBooked':
              appointmentBooked = message.value;
              console.log('appointmentBooked set to:', message.value);
              break;
          case 'changeProxy':
              changeProxy = message.value;
              console.log('changeProxy set to:', message.value);
              break;
      }
      sendResponse({ success: true });
  }
});



chrome.webRequest.onErrorOccurred.addListener(
  function(details) {
    // Only proceed if it's a main frame (page) request
    if (details.type !== 'main_frame') return;

    const urlObj = new URL(details.url);

    console.log('Network Error detected:', {
      error: details.error,
      errorType: details.error.includes('PROXY') ? 'Proxy Error' : 'Connection Error',
      url: details.url,
      origin: urlObj.origin,
      hostname: urlObj.hostname,
      timestamp: new Date().toISOString(),
      tabId: details.tabId,
      timeStamp: details.timeStamp,
      type: details.type
    });

    // if change proxy is on and appointment not booked yet then change proxy
    if (changeProxy && !appointmentBooked) {
      console.log(`Going to change proxy, appointmentBooked: ${appointmentBooked}`);
      activateNextProxy();

      // After changing the proxy, navigate to the original URL's origin
      window.location.href = urlObj.origin;
    } else {
      console.log(`No change proxy: ${changeProxy}, appointment booked: ${appointmentBooked}`);
    }
  },
  { 
    urls: ["<all_urls>"],
    types: ['main_frame'] // You can also filter at the listener level
  }
);



// proxy part
//let appointmentBooked = false;
let proxyList = [];
let currentProxyIndex = -1;
let isProxyActive = false;
let proxyCredentials = {};
let currentProxyIp = null;
let lastError = null;

// Function to load proxy list from storage
function loadProxyList() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['proxyList'], (result) => {
      proxyList = result.proxyList || [];
      console.log("Loaded proxy list:", proxyList);
      resolve(proxyList);
    });
  });
}

// Function to parse a proxy string
function parseProxyString(proxyString) {
  const cleanString = proxyString.trim();
  
  if (!cleanString) {
    return null;
  }

  const parts = cleanString.split(':');
  
  if (parts.length !== 4) {
    console.error("Invalid proxy format:", cleanString);
    return null;
  }

  const [host, port, username, password] = parts;
  
  if (!host || !port || isNaN(parseInt(port))) {
    console.error("Invalid host or port:", cleanString);
    return null;
  }

  return {
    host: host.trim(),
    port: parseInt(port.trim()),
    username: username.trim(),
    password: password.trim()
  };
}

// Function to get current IP
function getCurrentIP() {
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip)
    .catch(error => {
      console.error("Error fetching IP:", error);
      return "Unable to fetch IP";
    });
}

// Function to save proxy list to storage
function saveProxyList(list) {
  return new Promise((resolve, reject) => {
    const validProxies = list
      .map(line => line.trim())
      .filter(line => line)
      .filter(line => {
        const proxy = parseProxyString(line);
        if (!proxy) {
          console.warn("Skipping invalid proxy:", line);
          return false;
        }
        return true;
      });

    if (validProxies.length === 0) {
      const error = "No valid proxies found in the list";
      console.error(error);
      reject(error);
      return;
    }

    chrome.storage.sync.set({ proxyList: validProxies }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message);
      } else {
        console.log("Saved valid proxy list:", validProxies);
        proxyList = validProxies;
        resolve(validProxies);
      }
    });
  });
}

// Function to get the next proxy configuration
function getNextProxy() {
  if (!Array.isArray(proxyList) || proxyList.length === 0) {
    console.error("No proxies available in the list");
    return null;
  }

  currentProxyIndex = (currentProxyIndex + 1) % proxyList.length;
  const proxyString = proxyList[currentProxyIndex];
  const proxy = parseProxyString(proxyString);

  if (!proxy) {
    console.error("Invalid proxy at index", currentProxyIndex);
    if (proxyList.length > 1) {
      return getNextProxy();
    }
    return null;
  }

  console.log("Selected proxy:", proxy);
  return proxy;
}

// Function to activate a specific proxy
function activateSpecificProxy(proxyString) {
  return new Promise((resolve, reject) => {
    chrome.proxy.settings.clear({ scope: 'regular' }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error clearing proxy settings:", chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
        return;
      }

      const proxy = parseProxyString(proxyString);
      if (!proxy) {
        console.error("Invalid proxy string:", proxyString);
        reject("Invalid proxy configuration");
        return;
      }

      const proxyConfig = {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "http",
            host: proxy.host,
            port: proxy.port
          },
          bypassList: ["localhost"]
        }
      };

      chrome.proxy.settings.set(
        { value: proxyConfig, scope: "regular" },
        () => {
          if (chrome.runtime.lastError) {
            console.error("Error setting proxy:", chrome.runtime.lastError);
            lastError = chrome.runtime.lastError.message;
            reject(lastError);
          } else {
            isProxyActive = true;
            proxyCredentials = { username: proxy.username, password: proxy.password };
            console.log("Proxy activated successfully:", proxy);
            
            // Clear the auth cache
            chrome.browsingData.remove({
              "since": 0
            }, {
              "cookies": true,
            }, () => {
              getCurrentIP()
                .then(ip => {
                  currentProxyIp = ip;
                  console.log("New proxy IP:", ip);
                  resolve({ 
                    status: "Active", 
                    ip: ip,
                    credentials: proxyCredentials 
                  });
                })
                .catch(error => {
                  lastError = error.message || "Failed to fetch IP";
                  console.error("Error testing proxy connection:", lastError);
                  reject(lastError);
                });
            });
          }
        }
      );
    });
  });
}

// Function to activate next proxy in sequence
function activateNextProxy() {
  return new Promise((resolve, reject) => {
    chrome.proxy.settings.clear({ scope: 'regular' }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error clearing proxy settings:", chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
        return;
      }

      const proxy = getNextProxy();
      if (!proxy) {
        console.error("No proxies available");
        reject("No proxies available");
        return;
      }

      const proxyConfig = {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "http",
            host: proxy.host,
            port: proxy.port
          },
          bypassList: ["localhost"]
        }
      };

      chrome.proxy.settings.set(
        { value: proxyConfig, scope: "regular" },
        () => {
          if (chrome.runtime.lastError) {
            console.error("Error setting proxy:", chrome.runtime.lastError);
            lastError = chrome.runtime.lastError.message;
            reject(lastError);
          } else {
            isProxyActive = true;
            proxyCredentials = { username: proxy.username, password: proxy.password };
            console.log("Proxy activated successfully:", proxy);
            
            chrome.browsingData.remove({
              "since": 0
            }, {
              "cookies": true,
            }, () => {
              getCurrentIP()
                .then(ip => {
                  currentProxyIp = ip;
                  console.log("New proxy IP:", ip);
                  resolve({ 
                    status: "Active", 
                    ip: ip,
                    credentials: proxyCredentials 
                  });
                })
                .catch(error => {
                  lastError = error.message || "Failed to fetch IP";
                  console.error("Error testing proxy connection:", lastError);
                  reject(lastError);
                });
            });
          }
        }
      );
    });
  });
}

// Function to deactivate proxy
function deactivateProxy() {
  return new Promise((resolve, reject) => {
    chrome.proxy.settings.clear(
      {scope: "regular"},
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error clearing proxy settings:", chrome.runtime.lastError);
          lastError = chrome.runtime.lastError.message;
          reject(lastError);
        } else {
          isProxyActive = false;
          getCurrentIP().then(ip => {
            resolve({
              status: "Disabled",
              ip: ip,
              credentials: null
            });
          }).catch(error => {
            resolve({
              status: "Disabled",
              ip: "Unable to fetch IP",
              credentials: null
            });
          });
        }
      }
    );
  });
}

// Function to get proxy status
function getProxyStatus() {
  return new Promise((resolve) => {
    getCurrentIP().then(ip => {
      if (!isProxyActive) {
        resolve({
          status: "Disabled",
          ip: ip,
          credentials: null
        });
      } else {
        resolve({
          status: "Active",
          ip: ip,
          credentials: proxyCredentials
        });
      }
    }).catch(() => {
      resolve({
        status: "Error",
        error: lastError || "Failed to fetch IP",
        credentials: isProxyActive ? proxyCredentials : null
      });
    });
  });
}

// Message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "activateNextProxy") {
    if(appointmentBooked) {
      sendResponse({status: "Error", error: "Appointment already booked"});
      return true;
    }
    activateNextProxy()
      .then(response => sendResponse(response))
      .catch(error => sendResponse({ status: "Error", error: error }));
    return true;
  } else if (request.action === "activateSpecificProxy") {
    if(appointmentBooked) {
      sendResponse({status: "Error", error: "Appointment already booked"});
      return true;
    }
    activateSpecificProxy(request.proxy)
      .then(response => sendResponse(response))
      .catch(error => sendResponse({ status: "Error", error: error }));
    return true;
  } else if (request.action === "deactivateProxy") {
    deactivateProxy()
      .then(response => sendResponse(response))
      .catch(error => sendResponse({ status: "Error", error: error }));
    return true;
  } else if (request.action === "getProxyStatus") {
    getProxyStatus()
      .then(sendResponse)
      .catch(error => sendResponse({ status: "Error", error: error.message }));
    return true;
  } else if (request.action === "updateProxyList") {
    saveProxyList(request.proxyList)
      .then(() => loadProxyList())
      .then(() => {
        currentProxyIndex = -1;
        sendResponse({ status: "Success" });
      })
      .catch(error => sendResponse({ status: "Error", error: error.message }));
    return true;
  } else if (request.action === "updateAppointmentStatus") {
    appointmentBooked = request.status;
    console.log("Appointment status updated to:", appointmentBooked);
    sendResponse({ status: "Success" });
    return true;
  }
});

// Authentication handler
chrome.webRequest.onAuthRequired.addListener(
  (details) => {
    if (isProxyActive) {
      console.log("Proxy authentication requested", details);
      return { authCredentials: proxyCredentials };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// Error handler
chrome.webRequest.onErrorOccurred.addListener(
  (details) => {
    if (isProxyActive && details.error) {
      console.error("Web request error:", details);
      lastError = details.error;
    }
  },
  { urls: ["<all_urls>"] }
);

// Load the proxy list when the background script starts
loadProxyList().then(() => {
  console.log("Proxy list loaded:", proxyList);
});


function addBookmarkIfNotExists(url, title) {
  chrome.bookmarks.search({ url: url }, function(results) {
    if (results.length === 0) {
      chrome.bookmarks.create({
        'parentId': '1',
        'title': title,
        'url': url
      }, function(result) {
        console.log('New bookmark created:', result);
      });
    } else {
      console.log('Bookmark already exists');
    }
  });
}

// Example usage
addBookmarkIfNotExists('https://algeria.blsspainglobal.com/', 'BLS Algeria');
addBookmarkIfNotExists('https://www.blsspainmorocco.net/', 'BLS Morocco');
