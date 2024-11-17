// popup.js
document.addEventListener('DOMContentLoaded', () => {
  // UI Elements
  const activateNextButton = document.getElementById('activateNextProxy');
  const activateSelectedButton = document.getElementById('activateSelectedProxy');
  const deactivateButton = document.getElementById('deactivateProxy');
  const statusElement = document.getElementById('status');
  const proxyInfoElement = document.getElementById('proxyInfo');
  const errorInfoElement = document.getElementById('errorInfo');
  const proxyListTextarea = document.getElementById('proxyList');
  const updateProxyListButton = document.getElementById('updateProxyList');
  const proxySelect = document.getElementById('proxySelect');
  const proxySearch = document.getElementById('proxySearch');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Tab handling
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      tab.classList.add('active');
      document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
    });
  });

  let currentProxyList = [];

  function formatProxyForDisplay(proxyString) {
    const [host, port, username] = proxyString.split(':');
    return `${username}@${host}:${port}`;
  }

  function updateUI(response) {
    console.log("Updating UI with response:", response);
    statusElement.textContent = `Status: ${response.status}`;
    
    if (response.ip) {
      proxyInfoElement.textContent = `Current IP: ${response.ip}`;
    } else {
      proxyInfoElement.textContent = 'Current IP: Fetching...';
    }

    if (response.credentials) {
      proxyInfoElement.textContent += `\nProxy User: ${response.credentials.username}`;
    }

    if (response.status === "Error") {
      errorInfoElement.textContent = `Error: ${response.error}`;
    } else {
      errorInfoElement.textContent = "";
    }

    // Update button states
    activateSelectedButton.disabled = proxySelect.selectedIndex === -1;
  }

  function updateProxySelect(searchTerm = '') {
    proxySelect.innerHTML = '';
    const filteredProxies = currentProxyList.filter(proxy => 
      formatProxyForDisplay(proxy).toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredProxies.forEach((proxy, index) => {
      const option = document.createElement('option');
      option.value = proxy;
      option.textContent = formatProxyForDisplay(proxy);
      option.title = proxy; // Show full proxy string on hover
      proxySelect.appendChild(option);
    });

    activateSelectedButton.disabled = proxySelect.selectedIndex === -1;
  }

  function loadProxyList() {
    chrome.storage.sync.get(['proxyList'], (result) => {
      if (result.proxyList) {
        currentProxyList = result.proxyList;
        proxyListTextarea.value = result.proxyList.join('\n');
        updateProxySelect();
      }
    });
  }

  function refreshStatus() {
    chrome.runtime.sendMessage({action: "getProxyStatus"}, updateUI);
  }

  // Event Listeners
  proxySearch.addEventListener('input', (e) => {
    updateProxySelect(e.target.value);
  });

  proxySelect.addEventListener('change', () => {
    activateSelectedButton.disabled = proxySelect.selectedIndex === -1;
  });

  // Next Proxy Button
  activateNextButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "activateNextProxy"}, updateUI);
  });

  // Selected Proxy Button
  activateSelectedButton.addEventListener('click', () => {
    const selectedProxy = proxySelect.value;
    if (selectedProxy) {
      chrome.runtime.sendMessage({
        action: "activateSpecificProxy",
        proxy: selectedProxy
      }, updateUI);
    }
  });

  deactivateButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "deactivateProxy"}, updateUI);
  });

  updateProxyListButton.addEventListener('click', () => {
    const proxyListText = proxyListTextarea.value;
    const proxyList = proxyListText
      .split(/[\r\n]+/)
      .map(line => line.trim())
      .filter(line => line !== "");

    if (proxyList.length === 0) {
      alert("Please enter at least one proxy in the format host:port:username:password");
      return;
    }

    const invalidProxies = proxyList.filter(proxy => {
      const parts = proxy.split(':');
      return parts.length !== 4 || isNaN(parseInt(parts[1]));
    });

    if (invalidProxies.length > 0) {
      alert(`Found ${invalidProxies.length} invalid proxy entries. Please check the format: host:port:username:password`);
      return;
    }

    chrome.runtime.sendMessage({
      action: "updateProxyList", 
      proxyList: proxyList
    }, (response) => {
      if (response.status === "Success") {
        alert(response.message || "Proxy list updated successfully");
        currentProxyList = proxyList;
        updateProxySelect();
      } else {
        alert(`Error updating proxy list: ${response.error}`);
      }
    });
  });

  // Initial load
  loadProxyList();
  refreshStatus();
  setInterval(refreshStatus, 5000);
});
