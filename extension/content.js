
var currentUrl = window.location.href;
var pageTitle = document.title;
var capcountry = "";
var baseTarget = "https://spain.blscn.cn"; // check if algeria, moroco or china and set
var targetCounry = "/CHN"; // check if algeria, moroco or china and set

var photoUploadedAlready = false;
var emailVerifiedAlready = false;
var captchaVerifiedAlready = false;

var isBlsWebSite = false;

if (currentUrl.includes("spain.blscn.cn")) {
  isBlsWebSite = true;
  capcountry = "China";
  baseTarget = "https://spain.blscn.cn";
  targetCounry = "/CHN";
} else if (currentUrl.includes("algeria.blsspainglobal.com")) {
  isBlsWebSite = true;
  baseTarget = "https://algeria.blsspainglobal.com";
  targetCounry = "/DZA";

} else if (currentUrl.includes("https://www.blsspainmorocco.net")) {
  isBlsWebSite = true;
  capcountry = "Mar";
  baseTarget = "https://www.blsspainmorocco.net";
  targetCounry = "/MAR";
} else if (currentUrl.includes("https://egypt.blsspainglobal.com")) {
  isBlsWebSite = true;
  capcountry = "";
  baseTarget = "https://egypt.blsspainglobal.com";
  targetCounry = "/Global";
} else if (currentUrl.includes("https://mauritania.blsspainglobal.com")) {
  isBlsWebSite = true;
  capcountry = "";
  baseTarget = "https://mauritania.blsspainglobal.com";
  targetCounry = "/Global";
} else if (currentUrl.includes("https://qatar.blsspainglobal.com")) {
  isBlsWebSite = true;
  capcountry = "";
  baseTarget = "https://qatar.blsspainglobal.com";
  targetCounry = "/Global";
} else if (currentUrl.includes("https://russia.blsspainglobal.com")) {
  isBlsWebSite = true;
  capcountry = "";
  baseTarget = "https://russia.blsspainglobal.com";
  targetCounry = "/Global";
}
/*
var baseUrlServer1 = "https://serverone.ddnsking.com";
//var baseUrlServer = 'https://localhost:7087';
// Make a GET request to fetch the JavaScript file
checkVersionUpdate();
function checkVersionUpdate(){
  fetch(`${baseUrlServer1}/api/Bls/GetJavaScriptVersion`)
  .then((response) => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to download JavaScript file");
    }
    // Return the response text
    return response.text();
  })
  .then((jsCode) => {
    console.log(jsCode);
    checkIfNewversionIsNeeded(jsCode);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("Error:", error);
    checkVersionUpdate();
  });
}


function checkIfNewversionIsNeeded(serverScriptVersion) {
  var scriptVersion = localStorage.getItem("scriptVersion");
  if (!scriptVersion || serverScriptVersion > scriptVersion) {
    console.log('getting new version from the server');
    // get the new script
    fetch(`${baseUrlServer1}/api/Bls/GetJavaScriptFile`)
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to download JavaScript file");
        }
        // Return the response text
        return response.text();
      })
      .then((jsCode) => {
        localStorage.setItem("serverScript", jsCode);
        runServerSCript();
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Error:", error);
        checkIfNewversionIsNeeded(serverScriptVersion);
      });
  } else {
    // run the existing script
    console.log('loading old script');
    runServerSCript();
  }
}

function runServerSCript() {
  // Create a script element
  var customScript23 = document.createElement("script");

  // Set the type attribute
  customScript23.type = "text/javascript";

  // Set the downloaded JavaScript code as the content of the script
  customScript23.textContent = localStorage.getItem("serverScript");

  // Append the script to the document head
  document.head.appendChild(customScript23);
}
*/

var scriptUrl1 = chrome.runtime.getURL("yourScriptFile.js");
//var scriptUrl1 = chrome.runtime.getURL("yourScriptFileobs.js");

// Create a script element
var customScript1 = document.createElement("script");

// Set the type and src attributes
customScript1.type = "text/javascript";
customScript1.src = scriptUrl1;

// Append the script to the document head
document.head.appendChild(customScript1);

