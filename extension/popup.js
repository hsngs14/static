document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button1').addEventListener('click', function() {
    openLink('https://algeria.blsspainglobal.com/css/site.css?config');
  });

  document.getElementById('button2').addEventListener('click', function() {
    openLink('https://algeria.blsspainglobal.com/css/site.css?ManageApplicant');
  });

  document.getElementById('button3').addEventListener('click', function() {
    openLink('https://cib.satim.dz');
  });

  document.getElementById('button4').addEventListener('click', function() {
    openLink('https://playground.bioid.com/LivenessDetection');
  });

  document.getElementById('button5').addEventListener('click', function() {
    openLink('https://algeria.blsspainglobal.com/DZA/blsappointment/livenessdetection?appointmentId=d65b0ad0-3a6c-44c1-9efc-50bc82e680b0&applicantPhotoId=fcb3672e-63da-40dc-9356-681eb8342bdc');
  });

  function openLink(url) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.create({ url: url });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', function() {
    var headerValue = document.getElementById('headerValue').value;
    chrome.storage.local.set({ 'customHeader': headerValue }, function() {
      console.log('Custom header set to: ' + headerValue);
    });
  });
});