/*
// Create a form element
const proxyForm = document.createElement('form');

// Create input fields for IP, port, username, and password
const proxyIpInput = document.createElement('input');
proxyIpInput.type = 'text';
proxyIpInput.placeholder = 'Proxy IP';
proxyForm.appendChild(proxyIpInput);

const proxyPortInput = document.createElement('input');
proxyPortInput.type = 'text';
proxyPortInput.placeholder = 'Port';
proxyForm.appendChild(proxyPortInput);

const proxyUsernameInput = document.createElement('input');
proxyUsernameInput.type = 'text';
proxyUsernameInput.placeholder = 'Username';
proxyForm.appendChild(proxyUsernameInput);

const proxyPasswordInput = document.createElement('input');
proxyPasswordInput.type = 'password';
proxyPasswordInput.placeholder = 'Password';
proxyForm.appendChild(proxyPasswordInput);

// Create a submit button
const proxySubmitButton = document.createElement('button');
proxySubmitButton.type = 'submit';
proxySubmitButton.textContent = 'Save';
proxyForm.appendChild(proxySubmitButton);

// Set the z-index to 1000
proxyForm.style.zIndex = '1000';

// Event listener for form submission
proxyForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the values from the input fields
  const ip = proxyIpInput.value;
  const port = proxyPortInput.value;
  const username = proxyUsernameInput.value;
  const password = proxyPasswordInput.value;

  // Send a message to the background script to update proxy settings
  chrome.runtime.sendMessage({
    type: 'updateProxySettings',
    proxySettings: {
      host: ip,
      port: port,
      username: username,
      password: password
    }
  });
});

// Prepend the form to the beginning of the document body
document.body.prepend(proxyForm);
*/
/*
chrome.storage.sync.set({ key: "value55555" }, function() {
  console.log('Data is set.555555');
});
*/
var currentUrl = window.location.href;

if (currentUrl.includes('account/RegisterUser')) {
  // Constants and Configuration
  const FORM_ID_FG = 'userForm';
  const FORM_CLASSES_FG = 'bg-mode shadow rounded-3 overflow-hidden p-4';
  const FORM_MARGIN_FG = '20px';
  const TARGET_SELECTOR_FG = '#div-main > div';

  const COUNTRIES_FG = ["Algeria","Spain","Afghanistan", "Albania", "American Samoa", "Andorra", "Angola", "Anguila"];
  const GENDERS_FG = ["Male", "Female", "Other"];
  const MARITAL_STATUSES_FG = ["Single", "Married", "Divorced", "Widowed"];
  const PURPOSES_OF_JOURNEY_FG = ["Tourism", "Business", "Study", "Work", "Transit", "Others"];
  const RELATIONSHIPS_FG = ["Wife", "Sister", "Brother", "Husband", "Daughter", "Son", "Mother"];
  const PASSPORT_TYPES_FG = ["Ordinary Passport", "Diplomatic Passport"];
  const VISA_TYPES_FG = ["Schengen Visa", "National Visa",
    "First application / première demande",
    "Visa renewal / renouvellement de visa",
    "Schengen Visa - First Demand",
    "Schengen Visa - Previous Visa Holder",
    "Schengen visa ( Estonia)",

  ];
  const VISA_SUBTYPES_FG = ["Schengen Visa", "Student Visa", "Family Visit", "Business",
    "Oran 1",
    "Oran 2",
    "Oran 3",
    "Oran 4",
    "ALG 1",
    "ALG 2",
    "ALG 3",
    "ALG 4",
    "Algiers 1",
    "Algiers 2",
    "Algiers 3",
    "Algiers 4",

  ];
  const CITIES_FG = ["Algiers", "Oran"];

  const FORM_FIELDS_FG = [
    { label: "Surname", id: "app_surname", type: "text" },
    { label: "First Name", id: "app_firstName", type: "text" },
    { label: "Last Name", id: "app_lastName", type: "text" },
    { label: "Date of Birth (yyyy-mm-dd)", id: "app_dob", type: "date" },
    { label: "Passport Number", id: "app_passportNumber", type: "text" },
    { label: "Passport Issue Date (yyyy-mm-dd)", id: "app_passportIssueDate", type: "date" },
    { label: "Passport Expiry Date (yyyy-mm-dd)", id: "app_passportExpiryDate", type: "date" },
    { label: "Passport Issue Country", id: "app_passportIssueCountry", type: "autocomplete", options: COUNTRIES_FG },
    { label: "Passport Type", id: "app_passportType", type: "autocomplete", options: PASSPORT_TYPES_FG },
    { label: "Passport Issue Place", id: "app_passportIssuePlace", type: "text" },
    { label: "Country of Residence", id: "app_countryOfResidence", type: "autocomplete", options: COUNTRIES_FG },
    { label: "Country of Birth", id: "app_countryOfBirth", type: "autocomplete", options: COUNTRIES_FG },
    { label: "City", id: "app_city", type: "autocomplete", options: CITIES_FG },
    { label: "Phone Number", id: "app_phoneNumber", type: "tel" },
    { label: "Email", id: "app_email", type: "email" },
    { label: "Email_app_password", id: "app_email_app_password", type: "text" },
    { label: "BLS password", id: "app_bls_password", type: "text" },
    { label: "Place of Birth", id: "app_placeOfBirth", type: "text" },
    { label: "Visa Type", id: "app_visaType", type: "autocomplete", options: VISA_TYPES_FG },
    { label: "Visa Subtype", id: "app_visaSubType", type: "autocomplete", options: VISA_SUBTYPES_FG },
    { label: "Gender", id: "app_gender", type: "autocomplete", options: GENDERS_FG },
    { label: "Marital Status", id: "app_maritalStatus", type: "autocomplete", options: MARITAL_STATUSES_FG },
    { label: "Purpose of Journey", id: "app_purposeOfJourney", type: "autocomplete", options: PURPOSES_OF_JOURNEY_FG },
    { label: "Relationship to Main Applicant", id: "app_relationship", type: "autocomplete", options: RELATIONSHIPS_FG },
    { label: "Number of Family Members", id: "app_numberOfFamilyMembers", type: "number" },
    { label: "Old Visa Number", id: "app_oldVisaNumber", type: "text" },
    { label: "Visa Start Date", id: "app_visaStartDate", type: "date" },
    { label: "Visa End Date", id: "app_visaEndDate", type: "date" },
    { label: "Old Visa country", id: "app_OldeVisaCountry", type: "autocomplete", options: COUNTRIES_FG },
    // New Dhahabya fields
    { label: "Dhahabya Card Number", id: "app_dhahabyaCardNumber", type: "text" },
    { label: "Dhahabya Full Name", id: "app_dhahabyaFullName", type: "text" },
    { label: "Dhahabya Expiration Date (mm/yyyy)", id: "app_dhahabyaExpirationDate", type: "text" },
    { label: "Dhahabya CVV", id: "app_dhahabyaCVV", type: "text" }
  ];

  const FAMILY_MEMBER_FIELDS_FG = FORM_FIELDS_FG.filter(field =>
    field.id !== 'app_numberOfFamilyMembers' &&
    !field.id.startsWith('app_dhahabya') // Exclude Dhahabya fields for family members
  );

  let familyMemberCountFG = 0;

  // Helper Functions
  function createElementFG(tag, attributes = {}) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  }

  function createLabelFG(forId, text) {
    const label = createElementFG('label', { for: forId });
    label.innerText = text;
    return label;
  }

  function createInputFG(field) {
    const input = createElementFG('input', {
      type: field.type === "autocomplete" ? "text" : field.type,
      id: field.id,
      name: field.id
    });
    input.style.width = '100%';
    input.style.padding = '5px';
    input.style.boxSizing = 'border-box';

    // Set default value for autocomplete fields
    if (field.type === "autocomplete" && field.options.length > 0) {
      input.value = field.options[0];
    }

    // Add specific logic for Dhahabya expiration date field
    if (field.id === 'app_dhahabyaExpirationDate') {
      input.placeholder = 'mm/yyyy';
      input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 6) value = value.slice(0, 6);
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        e.target.value = value;
      });
    }

    // Add specific logic for Dhahabya CVV field
    if (field.id === 'app_dhahabyaCVV') {
      input.maxLength = 3;
      input.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '');
      });
    }
    if (field.id === 'app_dhahabyaCardNumber') {
      input.maxLength = 16;
      input.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '');
      });
    }

    return input;
  }

  function createSuggestionBoxFG() {
    const suggestionBox = createElementFG('div', { class: 'suggestion-box' });
    Object.assign(suggestionBox.style, {
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '100%',
      border: '1px solid #ccc',
      background: '#fff',
      maxHeight: '150px',
      overflowY: 'auto',
      display: 'none',
      zIndex: '1000',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    });
    return suggestionBox;
  }

  function createSuggestionItemFG(option, input, suggestionBox) {
    const item = createElementFG('div');
    item.innerText = option;
    item.style.cursor = 'pointer';
    item.style.padding = '5px';
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      input.value = option;
      suggestionBox.style.display = 'none';
    });
    return item;
  }

  function setupAutocompleteFG(input, suggestionBox, options) {
    function showAllOptionsFG() {
      suggestionBox.innerHTML = '';
      options.forEach(option => {
        suggestionBox.appendChild(createSuggestionItemFG(option, input, suggestionBox));
      });
      suggestionBox.style.display = 'block';
    }

    input.addEventListener('click', () => {
      showAllOptionsFG();
    });

    input.addEventListener('focus', showAllOptionsFG);

    input.addEventListener('input', () => {
      const value = input.value.toLowerCase();
      suggestionBox.innerHTML = '';
      if (value) {
        const filteredOptions = options.filter(option =>
          option.toLowerCase().includes(value)
        );
        filteredOptions.forEach(option => {
          suggestionBox.appendChild(createSuggestionItemFG(option, input, suggestionBox));
        });
        suggestionBox.style.display = filteredOptions.length > 0 ? 'block' : 'none';
      } else {
        showAllOptionsFG();
      }
    });

    document.addEventListener('click', (event) => {
      if (!input.parentElement.contains(event.target)) {
        suggestionBox.style.display = 'none';
      }
    });
  }

  function formatDateFG(inputDate) {
    const date = new Date(inputDate);
    return date.toISOString().split('T')[0];
  }

  function addTenYearsMinusOneDayFG(inputDate) {
    const date = new Date(inputDate);
    date.setFullYear(date.getFullYear() + 10);
    date.setDate(date.getDate() - 1);
    return formatDateFG(date);
  }

  function createFamilyMemberFieldsFG(familyMemberData = null) {
    const familyMemberDiv = createElementFG('div', { class: 'family-member' });
    familyMemberDiv.style.border = '1px solid #ccc';
    familyMemberDiv.style.padding = '10px';
    familyMemberDiv.style.marginTop = '20px';

    const familyMemberId = `family_member_${++familyMemberCountFG}`;

    const headerDiv = createElementFG('div');
    headerDiv.innerHTML = `<h3>Family Member ${familyMemberCountFG}</h3>`;
    familyMemberDiv.appendChild(headerDiv);

    FAMILY_MEMBER_FIELDS_FG.forEach(field => {
      const label = createLabelFG(`${familyMemberId}_${field.id}`, field.label);
      const inputWrapper = createElementFG('div');
      inputWrapper.style.position = 'relative';
      inputWrapper.style.marginBottom = '20px';

      const input = createInputFG({
        ...field,
        id: `${familyMemberId}_${field.id}`
      });

      if (familyMemberData && familyMemberData[field.id]) {
        input.value = familyMemberData[field.id];
      }

      if (field.type === 'autocomplete') {
        const suggestionBox = createSuggestionBoxFG();
        inputWrapper.appendChild(input);
        inputWrapper.appendChild(suggestionBox);
        setupAutocompleteFG(input, suggestionBox, field.options);
      } else {
        inputWrapper.appendChild(input);
      }

      familyMemberDiv.appendChild(label);
      familyMemberDiv.appendChild(inputWrapper);
    });

    const removeButton = createElementFG('button', { type: 'button' });
    removeButton.innerText = 'Remove Family Member';
    removeButton.addEventListener('click', () => {
      familyMemberDiv.remove();
      updateFamilyMemberCountFG();
    });
    familyMemberDiv.appendChild(removeButton);

    return familyMemberDiv;
  }

  // Main Form Creation Function
  function createDynamicFormFG() {
    const form = createElementFG('form', { id: FORM_ID_FG, class: FORM_CLASSES_FG });
    form.style.margin = FORM_MARGIN_FG;

    // Create profile image upload container
    const imageUploadContainer = createElementFG('div', { class: 'image-upload-container' });
    imageUploadContainer.style.cssText = `
        text-align: center;
        margin-bottom: 30px;
    `;

    // Create image wrapper
    const imageWrapper = createElementFG('div', { class: 'image-wrapper' });
    imageWrapper.style.cssText = `
        position: relative;
        cursor: pointer;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        border: 2px solid #ddd;
        transition: all 0.3s ease;
    `;

    // Create preview image
    const previewImage = createElementFG('img', {
        id: 'uploadfile-1-preview',
        src: '/assets/images/avatar/01.jpg',
    });
    previewImage.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
    `;

    // Create hidden input for profile pic ID
    const profilePicInput = createElementFG('input', {
        type: 'hidden',
        id: 'app_profilePicId',
        name: 'app_profilePicId'
    });
    form.appendChild(profilePicInput);

    // Create overlay
    const overlay = createElementFG('div', { class: 'overlay' });
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Create upload icon/text
    const uploadIcon = createElementFG('div');
    uploadIcon.innerHTML = 'Upload';
    uploadIcon.style.color = 'white';

    // Add hover effects
    imageWrapper.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
    });

    imageWrapper.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
    });

    // Add click handler
    imageWrapper.addEventListener('click', () => {
        const tempInput = createElementFG('input', {
            type: 'file',
            accept: 'image/*'
        });
        tempInput.style.display = 'none';
        tempInput.onchange = (event) => {
            const fileInput = event.target;
            ShowPhotoLoaderFG();
            const selectedFiles = [...fileInput.files];
            var fd = new FormData();
            
            if (selectedFiles.length > 0) {
                fd.append('file', selectedFiles[0]);
            }
            
            fetch(targetCounry+"/appointment/UploadApplicantPhoto", {
                method: 'POST',
                body: fd
            })
            .then(response => response.json())
            .then(result => {
                HidePhotoLoaderFG();
                if (result.success) {
                    previewImage.src = targetCounry+"/query/getfile?fileid=" + result.fileId;
                    profilePicInput.value = result.fileId;
                    
                    var modal = document.getElementById('photoUploadModal');
                    if (modal) {
                        var bootstrapModal = new bootstrap.Modal(modal);
                        bootstrapModal.show();
                    }
                } else {
                    alert(result.err);
                }
            })
            .catch(error => {
                HidePhotoLoaderFG();
                console.error('Error:', error);
            });
            
            tempInput.remove();
        };
        tempInput.click();
    });

    // Assemble the image upload components
    overlay.appendChild(uploadIcon);
    imageWrapper.appendChild(previewImage);
    imageWrapper.appendChild(overlay);
    imageUploadContainer.appendChild(imageWrapper);

    // Add a label below the image
    const imageLabel = createElementFG('div');
    imageLabel.innerText = 'Profile Photo';
    imageLabel.style.marginTop = '10px';
    imageLabel.style.fontWeight = 'bold';
    imageUploadContainer.appendChild(imageLabel);

    // Add the image upload container to the top of the form
    form.appendChild(imageUploadContainer);

    // Continue with the original form fields
    FORM_FIELDS_FG.forEach(field => {
        const label = createLabelFG(field.id, field.label);
        const inputWrapper = createElementFG('div');
        inputWrapper.style.position = 'relative';
        inputWrapper.style.marginBottom = '20px';

        const input = createInputFG(field);

        if (field.type === 'autocomplete') {
            const suggestionBox = createSuggestionBoxFG();
            inputWrapper.appendChild(input);
            inputWrapper.appendChild(suggestionBox);
            setupAutocompleteFG(input, suggestionBox, field.options);
        } else {
            inputWrapper.appendChild(input);
        }

        form.appendChild(label);
        form.appendChild(inputWrapper);
    });

    const submitBtn = createElementFG('button', { type: 'button' });
    submitBtn.innerText = 'Save';
    submitBtn.style.marginTop = '10px';
    submitBtn.style.display = 'block';
    form.appendChild(submitBtn);

    const addFamilyMemberBtn = createElementFG('button', { type: 'button' });
    addFamilyMemberBtn.innerText = 'Add Family Member';
    addFamilyMemberBtn.style.marginTop = '10px';
    addFamilyMemberBtn.style.display = 'block';
    form.appendChild(addFamilyMemberBtn);

    const familyMembersContainer = createElementFG('div', { id: 'familyMembersContainer' });
    form.appendChild(familyMembersContainer);

    return form;
}
  // Event Handlers
  function handlePassportDateChangeFG() {
    const passportIssueDateInput = document.getElementById('app_passportIssueDate');
    const passportExpiryDateInput = document.getElementById('app_passportExpiryDate');
    passportIssueDateInput.addEventListener('change', () => {
      const issueDateValue = passportIssueDateInput.value;
      if (issueDateValue) {
        passportExpiryDateInput.value = addTenYearsMinusOneDayFG(issueDateValue);
      }
    });
  }

  function handleAddFamilyMemberFG(form) {
    const addFamilyMemberBtn = form.querySelector('button:nth-of-type(2)');
    const familyMembersContainer = form.querySelector('#familyMembersContainer');

    addFamilyMemberBtn.addEventListener('click', () => {
      const familyMemberFields = createFamilyMemberFieldsFG();
      familyMembersContainer.appendChild(familyMemberFields);
      updateFamilyMemberCountFG();
    });
  }

  function updateFamilyMemberCountFG() {
    const familyMemberDivs = document.querySelectorAll('.family-member');
    const numberOfFamilyMembersInput = document.getElementById('app_numberOfFamilyMembers');
    if (numberOfFamilyMembersInput) {
      numberOfFamilyMembersInput.value = familyMemberDivs.length;
    }
  }

  function handleSaveButtonFG(form) {
    const submitBtn = form.querySelector('button');
    submitBtn.addEventListener('click', (event) => {
        updateFamilyMemberCountFG(); // Update the count before saving
    
        const profileData = {};
    
        // Collect main applicant data
        FORM_FIELDS_FG.forEach(field => {
            const input = document.getElementById(field.id);
            if (input) {
                profileData[field.id] = input.value;
            }
        });

        // Add profile picture ID to profileData
        const profilePicInput = document.getElementById('app_profilePicId');
        if (profilePicInput && profilePicInput.value) {
            profileData.app_profilePicId = profilePicInput.value;
        }
    
        // Collect family member data
        profileData.app_familyMembers = [];
        const familyMemberDivs = form.querySelectorAll('.family-member');
        familyMemberDivs.forEach((familyMemberDiv, index) => {
            const familyMemberData = {};
            FAMILY_MEMBER_FIELDS_FG.forEach(field => {
                const fieldId = `family_member_${index + 1}_${field.id}`;
                const input = document.getElementById(fieldId);
                if (input) {
                    familyMemberData[field.id] = input.value;
                }
            });
            if (Object.keys(familyMemberData).length > 0) {
                profileData.app_familyMembers.push(familyMemberData);
            }
        });
    
        // Save profileData to extension's local storage
        chrome.storage.local.set({ profileData: profileData }, function () {
            console.log('Profile data saved to extension local storage:', profileData);
        });
        localStorage.setItem('profileData', JSON.stringify(profileData));
    });
}

function loadDataFromLocalStorageFG(form) {
  chrome.storage.local.get(['profileData'], function (result) {
      let profileData = result.profileData;  // Changed const to let

      if (!profileData) {
          const localStorageData = localStorage.getItem('profileData');
          profileData = localStorageData ? JSON.parse(localStorageData) : null;
      }

      if (profileData) {
          // Load main applicant data from storage
          FORM_FIELDS_FG.forEach(field => {
              const input = document.getElementById(field.id);
              if (input && profileData[field.id]) {
                  input.value = profileData[field.id];
              }
          });

          // Load profile picture if available
          if (profileData.app_profilePicId) {
              const previewImage = document.getElementById('uploadfile-1-preview');
              const profilePicInput = document.getElementById('app_profilePicId');
              if (previewImage) {
                  previewImage.src = targetCounry + "/query/getfile?fileid=" + profileData.app_profilePicId;
              }
              if (profilePicInput) {
                  profilePicInput.value = profileData.app_profilePicId;
              }
          }

          // Load family member data from storage
          const familyMembersContainer = form.querySelector('#familyMembersContainer');
          if (profileData.app_familyMembers && Array.isArray(profileData.app_familyMembers)) {
              profileData.app_familyMembers.forEach(familyMemberData => {
                  const familyMemberFields = createFamilyMemberFieldsFG(familyMemberData);
                  familyMembersContainer.appendChild(familyMemberFields);
              });
          }

          updateFamilyMemberCountFG();

          // Save to localStorage if it was loaded from Chrome storage
          localStorage.setItem('profileData', JSON.stringify(profileData));
      } else {
          console.log('No profile data found in Chrome storage or localStorage.');
      }
  });
}


  // Main Execution
  function initFG() {
    const form = createDynamicFormFG();
    const targetDiv = document.querySelector(TARGET_SELECTOR_FG);
    if (targetDiv) {
      targetDiv.insertBefore(form, targetDiv.firstChild);
      handlePassportDateChangeFG();
      handleAddFamilyMemberFG(form);
      handleSaveButtonFG(form);
      loadDataFromLocalStorageFG(form);  // Load data from local storage
    } else {
      console.error(`Target element not found: ${TARGET_SELECTOR_FG}`);
    }
  }

  // Initialize the form
  initFG();
}

// In the payment site detection and form fill section:
if (
  currentUrl.startsWith('https://epay.poste.dz/payment/merchants/AIRALGERIE/payment_fr.html') ||
  currentUrl.startsWith('https://cib.satim.dz/payment/merchants/SATIM/payment_en.html') ||
  currentUrl.startsWith('https://epay.poste.dz/payment/merchants/MOBILIS/') ||
  currentUrl.startsWith('https://epay.poste.dz/payment/merchants/') ||
  currentUrl.startsWith('https://cib.satim.dz/payment') ||
  currentUrl.startsWith('https://epay.poste.dz/')
)  {
console.log('poste ccp website detected');
chrome.storage.local.get('profileData', function (result) {
  console.log('profileData in chrome.storage.local:', result.profileData);

  if (result.profileData) {
      // Extract Dhahabya data from profileData
      var dhahabyaData = {
          number_card: result.profileData.app_dhahabyaCardNumber || "",
          cvc: result.profileData.app_dhahabyaCVV || "",
          name_card: result.profileData.app_dhahabyaFullName || ""
      };

      // Extract month and year from the expiration date
      if (result.profileData.app_dhahabyaExpirationDate) {
          var expParts = result.profileData.app_dhahabyaExpirationDate.split('/');
          dhahabyaData.month = expParts[0] || "";
          dhahabyaData.year = expParts[1] || "";
      } else {
          dhahabyaData.month = "";
          dhahabyaData.year = "";
      }

      // Function to fill card data into input fields
      function fillCardData(data) {
          var fields = {
              "#iPAN": data.number_card,
              "#iCVC": data.cvc,
              "#month": data.month,
              "#year": data.year,
              "#iTEXT": data.name_card
          };

          for (var selector in fields) {
              var element = document.querySelector(selector);
              if (element) {
                  element.value = fields[selector];
                  // Trigger any necessary events (e.g., for React controlled inputs)
                  element.dispatchEvent(new Event('input', { bubbles: true }));
                  element.dispatchEvent(new Event('change', { bubbles: true }));
              }
          }
      }

      // Fill the form fields immediately
      fillCardData(dhahabyaData);
      function triggerEvents(element) {
        //    element.dispatchEvent(new Event('input', { bubbles: true }));
           element.dispatchEvent(new Event('change', { bubbles: true }));
        //    element.dispatchEvent(new Event('focusout', { bubbles: true }));
        }
        
        // Trigger events for each field
        triggerEvents(document.getElementById('iPAN'));
        triggerEvents(document.getElementById('iCVC'));
        triggerEvents(document.getElementById('month'));
        triggerEvents(document.getElementById('year'));
        triggerEvents(document.getElementById('iTEXT'));
  } else {
      console.log('No profileData found in storage');
  }
});



}

window.addEventListener("load", () => {
  // Your code here

  
});




function ShowPhotoLoaderFG() {
  const imageWrapper = document.querySelector('.image-wrapper');
  const previewImage = document.getElementById('uploadfile-1-preview');
  if (imageWrapper && previewImage) {
      // Hide the current image
      previewImage.style.opacity = '0.3';
      
      // Create and add the loader if it doesn't exist
      let loader = imageWrapper.querySelector('.photo-loader');
      if (!loader) {
          loader = document.createElement('div');
          loader.className = 'photo-loader';
          loader.innerHTML = `
              <div class="spinner"></div>
          `;
          
          // Add loader styles
          const style = document.createElement('style');
          style.textContent = `
              .photo-loader {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: rgba(255, 255, 255, 0.7);
              }
              .spinner {
                  width: 40px;
                  height: 40px;
                  border: 4px solid #f3f3f3;
                  border-top: 4px solid #3498db;
                  border-radius: 50%;
                  animation: spin 1s linear infinite;
              }
              @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }
          `;
          document.head.appendChild(style);
          
          imageWrapper.appendChild(loader);
      } else {
          loader.style.display = 'flex';
      }
  }
}

function HidePhotoLoaderFG() {
  const imageWrapper = document.querySelector('.image-wrapper');
  const previewImage = document.getElementById('uploadfile-1-preview');
  const loader = document.querySelector('.photo-loader');
  
  if (previewImage) {
      previewImage.style.opacity = '1';
  }
  
  if (loader) {
      loader.style.display = 'none';
  }
}

