console.log("************************************************");
localStorage.setItem("scriptVersion", "84");
var cityOld = localStorage.getItem("city");
if (cityOld === "alger") {
  localStorage.setItem("city", "Algiers");
}
if (cityOld === "oran") {
  localStorage.setItem("city", "Oran");
}
if (
  (cityOld === "alger" || cityOld === "oran") &&
  currentUrl.includes("https://www.blsspainmorocco.net")
) {
  localStorage.setItem("city", "Casablanca");
}
if (!localStorage.getItem("selectionVisaType")) {
  localStorage.setItem("selectionVisaType", "Schengen Visa");
}

var baseUrlServer = "https://localhost:7087";
baseUrlServer = "https://devserver.ddnsking.com";
//const apiUrl = `${baseUrlServer}/api/Bls/GetFirstEmailOtp`;
// Get the current page title
var currentUrl = window.location.href;

if (
  document.body.textContent.includes(
    "[Fiddler] The connection to the upstream proxy/gateway failed"
  )
) {
  window.location.reload();
}

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


var reqQueue = [];
// Optionally, you can override the send method to capture the request body
var originalXHRSend = window.XMLHttpRequest.prototype.send;

window.XMLHttpRequest.prototype.send = function () {
  this._requestBody = arguments[0]; // Save the request body
  originalXHRSend.apply(this, arguments);
};

var bookNewAppointmentLink;

// Check if overlay element exists
var overlay = document.getElementById("global-overlay");
if (overlay) {
  // Set the size of the overlay
  overlay.style.width = "0%"; // Adjust as needed
  overlay.style.height = "0%"; // Adjust as needed
}

// Check if loader element exists
var loader = document.querySelector(".global-overlay-loader");
if (loader) {
  // Set the size of the loader
  loader.style.width = "50px"; // Adjust as needed
  loader.style.height = "50px"; // Adjust as needed
}

// Create a panel element
var panellll = document.createElement("div");
var contentttt = document.createTextNode(
  "BruteForce V" + localStorage.getItem("scriptVersion")
);

panellll.id = "panel";

let notificationElement;
let menuElement;

function initializeHeaderComponents() {
  // Select or create the header element
  let headerElement = document.querySelector('body > header');

  if (!headerElement) {
    console.log("Header element not found. Creating a new header.");
    headerElement = document.createElement('header');
    document.body.insertBefore(headerElement, document.body.firstChild);
  }

  // Create the container for both elements
  const headerComponentsContainer = document.createElement('div');
  headerComponentsContainer.style.width = '100%';

  // Create the notification area
  notificationElement = document.createElement('div');
  notificationElement.id = 'user-notification-zone';
  notificationElement.textContent = 'Welcome to our website!'; // Default notification
  notificationElement.style.textAlign = 'center';
  notificationElement.style.width = '100%';
  notificationElement.style.padding = '10px 0';
  notificationElement.style.backgroundColor = '#f0f0f0';

  // Create the menu bar
  menuElement = document.createElement('div');
  menuElement.id = 'navigation-menu-strip';
  // menuElement.textContent = 'Menu items will go here'; // Placeholder text
  menuElement.style.textAlign = 'center';
  menuElement.style.width = '100%';
  menuElement.style.padding = '10px 0';
  menuElement.style.backgroundColor = '#e0e0e0';

  // Append notification area and menu bar to the container
  headerComponentsContainer.appendChild(notificationElement);
  headerComponentsContainer.appendChild(menuElement);

  // Insert the container as the first child of the header
  headerElement.insertBefore(headerComponentsContainer, headerElement.firstChild);

}


if (isBlsWebSite) {
  // Call the function to create and append the button
  initializeHeaderComponents();
  addButtonToMenu('Manage Client', () => manageClientButton('manageClientbtnId'), "switchCategoryButtonId");
  addButtonToMenu(localStorage.getItem('selection'), () => categorySwitcher('switchCategoryButtonId'), "switchCategoryButtonId");
  addButtonToMenu(localStorage.getItem('email') || "No user", () => aliasSwitcher('switchAliasButtonId'), "switchAliasButtonId");
  let useLocalCaptchaUI = JSON.parse(localStorage.getItem('local_captcha'));
  if (useLocalCaptchaUI === null) {
    useLocalCaptchaUI = true;
    localStorage.setItem('local_captcha', JSON.stringify(true));
  }
  let useLocalCaptchaUIText ="trueCaptcha" ;
  if(useLocalCaptchaUI){
    useLocalCaptchaUIText = "Local captcha";
  }
  addButtonToMenu(useLocalCaptchaUIText, () => captchaSwitcher('switchCaptchaButtonId'), "switchCaptchaButtonId");
  let switchPasswordButtonName = "no password selected";
  if(localStorage.getItem('passwordchanged')==='false'){
    switchPasswordButtonName = "temp passowrd";

  } else if (localStorage.getItem('passwordchanged')==='true'){
    switchPasswordButtonName ="regular password";
  }
  
  addButtonToMenu(switchPasswordButtonName, () => passwordSwitcher('passwordSwitcherButtonId'), "passwordSwitcherButtonId");

  // Add "Copy to Clipboard" button
addButtonToMenu('Copy Profile Data', copyProfileDataToClipboard, 'copyProfileDataButton');

// Add small text input for JSON data and save button
const inputField = document.createElement('input');
inputField.id = 'profileDataInput';
inputField.placeholder = 'Paste JSON here...';
inputField.style.width = '250px';  // Smaller input box
inputField.style.margin = '5px';   // Add some margin for spacing
menuElement.appendChild(inputField);

// Add feedback area for user messages
feedbackElement = document.createElement('div');
feedbackElement.id = 'feedbackMessage';
feedbackElement.style.marginTop = '10px';  // Add space above feedback
feedbackElement.style.fontSize = '12px';   // Make it a bit smaller
menuElement.appendChild(feedbackElement);  // Append feedback element below the buttons

// Add "Save Pasted Data" button
addButtonToMenu('Save Pasted Data', saveProfileDataFromInput, 'saveProfileDataButton');

  notificationElement.textContent = "BruteForce V" + localStorage.getItem("scriptVersion");
  //createRefreshCategoryButton();
  //createUserSwitchButton();
  //createAddUserButton();
  var elementsBookAppoitment = document.getElementsByClassName(
    "nav-link new-app-active"
  );

  // Iterate over all elements with the class name "nav-link new-app-active"
  for (var i = 0; i < elementsBookAppoitment.length; i++) {
    // Check if the text content of the current element is "Book New Appointment"
    if (
      elementsBookAppoitment[i].textContent.trim() === "Book New Appointment"
    ) {
      // Log the current element
      console.log(elementsBookAppoitment[i]);
    }
  }
  if (elementsBookAppoitment[0]) {
    bookNewAppointmentLink = elementsBookAppoitment[0].getAttribute("href");
  } else {
    bookNewAppointmentLink = localStorage.getItem("vtvLink");
  }

  console.log(bookNewAppointmentLink);
  localStorage.setItem("vtvLink", bookNewAppointmentLink);

  //document.body.appendChild(panellll);

  // Style the panel
  Object.assign(panellll.style, {
    position: "fixed",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    zIndex: "9999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px", // Make it round
    padding: "10px", // Add padding for better appearance
  });

  // Add content to the panel

  //panellll.appendChild(contentttt);



}

// Check if the page title contains "404", "504", or "502"
if (
  pageTitle.includes("404") ||
  pageTitle.includes("403") ||
  pageTitle.includes("504") ||
  pageTitle.includes("500") ||
  pageTitle.includes("502") ||
  pageTitle.includes("503") ||
  pageTitle.includes("429") ||
  pageTitle.includes("Too Many Requests")
) {
  // Refresh the page
  if (
    currentUrl
      .toLocaleLowerCase()
      .includes("/css/site.css?ManageApplicant".toLowerCase()) ||
    currentUrl
      .toLocaleLowerCase()
      .includes("/css/site.css?config".toLowerCase())
  ) {
  }
  let timeOut = 1000;
  if (pageTitle.includes("Too Many Requests")) {
    timeOut = 1 * 1 * 62 * 1000
  }
  setTimeout(() => {
    window.location.reload();
  }, timeOut);
}

// Check if any element on the page contains "Backend service does not exist"
var elements = document.querySelectorAll("*");

for (var i = 0; i < elements.length; i++) {
  if (
    elements[i].textContent.includes("Backend service does not exist") ||
    elements[i].textContent.includes("502 Bad Gateway") ||
    elements[i].textContent.includes("500 Internal Server Error") ||
    elements[i].textContent.includes("403 Forbidden") ||
    elements[i].textContent.includes("504 Gateway Timeout") ||
    elements[i].textContent.includes("429 Too Many Requests") ||
    elements[i].textContent.includes("403 Forbidden") ||
    elements[i].textContent.includes("This page isn’t working") ||
    elements[i].textContent.includes("This site can’t be reached") ||
    elements[i].textContent.includes("Application Temporarily Unavailable")
  ) {
    console.log("error refreshing");
    // Refresh the page
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    // Add your code to handle the presence of the error message
    break; // Stop checking once the first occurrence is found
  }
}

// page detection expermental





// Check if serial key exists in local storage
var savedSettings = localStorage.getItem("autoFormData");
var settings = JSON.parse(savedSettings);
var serialKey;
var bypassCaptchaCall;
var bypassEmailOTP;
if (settings) {
  serialKey = settings.serialKey; // "test";
  bypassCaptchaCall = settings.byPass;
  bypassEmailOTP = settings.byPass;

  bypassCaptchaCall = settings.byPass;
  bypassEmailOTP = false;
}

//var serialKey = settings.serialKey; // localStorage.getItem("serialKey");

// Check if the current URL contains 'algeria.blsspainglobal.com' or 'playground.bioid.com'
// and if the URL is not 'https://algeria.blsspainglobal.com/css/site.css?SerialKey'
if (
  !serialKey &&
  window.location.href.includes(baseTarget) &&
  !window.location.href.includes(baseTarget + "/css/site.css?config")
) {
  // Redirect the user to the specified URL
  window.location.href = baseTarget + "/css/site.css?config";
}

var progressBarCall = document.getElementById("progress-percent");


var useTwostepLogin = true;
if (baseTarget.includes("www.blsspainmorocco.net")) {
  useTwostepLogin = true;
}

if (
  currentUrl
    .toLocaleLowerCase()
    .includes("/css/site.css?ManageApplicant".toLowerCase())
) {
  console.log("manage application");
  /*
  var originalXHROpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function (method, url) {
    // Store method as a property for later access
    this._url = url;
    this._method = method;
    originalXHROpen.apply(this, arguments);
  };
*/
  // Remove existing content from the body
  document.body.innerHTML = "";
  //document.body.appendChild(panellll);
  initializeHeaderComponents();

  if (!localStorage.getItem("jumpWhenDatesAvailable")) {
    localStorage.setItem("jumpWhenDatesAvailable", "true");
  }

  setInterval(() => {
    var jumpWhenDatesAvailable = localStorage.getItem("jumpWhenDatesAvailable");
    //console.log(jumpWhenDatesAvailable);

    // Check if the value is "true" (as a string), after trimming whitespace
    if (jumpWhenDatesAvailable && jumpWhenDatesAvailable.trim() === "true") {
      //getNotification();
    } else {
      //console.log(jumpWhenDatesAvailable);
    }
  }, 5000);

  // Load data from local storage if it exists
  var savedEmail = localStorage.getItem("email");
  var savedEmailPassword = localStorage.getItem("emailpassword");
  var savedBlsPassword = localStorage.getItem("blspassword");
  var savedImage1 = localStorage.getItem("image1");
  var savedImage2 = localStorage.getItem("image2");
  var savedProfileImage = localStorage.getItem("profileimage");
  var savedIndividuals = localStorage.getItem("individuals");
  var savedSelection = localStorage.getItem("selection");
  var savedSelectionVisaType = localStorage.getItem("selectionVisaType");
  var savedSelectionVisaSubType = localStorage.getItem("selectionVisaSubType");
  var savedCity = localStorage.getItem("city");
  var savedBirthplace = localStorage.getItem("birthplace");
  var savedTravelDate = localStorage.getItem("traveldate");
  var savedGender = localStorage.getItem("gender") || "Male"; // Set default gender to "Male"
  var savedAccommodation = localStorage.getItem("accommodation") || "Hotel"; // Set default accommodation to "Hotel"

  // Create container div
  var container = document.createElement("div");
  container.style.width = "50%";
  container.style.margin = "20px auto";
  container.style.padding = "20px";
  container.style.border = "1px solid #ccc";
  container.style.borderRadius = "10px";
  container.style.backgroundColor = "#f9f9f9";

  // Profile Image Placeholder
  var profileImageContainer = document.createElement("div");
  profileImageContainer.style.textAlign = "center";
  profileImageContainer.style.marginBottom = "20px";

  var profileImageInput = document.createElement("input");
  profileImageInput.type = "file";
  profileImageInput.accept = "image/*";
  profileImageInput.style.display = "none";

  var profileImageLabel = document.createElement("label");
  profileImageLabel.innerHTML = "Upload Profile Image";
  profileImageLabel.style.backgroundColor = "#4CAF50";
  profileImageLabel.style.color = "white";
  profileImageLabel.style.padding = "10px";
  profileImageLabel.style.borderRadius = "5px";
  profileImageLabel.style.cursor = "pointer";
  profileImageLabel.style.display = "inline-block";

  var profileImage = document.createElement("img");
  profileImage.style.width = "100px"; // Set your preferred size
  profileImage.style.height = "100px";
  profileImage.style.borderRadius = "50%";
  profileImage.style.objectFit = "cover";
  profileImage.style.marginBottom = "10px";

  // Create a button element
  const buttonChina = document.createElement("button");
  //buttonChina.textContent = "Go to China website";
  buttonChina.textContent = "Go to Morocco website";

  // Define the link you want to navigate to
  //const linkToNavigate = "https://spain.blscn.cn/css/site.css?ManageApplicant";
  const linkToNavigate =
    "https://www.blsspainmorocco.net/css/site.css?manageapplicant";
  // Add a click event listener to the button
  buttonChina.addEventListener("click", function () {
    // Navigate to the specified link when the button is clicked
    window.location.href = linkToNavigate;
  });

  profileImageLabel.addEventListener("click", function () {
    profileImageInput.click();
  });

  profileImageInput.addEventListener("change", function (event) {
    var file = event.target.files[0];

    if (file) {
      profileImage.src = "";
      var reader = new FileReader();

      reader.onload = function (e) {
        //profileImage.src = e.target.result;

        // Save profile image to local storage
        localStorage.setItem("profileimage", e.target.result);
      };

      reader.readAsDataURL(file);
      setTimeout(() => {
        uploadImageSaveId();
      }, 1000);
    }
  });

  // Append profile image elements to the container
  profileImageContainer.appendChild(profileImage);
  profileImageContainer.appendChild(profileImageInput);
  profileImageContainer.appendChild(profileImageLabel);
  if (!currentUrl.includes("https://www.blsspainmorocco.net")) {
    container.appendChild(buttonChina);
  }

  container.appendChild(profileImageContainer);

  function uploadImageSaveId() {
    function loadjQuery(callback) {
      var scriptjq = document.createElement("script");
      scriptjq.src = "https://code.jquery.com/jquery-3.6.0.min.js"; // Replace the URL with the jQuery library URL you want to use
      scriptjq.onload = callback;
      document.head.appendChild(scriptjq);
    }

    loadjQuery(function () {
      //const imageUrl = 'https://i.imgur.com/TJ9cVam.jpeg'; // Replace this with the URL of the image you want to upload

      // Your base64-encoded image data
      const base64Image = localStorage.getItem("profileimage"); // Replace this with your actual base64 data

      // Convert the base64 string to a binary array
      const binaryData = atob(base64Image.split(",")[1]);

      // Create a Uint8Array from the binary data
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }

      // Create a Blob from the Uint8Array
      const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Replace 'image/jpeg' with the actual MIME type of your image

      // Create a Blob URL from the Blob
      const blobUrl = URL.createObjectURL(blob);
      console.log("Blob URL:", blobUrl);

      if (true) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", blobUrl, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
          if (xhr.status === 200) {
            const blob = xhr.response;
            const fd = new FormData();
            fd.append("file", blob, "image.jpg");
            $.ajax({
              url: targetCounry + "/query/UploadProfileImage",
              type: "post",
              data: fd,
              contentType: false,
              processData: false,
              success: function (result) {
                if (result.success) {
                  localStorage.setItem("profilepicId", result.fileId);
                  profileImage.src = `${targetCounry}/query/getfile?fileid=${result.fileId}`;
                  /*
                $("#uploadfile-1-preview").attr(
                  "src",
                  `${targetCounry}/query/getfile?fileid=${result.fileId}`
                );*/

                  //alert('success');
                } else {
                  alert(result.err);
                  //autoUploadImage();
                }
              },
              error: function (xhr, status, error) {
                //localStorage.setItem("profilepicId", "");
                alert("error: " + xhr.status);
              },
            });
          } else {
            //alert("Failed to retrieve the image from the URL.");
            //localStorage.setItem("profilepicId", "");
            alert("error: " + xhr.status);
          }
        };
        xhr.send();
      }
    });
  }

  // Create save button at the top
  var saveButtonTop = document.createElement("button");
  saveButtonTop.innerHTML = "Save";
  saveButtonTop.style.width = "100%";
  saveButtonTop.style.padding = "10px";
  saveButtonTop.style.backgroundColor = "#4CAF50";
  saveButtonTop.style.color = "white";
  saveButtonTop.style.border = "none";
  saveButtonTop.style.borderRadius = "5px";
  saveButtonTop.style.cursor = "pointer";
  saveButtonTop.style.marginBottom = "20px";

  saveButtonTop.addEventListener("click", function () {
    // Save values to local storage
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("emailpassword", emailPasswordInput.value);
    localStorage.setItem("blspassword", blsPasswordInput.value);
    localStorage.setItem("individuals", individualsInput.value);
    localStorage.setItem("selection", selectionInput.value);
    localStorage.setItem("selectionVisaType", selectionInputVisaType.value);
    localStorage.setItem(
      "selectionVisaSubType",
      selectionInputVisaSubType.value
    );
    localStorage.setItem("city", cityInput.value);
    localStorage.setItem("birthplace", birthplaceInput.value);
    localStorage.setItem("traveldate", dateInput.value);
    localStorage.setItem("gender", genderInput.value);
    localStorage.setItem("accommodation", accommodationInput.value);
    localStorage.setItem("image1", image1Input.value);
    localStorage.setItem("image2", image2Input.value);
    //localStorage.setItem("profileimage", profileImage.src);
  });

  // Append save button to the container
  container.appendChild(saveButtonTop);

  // Create input fields
  function createInput(type, value, placeholder) {
    var input = document.createElement("input");
    input.type = type;
    input.value = value || "";
    input.placeholder = placeholder;
    input.style.width = "100%";
    input.style.marginBottom = "10px";
    input.style.padding = "8px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "5px";
    return input;
  }

  var emailInput = createInput("text", savedEmail, "Email");
  var emailPasswordInput = createInput(
    "text",
    savedEmailPassword,
    "Email Password"
  );
  var blsPasswordInput = createInput("text", savedBlsPassword, "BLS Password");
  var individualsInput = createInput(
    "number",
    savedIndividuals || "1",
    "Individuals"
  );
  var birthplaceInput = createInput("text", savedBirthplace, "Birthplace");

  // Create selection dropdowns
  function createSelect(options, value, placeholder) {
    var select = document.createElement("select");
    select.style.width = "100%";
    select.style.marginBottom = "10px";
    select.style.padding = "8px";
    select.style.border = "1px solid #ccc";
    select.style.borderRadius = "5px";

    options.forEach(function (option) {
      var optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.text = option.charAt(0).toUpperCase() + option.slice(1);
      console.log("value is: ", value);
      if (value != null && option === value) {
        optionElement.selected = true; // Set the default selected option
      }
      select.appendChild(optionElement);
    });

    select.setAttribute("placeholder", placeholder);

    return select;
  }

  var selectionOptions = ["Normal", "Premium", "Prime Time"];
  var selectionInput = createSelect(
    selectionOptions,
    savedSelection,
    "Selection"
  );

  var selectionOptionsVisaType = [
    "Schengen Visa",
    "First application / première demande",
    "Visa renewal / renouvellement de visa",
    "Schengen Visa - First Demand",
    "Schengen Visa - Previous Visa Holder",
    "National Visa",
    "Casa 1",
    "Casa 2",
    "Casa 3",
    "Schengen visa ( Estonia)",
    "Tourist Visa",
  ];
  var selectionInputVisaType = createSelect(
    selectionOptionsVisaType,
    savedSelectionVisaType,
    "Selection"
  );

  var selectionOptionsVisaSubType = [
    "Schengen Visa",
    "Algiers 1",
    "Algiers 2",
    "Algiers 3",
    "Algiers 4",
    "Oran 1",
    "Oran 2",
    "Oran 3",
    "Oran 4",
    "Schengen Visa - First Demand",
    "Schengen Visa - Previous Visa Holder",
    "National Visa",
    "Student Visa",
    "Students - Non-tertiary studies",
    "Family Reunification Visa",
    "Work Visa",
    "Casa 1",
    "Casa 2",
    "Casa 3",
    "Schengen visa ( Estonia)",
    "Tourist Visa",
  ];
  var selectionInputVisaSubType = createSelect(
    selectionOptionsVisaSubType,
    savedSelectionVisaSubType,
    "Selection"
  );

  var cityOptions = ["Algiers", "Oran"];
  if (currentUrl.includes("blsspainmorocco.net")) {
    cityOptions = [
      "Casablanca",
      "Nador",
      "Rabat",
      "Tetouan",
      "Tangier",
      "Agadir",
    ];
  }

  if (currentUrl.includes("qatar.blsspainglobal.com")) {
    cityOptions = [
      "Doha",
    ];
  }
  var cityInput = createSelect(cityOptions, savedCity, "City");

  var genderOptions = ["Male", "Female"];
  var genderInput = createSelect(genderOptions, savedGender, "Gender");

  var accommodationOptions = ["Invitation", "Hotel"];
  var accommodationInput = createSelect(
    accommodationOptions,
    savedAccommodation,
    "Accommodation"
  );

  // Create date input
  var dateInput = document.createElement("input");
  dateInput.type = "text";
  dateInput.value = savedTravelDate || "";
  dateInput.placeholder = "Travel Date (YYYY-MM-DD)";
  dateInput.style.width = "100%";
  dateInput.style.marginBottom = "10px";
  dateInput.style.padding = "8px";
  dateInput.style.border = "1px solid #ccc";
  dateInput.style.borderRadius = "5px";

  // Create image elements and input fields for images
  var imagesContainer = document.createElement("div");
  imagesContainer.style.display = "flex";
  imagesContainer.style.marginBottom = "20px";

  var image1Container = document.createElement("div");
  image1Container.style.flex = "1";
  image1Container.style.marginRight = "10px";

  var image1Input = createInput("text", savedImage1, "Image 1");
  var image1Element = document.createElement("img");
  image1Element.src = savedImage1 || "";
  image1Element.style.width = "100%";

  var image2Container = document.createElement("div");
  image2Container.style.flex = "1";

  var image2Input = createInput("text", savedImage2, "Image 2");
  var image2Element = document.createElement("img");
  image2Element.src = savedImage2 || "";
  image2Element.style.width = "100%";

  // Save button
  var saveButton = document.createElement("button");
  saveButton.innerHTML = "Save";
  saveButton.style.width = "100%";
  saveButton.style.padding = "10px";
  saveButton.style.backgroundColor = "#4CAF50";
  saveButton.style.color = "white";
  saveButton.style.border = "none";
  saveButton.style.borderRadius = "5px";
  saveButton.style.cursor = "pointer";

  saveButton.addEventListener("click", function () {
    // Save values to local storage
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("emailpassword", emailPasswordInput.value);
    localStorage.setItem("blspassword", blsPasswordInput.value);
    localStorage.setItem("individuals", individualsInput.value);
    localStorage.setItem("selection", selectionInput.value);
    localStorage.setItem("selectionVisaType", selectionInputVisaType.value);
    localStorage.setItem(
      "selectionVisaSubType",
      selectionInputVisaSubType.value
    );
    localStorage.setItem("city", cityInput.value);
    localStorage.setItem("birthplace", birthplaceInput.value);
    localStorage.setItem("traveldate", dateInput.value);
    localStorage.setItem("gender", genderInput.value);
    localStorage.setItem("accommodation", accommodationInput.value);
    localStorage.setItem("image1", image1Input.value);
    localStorage.setItem("image2", image2Input.value);
    //localStorage.setItem("profileimage", profileImage.src);
  });

  var testEmailButton = document.createElement("button");
  testEmailButton.textContent = "Test Email";
  testEmailButton.style.padding = "10px";
  testEmailButton.style.backgroundColor = "#4CAF50";
  testEmailButton.style.color = "white";
  testEmailButton.style.border = "none";
  testEmailButton.style.borderRadius = "5px";
  testEmailButton.style.cursor = "pointer";
  testEmailButton.onclick = function () {
    notificationElement.textContent = "Email checking...";
    /*
    checkForEmailOnly(
      localStorage.getItem("email"),
      localStorage.getItem("emailpassword")
    );
    */

    getOtpAsync();
  };

  var testPasswordButton = document.createElement("button");
  testPasswordButton.textContent = "Test password";
  testPasswordButton.style.padding = "10px";
  testPasswordButton.style.backgroundColor = "#4CAF50";
  testPasswordButton.style.color = "white";
  testPasswordButton.style.border = "none";
  testPasswordButton.style.borderRadius = "5px";
  testPasswordButton.style.cursor = "pointer";
  testPasswordButton.onclick = function () {
    notificationElement.textContent = "password checking...";
    /*
    checkForEmailOnly(
      localStorage.getItem("email"),
      localStorage.getItem("emailpassword")
    );
    */

    getPasswordAsync();
  };
  // Check if checkbox status exists in local storage
  var jumpWhenDatesAvailable = localStorage.getItem("jumpWhenDatesAvailable");

  // Create checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "jumpCheckbox";
  checkbox.checked = jumpWhenDatesAvailable === "true"; // Set checkbox status

  var label = document.createElement("label");
  label.htmlFor = "jumpCheckbox";
  label.appendChild(document.createTextNode("Jump when dates available"));

  // Append checkbox to body
  container.appendChild(checkbox);
  container.appendChild(label);

  // Add event listener for checkbox
  checkbox.addEventListener("click", function () {
    // Save checkbox status to local storage
    localStorage.setItem("jumpWhenDatesAvailable", this.checked);
  });

  // Append the button to the body of the webpage

  // Append input fields, image elements, and save button to the container
  container.appendChild(emailInput);
  container.appendChild(testEmailButton);
  container.appendChild(testPasswordButton);
  container.appendChild(emailPasswordInput);
  container.appendChild(blsPasswordInput);
  container.appendChild(individualsInput);
  container.appendChild(selectionInput);
  container.appendChild(cityInput);
  container.appendChild(selectionInputVisaType);
  container.appendChild(selectionInputVisaSubType);
  container.appendChild(birthplaceInput);
  container.appendChild(dateInput);
  container.appendChild(genderInput);
  container.appendChild(accommodationInput);

  // Append image containers
  image1Container.appendChild(image1Input);
  image1Container.appendChild(image1Element);
  imagesContainer.appendChild(image1Container);

  image2Container.appendChild(image2Input);
  image2Container.appendChild(image2Element);
  imagesContainer.appendChild(image2Container);

  container.appendChild(imagesContainer);

  container.appendChild(saveButton);

  // Append the container to the body
  document.body.appendChild(container);
  /*
  // Load profile image from local storage
  if (savedProfileImage) {
    profileImage.src = savedProfileImage;
  }*/
    let profilePicId333 = localStorage.getItem("profilepicId");

    if (profilePicId333 !== null && profilePicId333 !== '' && profilePicId333 !== undefined) {
      profileImage.src = `${targetCounry}/query/getfile?fileid=${localStorage.getItem(
        "profilepicId"
      )}`;
    } else {
        console.log("profilepicId is null, empty, or undefined.");
    }
    
  

  //////////////////////////
  function downloadImage1() {
    const imageData = localStorage.getItem("image1");
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "Selfie1.png";
    image1Container.appendChild(link);
    link.click();
    image1Container.removeChild(link);
  }

  function uploadImage1() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          localStorage.setItem("image1", event.target.result);
          //alert('Image uploaded successfully!');
          window.location.reload();
        };
        reader.readAsDataURL(file);
      }
    });

    input.click();
  }

  // Create buttons for downloading and uploading images with inline styles
  const downloadButton = document.createElement("button");
  downloadButton.innerHTML = "&#x2B07; Download Selfie1"; // Unicode character for a download arrow
  downloadButton.style.padding = "10px";
  downloadButton.style.marginRight = "10px";
  downloadButton.style.backgroundColor = "#4CAF50"; // Green background color
  downloadButton.style.color = "white"; // White text color
  downloadButton.style.border = "none";
  downloadButton.style.borderRadius = "5px";
  downloadButton.addEventListener("click", downloadImage1);

  const uploadButton = document.createElement("button");
  uploadButton.innerHTML = "&#x1F4E4; Upload Selfie1"; // Unicode character for a file upload
  uploadButton.style.padding = "10px";
  uploadButton.style.backgroundColor = "#2196F3"; // Blue background color
  uploadButton.style.color = "white"; // White text color
  uploadButton.style.border = "none";
  uploadButton.style.borderRadius = "5px";
  uploadButton.addEventListener("click", uploadImage1);

  // Append the buttons to the body or any desired location on the page
  image1Container.appendChild(downloadButton);
  image1Container.appendChild(uploadButton);
  //////////////////////////
  //////////////////////////
  function downloadImage2() {
    const imageData = localStorage.getItem("image2");
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "Selfie2.png";
    image2Container.appendChild(link);
    link.click();
    image2Container.removeChild(link);
  }

  function uploadImage2() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          localStorage.setItem("image2", event.target.result);
          //alert('Image uploaded successfully!');
          window.location.reload();
        };
        reader.readAsDataURL(file);
      }
    });

    input.click();
  }

  // Create buttons for downloading and uploading images with inline styles
  const downloadButton2 = document.createElement("button");
  downloadButton2.innerHTML = "&#x2B07; Download Selfie2"; // Unicode character for a download arrow
  downloadButton2.style.padding = "10px";
  downloadButton2.style.marginRight = "10px";
  downloadButton2.style.backgroundColor = "#4CAF50"; // Green background color
  downloadButton2.style.color = "white"; // White text color
  downloadButton2.style.border = "none";
  downloadButton2.style.borderRadius = "5px";
  downloadButton2.addEventListener("click", downloadImage2);

  const uploadButton2 = document.createElement("button");
  uploadButton2.innerHTML = "&#x1F4E4; Upload Selfie2"; // Unicode character for a file upload
  uploadButton2.style.padding = "10px";
  uploadButton2.style.backgroundColor = "#2196F3"; // Blue background color
  uploadButton2.style.color = "white"; // White text color
  uploadButton2.style.border = "none";
  uploadButton2.style.borderRadius = "5px";
  uploadButton2.addEventListener("click", uploadImage2);

  // Append the buttons to the body or any desired location on the page
  image2Container.appendChild(downloadButton2);
  image2Container.appendChild(uploadButton2);
  //////////////////////////
}
function checkVisaTypeSelectionElement() {
  const h5Elements = document.getElementsByTagName('h5');
  const targetText = 'Book New Appointment - Visa Type Selection';

  for (let element of h5Elements) {
    if (element.textContent.trim() === targetText) {
      return element; // Return the element if found
    }
  }

  return null; // Return null if not found
}

// Usage
const visaTypeSelectionElement = checkVisaTypeSelectionElement();
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/*
function randomDelay() {
  const randomTime = Math.random() * 400 + 400; // Random time between 1000ms (1s) and 2000ms (2s)
  return new Promise(resolve => setTimeout(resolve, randomTime));
}
*/
function randomDelay(from = settings.categorySpeed, to) {
  if (to === undefined) {
    to = from * 1.2;  // Set 'to' to 20% more than 'from' if not provided
  }

  const randomTime = Math.random() * (to - from) + from;
  return new Promise(resolve => setTimeout(resolve, randomTime));
}


async function clickListHolder(labelString) {
  await randomDelay();
  let nextElement = Array.from(document.getElementsByTagName('label'))
    .find(label => label.textContent.trim() === labelString && label.offsetParent !== null)
    .nextElementSibling;
  nextElement.click();
  return nextElement;

}
async function selectListFromHolder(holder, selected) {
  await randomDelay();
  let ulId = holder.getAttribute('aria-owns');
  Array.from(document.getElementById(ulId).getElementsByTagName('li'))
    .find(li => li.textContent.trim() === selected)
    .click();

}

async function selectTimeSlotFromHolder(holder, selectedTime = null) {
  await randomDelay();
  let ulId = holder.getAttribute('aria-owns');
  const listItems = Array.from(document.getElementById(ulId).getElementsByTagName('li'));

  console.log("Available time slots:");
  const availableSlots = listItems
    .map(li => {
      const slotDiv = li.querySelector('div.slot-item.bg-success');
      if (slotDiv) {
        console.log(slotDiv.textContent.trim());
        return { li, time: slotDiv.textContent.trim() };
      }
      return null;
    })
    .filter(Boolean);

  let targetSlot;

  if (selectedTime) {
    targetSlot = availableSlots.find(slot => slot.time === selectedTime);
  } else {
    // If no selectedTime is provided, choose a random available slot with bg-success class
    targetSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
  }

  if (targetSlot) {
    targetSlot.li.click();
    console.log(`Selected time slot: ${targetSlot.time}`);
    return true;  // Return true if a slot was successfully selected
  } else {
    console.error(selectedTime
      ? `Time slot ${selectedTime} not found`
      : "No available time slots with bg-success class");
    return false;  // Return false if no slot was available
  }
}


/*
async function selectTimeSlotFromHolder(holder, selectedTime = null) {
  await randomDelay();
  let ulId = holder.getAttribute('aria-owns');
  const listItems = Array.from(document.getElementById(ulId).getElementsByTagName('li'));

  console.log("Available time slots:");
  const availableSlots = listItems
    .map(li => {
      const slotDiv = li.querySelector('div.slot-item.bg-success');
      if (slotDiv) {
        console.log(slotDiv.textContent.trim());
        return { li, time: slotDiv.textContent.trim() };
      }
      return null;
    })
    .filter(Boolean);
    timeArray = availableSlots;
  let targetSlot;

  if (selectedTime) {
    targetSlot = availableSlots.find(slot => slot.time === selectedTime);
  } else {
    // If no selectedTime is provided, choose the first available slot with bg-success class
    //targetSlot = availableSlots[0];
    targetSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
  }

  if (targetSlot) {
    targetSlot.li.click();
    console.log(`Selected time slot: ${targetSlot.time}`);
  } else {
    console.error(selectedTime 
      ? `Time slot ${selectedTime} not found` 
      : "No available time slots with bg-success class");
  }
}
*/

// Usage examples:
// selectTimeSlotFromHolder(holderElement, "09:00-10:00");  // Select specific time
// selectTimeSlotFromHolder(holderElement);  // Select first available slot with bg-success class

// Usage example:
// selectTimeSlotFromHolder(holderElement, "09:00-10:00");
async function getLabelFor(labelString) {
  //await randomDelay();

  let label = Array.from(document.getElementsByTagName('label'))
    .find(label => label.textContent.trim() === labelString && label.offsetParent !== null);

  if (label) {
    return label.getAttribute('for');
  } else {
    return null; // or throw an error, depending on how you want to handle this case
  }
}
async function selectCategories() {
  await randomDelay();
  if (localStorage.getItem("individuals") > 1) {
    Array.from(document.getElementsByTagName('label'))
      .find(label => label.textContent.trim() === 'Appointment For*' && label.offsetParent !== null)
      ?.nextElementSibling.getElementsByTagName('div')[1]
      .querySelector('input[type="radio"]')
      ?.click();

    await delay(1000);
    document.querySelector('#familyDisclaimer > div > div > div.modal-footer > button.btn.btn-success').click();

    let membersHolder = await clickListHolder('Number Of Members*');
    await selectListFromHolder(membersHolder, `${localStorage.getItem("individuals")} Members`);


  }
  let locationHolder = await clickListHolder('Location*');
  await selectListFromHolder(locationHolder, `${localStorage.getItem("city")}`);

  let visaTypeHolder = await clickListHolder('Visa Type*');
  await selectListFromHolder(visaTypeHolder, `${localStorage.getItem("selectionVisaType")}`);

  let visaSubTypeHolder = await clickListHolder('Visa Sub Type*');
  await selectListFromHolder(visaSubTypeHolder, `${localStorage.getItem("selectionVisaSubType")}`);

  let CategoryHolder = await clickListHolder('Category*');
  await selectListFromHolder(CategoryHolder, `${localStorage.getItem("selection")}`);

  document.getElementById('btnSubmit').click();


}

function checkForEmailOnly(email, emailpassword) {
  // Your API endpoint
  const apiUrl = `${baseUrlServer}/api/Bls/GetFirstEmailOtp`;

  // Create a request object
  const request = {
    email: email,
    emailPassword: emailpassword,
    blsPassword: settings.serialKey,
  };

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open("POST", apiUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  // Define a callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // Check if the request was successful
      if (xhr.status === 200) {
        // Parse the response as JSON
        const data = JSON.parse(xhr.responseText);
        // Handle the data
        if (data && data.otp) {
          localStorage.setItem("testEmailResult", data.otp);
          localStorage.setItem("lastTimeEmailCheck", Date.now());
          notificationElement.textContent = data.otp;
        }
      } else {
        notificationElement.textContent = "Failled to connect to the OTP server";
        console.log("No OTP Found");
      }
    }
  };

  // Convert the request object to JSON and send the request
  xhr.send(JSON.stringify(request));
}

function checkVisaSlotSelectionElement() {



  const h5Elements = document.getElementsByTagName('h5');
  const targetText = 'Book New Appointment - Slot Selection';

  for (let element of h5Elements) {
    if (element.textContent.trim() === targetText) {
      return element; // Return the element if found
    }
  }

  return null; // Return null if not found
}

const visaSlotSelectionElement = checkVisaSlotSelectionElement();
/*
let getSlotsBydateAction = 'GetAvailableSlotsByDate?data';
async function logResponseVtv() {
  // Check if the request is completed
  if (this.readyState === 4) {
    console.log("API call intercepted hhhhhhhhhhhhhhhhhhhhh:", {
      // method: this._method, // Access the method using _method property
      //url: this.responseURL, // Access the URL using responseURL property
      //status: this.status,
      //responseText: this.responseText,
    });
    try {
      console.log(this.status);
      // Check if the URL includes "BlsAppointment/VisaAppointmentForm?appointmentId=" and the status is not success
      if (this.responseURL.includes(getSlotsBydateAction) && this.status !== 200) {
        console.log("HTML Error:", this.status);
        let timeOut = 5000;
        if (this.status === 429) {
          timeOut = 100000;
        }
        setTimeout(() => {
          //document.getElementById("btnSubmit").click();
        }, timeOut);
      }
      if (this.status === 200 && (this.responseURL.includes(getSlotsBydateAction))) {
        console.log('now going to select the time Slot');
        selectTheTime();
      } else if (this.responseURL.includes(getSlotsBydateAction) && (this.status === 504 || this.status === 502 || this.status === 503)) {
        console.log('now going to reselect the date Slot');
        selectTheDate();
      } else if (this.status === 429 && (this.responseURL.includes(getSlotsBydateAction))) {
        console.log('now going to select the date Slot');
        await delay(120*1000);
        selectTheDate();
      } else if (this.status === 429 && (this.responseURL.includes(getSlotsBydateAction))) {
        console.log('now going to select the date Slot');
        await delay(60*1000);
        selectTheDate();
      }
    } catch {
      console.log("error");
    }
  }
}

// Intercept XMLHttpRequest
var originalXHROpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (method, url) {
  // Store method as a property for later access
  this._url = url;
  this._method = method;
  this.addEventListener("load", logResponseVtv);
  originalXHROpen.apply(this, arguments);
};
*/
var datesArray;
var timeArray;
var dateTimeSelectedOne = false;

async function selectTheDate() {

  let dateSlotID = await getLabelFor("Appointment Date*");
  if (dateTimeSelectedOne) {

    createrefreshDateButton();
    selectDate(dateSlotID);
    dateTimeSelectedOne = true;
    window[`${dateSlotID}_ondatechange`]();

  } else {
    delay(60 * 1000);
    selectDate(dateSlotID);

    window[`${dateSlotID}_ondatechange`]();
  }


}
function createrefreshDateButton() {
  // Create a new button element
  const refreshButton_xyz = document.createElement('button');
  refreshButton_xyz.id = 'refreshDateButton_xyz'; // Assign a unique id to the button
  refreshButton_xyz.innerText = 'Refresh Date'; // Button text

  // Style the button to overlay on the right side of the page
  refreshButton_xyz.style.position = 'fixed';
  refreshButton_xyz.style.top = '60px'; // Position it below the OTP button
  refreshButton_xyz.style.right = '20px';
  refreshButton_xyz.style.padding = '10px 20px';
  refreshButton_xyz.style.backgroundColor = '#4CAF50'; // A different color for this button
  refreshButton_xyz.style.color = 'white';
  refreshButton_xyz.style.border = 'none';
  refreshButton_xyz.style.borderRadius = '5px';
  refreshButton_xyz.style.cursor = 'pointer';
  refreshButton_xyz.style.zIndex = '9999'; // Ensures it's on top of other elements

  // Attach an event listener to refresh the date
  refreshButton_xyz.onclick = function () {
    window[`${dateSlotID}_ondatechange`]();
  };

  // Append the button to the body
  document.body.appendChild(refreshButton_xyz);
}
async function selectTheTime() {




  let timeSlotHolder = await clickListHolder("Appointment Slot*");
  console.log(timeSlotHolder);
  let result = await selectTimeSlotFromHolder(timeSlotHolder);

  if (result) {
    console.log("Time slot selected successfully.");
    $('#btnSubmit').click();
  } else {
    console.log("No available time slot found select another date");
    selectTheDate();
  }


  //await selectListFromHolder(locationHolder, `${localStorage.getItem("city")}`);



}

if (visaSlotSelectionElement) {
  console.log('The visa slot selection element exists:', visaTypeSelectionElement);

  let getSlotsBydateAction = 'GetAvailableSlotsByDate?data';
  async function logResponseVtv() {
    // Check if the request is completed
    if (this.readyState === 4) {
      console.log("API call intercepted hhhhhhhhhhhhhhhhhhhhh:", {
        // method: this._method, // Access the method using _method property
        //url: this.responseURL, // Access the URL using responseURL property
        //status: this.status,
        //responseText: this.responseText,
      });
      try {
        console.log(this.status);
        // Check if the URL includes "BlsAppointment/VisaAppointmentForm?appointmentId=" and the status is not success
        if (this.responseURL.includes(getSlotsBydateAction) && this.status !== 200) {
          console.log("HTML Error:", this.status);
          let timeOut = 5000;
          if (this.status === 429) {
            timeOut = 100000;
          }
          setTimeout(() => {
            //document.getElementById("btnSubmit").click();
          }, timeOut);
        }
        if (this.status === 200 && (this.responseURL.includes(getSlotsBydateAction))) {
          console.log('now going to select the time Slot');
          selectTheTime();
        } else if (this.responseURL.includes(getSlotsBydateAction) && (this.status === 504 || this.status === 502 || this.status === 503)) {
          console.log('now going to reselect the date Slot');
          selectTheDate();
        } else if (this.status === 429 && (this.responseURL.includes(getSlotsBydateAction))) {
          console.log('now going to select the date Slot');
          await delay(120 * 1000);
          selectTheDate();
        } else if (this.status === 429 && (this.responseURL.includes(getSlotsBydateAction))) {
          console.log('now going to select the date Slot');
          await delay(60 * 1000);
          selectTheDate();
        }
      } catch {
        console.log("error");
      }
    }
  }

  // Intercept XMLHttpRequest
  var originalXHROpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function (method, url) {
    // Store method as a property for later access
    this._url = url;
    this._method = method;
    this.addEventListener("load", logResponseVtv);
    originalXHROpen.apply(this, arguments);
  };

  selectTheDate();
} else {
  console.log('The visa slot selection element does not exist.');
}
if (visaTypeSelectionElement) {
  console.log('The visa type selection element exists:', visaTypeSelectionElement);
  selectCategories();
} else {
  console.log('The visa type selection element does not exist.');
}
if (currentUrl.includes("Appointment/ApplicantSelection")) {

  const otpButton_xyz1 = document.createElement('button');
  otpButton_xyz1.innerText = 'Get Otp'; // Button text

  // Style the button to overlay on the right side of the page
  otpButton_xyz1.style.position = 'fixed';
  otpButton_xyz1.style.top = '20px';
  otpButton_xyz1.style.right = '20px';
  otpButton_xyz1.style.padding = '10px 20px';
  otpButton_xyz1.style.backgroundColor = '#FF5733';
  otpButton_xyz1.style.color = 'white';
  otpButton_xyz1.style.border = 'none';
  otpButton_xyz1.style.borderRadius = '5px';
  otpButton_xyz1.style.cursor = 'pointer';
  otpButton_xyz1.style.zIndex = '9999'; // Ensures it's on top of other elements

  // Attach an event listener to call a random action
  otpButton_xyz1.onclick = function () {
    console.log('Random Action: OTP fetched!');
    if (!document.getElementById("EmailCode").value) {
      // You can add your actual OTP fetching function here, like:
      getCallendarOtpAsync();

    } else {
      console.log("otp already pasted");
      var datePicker = $("#TravelDate").data("kendoDatePicker");
      datePicker.value(new Date(new Date().setMonth(new Date().getMonth() + 3)));
      datePicker.trigger("change");

      document.getElementById('btnSubmit').click();
    }


  };

  // Add the button to the page
  document.body.appendChild(otpButton_xyz1);

  let photoID = JSON.parse(localStorage.getItem('profileData') || '{}').app_profilePicId;

  if (photoID) {
      $("#uploadfile-1-preview").attr("src", targetCounry + "/query/getfile?fileid=" + photoID);
      $("#ApplicantPhotoId").val(photoID);
  }
  document.querySelector('.rdo-applicant[id^="rdo-"]').click();

  setTimeout(() => {
    otpButton_xyz1.click();

  }, 5 * 1000);


}

// Async function to handle clicking buttons with delay
async function skipAllPayment() {
  let isPayment = false;
  for (let i = 1; i <= 10; i++) {
      // Updated selector to match the structure
      const buttonSelector = `#vas_${i} > div > div.card-footer.p-0.pt-4 > div > div.col-md-3.col-sm-12 > button`;

      // Check if the element exists
      const button = document.querySelector(buttonSelector);

      // If the button exists, click it
      if (button) {
          isPayment = true;
          button.click();
      }

      // Wait for 1 second (1000 ms) before moving to the next button
      await delay(1000);
  }
  if(isPayment===false)
      return;
  // After the loop, wait for 1 second (1000 ms)
  await delay(1000);

  // Click the #btnPayAmount button after the delay
  const payButton = document.querySelector('#btnPayAmount');
  if (payButton) {
      payButton.click();
      console.log('#btnPayAmount clicked.');
  } else {
      console.log('#btnPayAmount not found.');
  }

  // After another 1 second delay, click the #payConfirm button
  await delay(1000);

  const confirmButton = document.querySelector('#payConfirm');
  if (confirmButton) {
      confirmButton.click();
      console.log('#payConfirm clicked.');
  } else {
      console.log('#payConfirm not found.');
  }
}

// Call the function to start the process
skipAllPayment();

setTimeout(() => {
  // Check if the #payConfirm element exists
if (document.querySelector('#payConfirm')) {
    
  // Create the Repay button
  let repayButton = document.createElement('button');
  repayButton.id = 'repayButton';
  repayButton.innerText = 'Repay';
  repayButton.classList.add('btn', 'btn-success');
  
  // Insert the Repay button next to the #payConfirm button
  document.querySelector('#payConfirm').insertAdjacentElement('afterend', repayButton);
  
  // Add event listener to enable #payConfirm and simulate a click on it
  repayButton.addEventListener('click', function() {
      let payConfirmButton = document.querySelector('#payConfirm');
      payConfirmButton.disabled = false;  // Enable the payConfirm button
      payConfirmButton.click();  // Simulate a click on the payConfirm button
      payConfirmButton.disabled = true;
  });
  
} else {
  //console.log('Element #payConfirm not found.');
}

}, 2000);

setTimeout(() => {
  Array.from(document.querySelectorAll('button.btn.btn-primary[type="submit"]')).find(btn => btn.textContent.trim() === "Yes, I want to start a new appointment")?.click();
  Array.from(document.querySelectorAll('a.btn.btn-primary')).find(link => link.textContent.trim() === "Book New Appointment")?.click();
  Array.from(document.querySelectorAll('button.btn.btn-primary')).find(btn => btn.textContent.trim() === "I agree to provide my consent")?.click();
  Array.from(document.querySelectorAll('button.btn.btn-success[type="submit"]')).find(btn => btn.textContent.trim() === "Accept")?.click();
}, 2000);
if (document.querySelector('body > h1')?.textContent.trim() === 'Too Many Requests') {
  console.log("too many request refresh in 2 mins");
  setTimeout(() => {
    location.reload();
  }, 1000 * 60 * 2);
}
if (document.querySelector('body > main > section > div > div > h5')?.textContent.trim().includes("We're sorry, something went wrong")) {
  // Perform the action if the message is present
  setTimeout(() => {
    // Refresh the page
    location.reload();
  }, settings.refreshCooldown * 1000); // Adjust the refresh cooldown as needed
}


if (document.querySelector('#div-main > div.col-12.alert.alert-danger')?.textContent.trim() === 'Currently, no slots are available for the selected category. Kindly try again after sometime. Thank you for your patience') {
  setTimeout(() => {
    //document.querySelector('#div-main > div:nth-child(2) > a').click();
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 1000);
}
if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim().includes('You have not filled out and completed the applicant detail form for the selected location and visa type. Please complete the form before booking an appointment.')) {
  setTimeout(() => {
    // Click the button instead of the navbar link
    document.querySelector('#div-main > div:nth-child(2) > a')?.click();
  }, 1000); // You can adjust the multiplier as needed
}

if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim().includes('You have reached maximum number of requests from your network. Please try after sometime')) {//You have reached maximum number of requests from this account. Please try after sometime
  setTimeout(() => {
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 3 * 1000);//}, settings.refreshCooldown*1000);

}
if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim().includes('You have reached the maximum number of individual appointments allowed for your registered account and/or network.')) {//You have reached maximum number of requests from this account. Please try after sometime
  setTimeout(() => {
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 3 * 1000);//}, settings.refreshCooldown*1000);

}
if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim().includes('You have reached maximum number of requests from this account. Please try after sometime')) {//You have reached maximum number of requests from this account. Please try after sometime
  setTimeout(() => {
    //document.querySelector('#navbarCollapse2 > ul > li:nth-child(2) > a').click();
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 3 * 1000);//}, settings.refreshCooldown*1000);

}
if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim().includes('Invalid request parameter')) {//You have reached maximum number of requests from this account. Please try after sometime
  setTimeout(() => {
    //document.querySelector('#navbarCollapse2 > ul > li:nth-child(2) > a').click();
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 1000);//}, settings.refreshCooldown*1000);

}
if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim().includes('Invalid appointment request flow')) {//You have reached maximum number of requests from this account. Please try after sometime
  setTimeout(() => {
    //document.querySelector('#navbarCollapse2 > ul > li:nth-child(2) > a').click();
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 1000);//}, settings.refreshCooldown*1000);

}
if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim().includes('An error occured while processing your request. Please try again after sometime')) {//You have reached maximum number of requests from this account. Please try after sometime
  setTimeout(() => {
    //document.querySelector('#navbarCollapse2 > ul > li:nth-child(2) > a').click();
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 1000);//}, settings.refreshCooldown*1000);

}
if (currentUrl.includes("changepassword?alert=True")) {
  handlePasswordChange();

}
async function handlePasswordChange() {
  // Get the value (password) from local storage
  const savedPassword = localStorage.getItem("blspassword");
  /*
  localStorage.setItem('tempPassword','');
  localStorage.setItem('passwordchanged','');
  localStorage.setItem('tempPassword','');
  */

  // Find the input element by its id (use getElementById, and make sure id is correct)
  let passwordInputElement = document.getElementById("psw-input w-300px");

  // Set the value of the input element to the retrieved password
  if (passwordInputElement && savedPassword) {


    passwordInputElement.value = localStorage.getItem('tempPassword');
    document.getElementById('psw-input1 w-300px').value = localStorage.getItem('blspassword');
    document.getElementById('psw-input2 w-300px').value = localStorage.getItem('blspassword');
    debugger;
    document.querySelector('body > main > main > div > div > div > div > div > div > div > form > div:nth-child(5) > button').click();


  }
}

// Check if 'home/index' exists in the pathname
if (currentUrl.toLowerCase().includes("home/index") && isBlsWebSite) {
  console.log("The page contains 'home/index'");
  //document.querySelector('#div-main > div:nth-child(2) > a').click();
  Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
}

if (currentUrl.includes("appointment/DataProtectionEmailSent")) {
  localStorage.setItem("blspassword", "Visa2023+@");
  // Select the paragraph element
  let paragraph = document.querySelector('body > main > div > div > div > div > p');

  // Create a new button element
  let buttonAcceptData = document.createElement('button');
  buttonAcceptData.innerHTML = 'Accept the data'; // Set the button text
  buttonAcceptData.className = 'btn btn-primary'; // Optionally, you can add a class for styling

  // Add a click event listener to run the acceptDataAsync function
  buttonAcceptData.addEventListener('click', function () {
    acceptDataAsync();
  });
  setTimeout(() => {
    acceptDataAsync();
  }, 3000);

  // Insert the button after the paragraph element
  paragraph.parentNode.insertBefore(buttonAcceptData, paragraph.nextSibling);

}

if (currentUrl.includes("appointment/dataprotectionemailaccept")) {
  document.querySelector('#navbarCollapse2 > ul > li:nth-child(3) > a').click();


}

if (document.querySelector('body > main > section > div > div > p')?.textContent.trim() === 'We are experiencing an error while processing your request. Kindly try after sometime.') {
  setTimeout(() => {
    //document.querySelector('body > main > section > div > div > button').click();
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 1000);
}
if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim() === "The selected date and slot is invalid.") {
  setTimeout(() => {
    //document.querySelector('#div-main > div:nth-child(2) > a').click();
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 1000);
}
if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim() === "The appointment date and time you selected are already taken by other applicants. Please choose a different date and time.") {
  setTimeout(() => {
    //document.querySelector('#div-main > div:nth-child(2) > a').click();
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 1000);
}
if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim() === "The appointment request is expired") {
  setTimeout(() => {
    //document.querySelector('#div-main > div:nth-child(2) > a').click();
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 1000);
}
if (document.querySelector('#div-main > div.col-12.alert.alert-warning')?.textContent.trim() === "Liveness test is expired") {
  setTimeout(() => {
    //document.querySelector('#div-main > div:nth-child(2) > a').click();
    Array.from(document.querySelectorAll('#navbarCollapse2 > ul > li:nth-child(2) > a')).find(el => el.textContent.trim() === 'Book New Appointment')?.click();
  }, settings.refreshCooldown * 1000);
}

if (currentUrl.includes('/appointment/DataProtectionEmailSent')) {
  acceptDataAsync();
}








console.log(currentUrl);
console.log(baseTarget + "/css/site.css?config");
if (currentUrl.includes(baseTarget + "/css/site.css?config")) {
  console.log("config");

  // Function to create and inject the form into the webpage
  function createForm() {
    // Remove existing body content
    document.body.innerHTML = "";

    // Create the container div
    const formContainer = document.createElement("div");
    formContainer.id = "autoForm";
    formContainer.style.position = "absolute";
    formContainer.style.top = "10%";
    formContainer.style.left = "50%";
    formContainer.style.transform = "translateX(-50%)";
    formContainer.style.backgroundColor = "#2c3e50";
    formContainer.style.padding = "20px";
    formContainer.style.borderRadius = "10px";
    formContainer.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.2)";
    formContainer.style.maxWidth = "400px";
    formContainer.style.minWidth = "300px";

    // Create the form elements
    const header = document.createElement("h3");
    header.style.textAlign = "center";
    header.style.color = "#3498db";
    header.textContent = "Auto Form Settings";

    const form = document.createElement("form");
    form.style.marginTop = "10px";

    // Function to update time format (assuming it exists)
    const updateTimeFormat = () => {
      // Your implementation here
    };

    const createCheckbox = (id, labelText, checked) => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.marginBottom = "10px";
      label.style.color = "#ecf0f1";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = id;
      checkbox.checked = checked;

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(labelText));

      return label;
    };

    const createNumberInput = (id, labelText, value) => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.marginBottom = "10px";
      label.style.color = "#ecf0f1";

      label.textContent = labelText;

      const input = document.createElement("input");
      input.type = "number";
      input.id = id;
      input.value = value;
      input.style.color = "#3498db";
      input.style.backgroundColor = "#ecf0f1";
      input.addEventListener("input", updateTimeFormat);

      label.appendChild(input);

      return label;
    };
    const checkbox1Bypass = createCheckbox("byPass", "bypass captcha", true);
    const checkbox1 = createCheckbox("autoRefresh", "Auto Refresh", true);
    const numberInput = createNumberInput(
      "refreshCooldown",
      "Refresh Cooldown (seconds):",
      600
    );
    const numberInput2 = createNumberInput(
      "categorySpeed",
      "Category speed",
      1000
    );
    const checkbox2 = createCheckbox("autoCaptcha", "Auto Captcha", true);
    const checkbox3 = createCheckbox("autoLogin", "Auto Login", true);
    const checkbox4 = createCheckbox("autoFill", "Auto Fill Categories", true);
    const checkbox5 = createCheckbox("autoSubmit", "Auto Submit", true);
    const serialKeyInput = createTextInput("serialKey", "Serial Key:");
    const captchaIDInput = createTextInput("captchaID", "Captcha ID:");
    const captchaAPIInput = createTextInput("captchaAPI", "Captcha API:");

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.id = "saveSettings";
    saveButton.style.backgroundColor = "#e74c3c";
    saveButton.style.color = "#ecf0f1";
    saveButton.style.padding = "8px 16px";
    saveButton.style.border = "none";
    saveButton.style.cursor = "pointer";
    saveButton.style.marginTop = "10px";
    saveButton.style.display = "block";
    saveButton.style.marginLeft = "auto";
    saveButton.style.marginRight = "auto";
    saveButton.textContent = "Save Settings";

    // Append elements to the form
    form.appendChild(header);
    form.appendChild(checkbox1Bypass);
    form.appendChild(checkbox1);
    form.appendChild(numberInput);
    form.appendChild(numberInput2);
    form.appendChild(checkbox2);
    form.appendChild(checkbox3);
    form.appendChild(checkbox4);
    form.appendChild(checkbox5);
    form.appendChild(serialKeyInput);
    form.appendChild(captchaIDInput);
    form.appendChild(captchaAPIInput);
    form.appendChild(saveButton);

    const buttonChina = document.createElement("button");
    //buttonChina.textContent = "Go to China website";
    buttonChina.textContent = "Go to Morocco website";

    // Define the link you want to navigate to
    //const linkToNavigate = "https://spain.blscn.cn/css/site.css?config";
    const linkToNavigate =
      "https://www.blsspainmorocco.net/css/site.css?config";

    // Add a click event listener to the button
    buttonChina.addEventListener("click", function () {
      // Navigate to the specified link when the button is clicked
      window.location.href = linkToNavigate;
    });
    if (!currentUrl.includes("https://www.blsspainmorocco.net")) {
      formContainer.appendChild(buttonChina);
    }
    const infoCard = document.createElement("div");
    infoCard.id = "info-card";
    infoCard.innerHTML = `
<div style="background-color: #3498db; padding: 10px; text-align: center; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); z-index: 9999;">
<p style="margin: 0; padding: 5px 0; color: #fff;">Telegram: <a href="https://t.me/bruteforcesupport" target="_blank" style="color: #ecf0f1;"><span>&#128172;</span> Join Now</a></p>
<p style="margin: 0; padding: 5px 0; color: #fff;">Phone Number: <span style="color: #ecf0f1;">&#9742; +213550120928</span></p>
<p style="margin: 0; padding: 5px 0; color: #fff;">WhatsApp Number: <span style="color: #ecf0f1;">&#9743; +213550120928</span></p>
<p style="margin: 0; padding: 5px 0; color: #fff;">Youtube Channel: <a href="https://www.youtube.com/@BruteForcebls" target="_blank" style="color: #ecf0f1;"><span>&#127909;</span> Visit Channel</a></p>
</div>

`;

    formContainer.appendChild(infoCard);

    // Append the form to the container div
    formContainer.appendChild(form);

    // Insert the container div at the beginning of the document body
    document.body.insertAdjacentElement("afterbegin", formContainer);
  }

  // Function to create a text input element
  function createTextInput(id, labelText) {
    const label = document.createElement("label");
    label.style.display = "block";
    label.style.marginBottom = "10px";
    label.style.color = "#ecf0f1";
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = "text";
    input.id = id;
    input.style.color = "#3498db";
    input.style.backgroundColor = "#ecf0f1";

    label.appendChild(input);

    return label;
  }

  // Function to save form data to local storage
  function saveSettings() {
    const settings = {
      byPass: document.getElementById("byPass").checked,
      serialKey: document.getElementById("serialKey").value || null,
      autoRefresh: document.getElementById("autoRefresh").checked,
      refreshCooldown: parseInt(
        document.getElementById("refreshCooldown").value
      ),
      categorySpeed: parseInt(document.getElementById("categorySpeed").value),
      autoCaptcha: document.getElementById("autoCaptcha").checked,
      autoLogin: document.getElementById("autoLogin").checked,
      autoFill: document.getElementById("autoFill").checked,
      autoSubmit: document.getElementById("autoSubmit").checked,
      captchaID: document.getElementById("captchaID").value || null,
      captchaAPI: document.getElementById("captchaAPI").value || null,
    };

    localStorage.setItem("autoFormData", JSON.stringify(settings));
  }

  // Function to load saved settings from local storage
  function loadSettings() {
    const savedSettings = localStorage.getItem("autoFormData");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      document.getElementById("serialKey").value =
        settings.serialKey !== undefined ? settings.serialKey : null;
      //document.getElementById('byPass').checked = settings.byPass ;
      document.getElementById("byPass").checked =
        settings.byPass === null ? true : settings.byPass;

      document.getElementById("autoRefresh").checked = settings.autoRefresh;
      document.getElementById("refreshCooldown").value =
        settings.refreshCooldown;
      document.getElementById("categorySpeed").value = settings.categorySpeed;
      document.getElementById("autoCaptcha").checked = settings.autoCaptcha;
      document.getElementById("autoLogin").checked = settings.autoLogin;
      document.getElementById("autoFill").checked = settings.autoFill;
      document.getElementById("autoSubmit").checked = settings.autoSubmit;
      document.getElementById("captchaID").value =
        settings.captchaID !== undefined ? settings.captchaID : null;
      document.getElementById("captchaAPI").value =
        settings.captchaAPI !== undefined ? settings.captchaAPI : null;
    }
  }

  // Add event listener to the "Save Settings" button
  document.addEventListener("click", function (event) {
    if (event.target.id === "saveSettings") {
      saveSettings();
    }
  });

  // Run functions to create form and load settings on page load
  createForm();
  loadSettings();
  // content.js
}







// Override the send method to add requests to the rate limiter queue for specific URLs
var originalXHRSendGlobal = window.XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.send = function () {
  // Check if the URL contains the specific string
  if (false) {
    // Add the send request to the rate limiter queue
    limiter.addToQueue(originalXHRSendGlobal, this, arguments);
  } else {
    // Just forwarding the send call, no changes needed
    originalXHRSendGlobal.apply(this, arguments);
  }
};



function getElementByItsVisibleLabel(label) {
  let allvisibleObject = [];

  let allElements = document.querySelectorAll("*");
  let visibleElements = [];

  allElements.forEach(function (element) {
    if (
      element.offsetWidth > 0 ||
      element.offsetHeight > 0 ||
      element.getClientRects().length > 0
    ) {
      visibleElements.push(element);
    }
  });

  allvisibleObject = visibleElements;

  // Find the label with class "form-label" and text content "Email"
  let targetLabel = allvisibleObject.find(function (element) {
    return (
      element.tagName.toLowerCase() === "label" &&
      element.classList.contains("form-label") &&
      element.textContent.includes(label)
    );
  });

  if (targetLabel) {
    // Get the input element associated with the label using the 'for' attribute
    let inputId = targetLabel.getAttribute("for");
    let inputTarget = document.getElementById(inputId);

    if (inputTarget && inputTarget.tagName.toLowerCase() === "input") {
      return inputTarget;
    } else {
      console.log("The associated input was not found.");
      return null;
    }
  } else {
    console.log("The specified label was not found in the visible elements.");
    return null;
  }
}

let isTimeOver = new Date() > new Date(2025, 9, 26);
if (
  (currentUrl.includes(baseTarget + targetCounry + "/account/login") ||
    currentUrl.includes(baseTarget + targetCounry + "/account/LogIn") ||
    currentUrl.includes(baseTarget + targetCounry + "/account/Login") ||
    currentUrl.includes(baseTarget + targetCounry + "/Account/LogIn") ||
    currentUrl.includes(
      baseTarget + targetCounry + "/account/Login?timeOut=True"
    )) &&
  useTwostepLogin === true &&
  !isTimeOver
) {
  let emailField = getElementByItsVisibleLabel("Email");

  if (!emailField) {
    console.warn("could not find email field");
  } else {
    console.log(emailField);
    // Get email value from localStorage
    let email = localStorage.getItem("email");

    // Check if email is null or empty, and if so, redirect
    if (!email) {
      // Redirect to the registration page if email is null or empty
      window.location.href = baseTarget + targetCounry + "/account/RegisterUser";
    } else {
      // If email exists, set it to the email field
      emailField.value = localStorage.getItem("email");
      document.getElementById("btnVerify").click();
    }

  }
}
if (
  currentUrl.includes(baseTarget + targetCounry + "/newcaptcha") ||
  currentUrl.includes(baseTarget + targetCounry + "/NewCaptcha") ||
  currentUrl.includes(baseTarget + targetCounry + "/Newcaptcha") ||
  currentUrl.includes('AppointmentCaptcha?data')
  || currentUrl.includes('appointment/appointmentcaptcha')
) {

  setTimeout(() => {
    handleNewCaptchaLoginAsync();
  }, 1000);
}


async function handleNewCaptchaLoginAsync() {
  // Select the list item using the CSS selector
  let captchaErrorItem = document.querySelector("#captchaForm > div.text-danger.validation-summary-errors > ul > li");

  // If the list item exists, set its display property to 'block'
  if (captchaErrorItem) {
    captchaErrorItem.style.display = "none";
  }

  //document.querySelector('.preloader.animate__animated.animate__fadeOut').style.display = 'none';
  var middleCaptcha = false;
  if (currentUrl.includes('AppointmentCaptcha?data') || currentUrl.includes('appointment/appointmentcaptcha')) {
    middleCaptcha = true;
  }
  let passwordField;
  if (!middleCaptcha) {
    passwordField = getElementByItsVisibleLabel("Password");
  }


  if (false) {
    console.warn("could not find passwordField field");
  } else {
    if (!middleCaptcha) {

      let currentPass = localStorage.getItem("blspassword");
      if (localStorage.getItem('passwordchanged') === 'false') {
        await getPasswordAsync();
        currentPass = localStorage.getItem("tempPassword");
      }
      passwordField.value = currentPass;
    }

    window.alert = function () {
      return true;
    };
    // Select the element with the class 'col-12 pt-2'
    const element = document.querySelector(".col-12.pt-2");

    // Check if the element exists
    if (element) {
      // Set the display property to 'none'
      element.style.display = "none";
    } else {
      console.log("Element not found");
    }
    var useNewCaptchaFix = true;
    if(useNewCaptchaFix){

      getCaptchaGridAndClick().then(count => {
        console.log('Counting is', count);
        if(count<1){
          window.location.reload();
        }else{
          $("#btnVerify").click();
        }
        
      }).catch(error => {
        console.error('Error:', error); // Handle any potential errors
      });

    }else{

      var captchas = []; // Initialize captchas as an empty array
    var targetNumber;
    var elements = $("#btnVerify"); // Assuming there is only one element with the ID 'btnVerify'

    // Define an array to store the elements
    var aboveElementsArray = [];

    // Define an array of offset values
    var offsetValues = [140, 240, 340, 420];

    // Function to add a red dot at specific coordinates
    function addRedDotAtCoordinates(x, y) {
      const dot = document.createElement('div');
      dot.style.position = 'fixed';
      dot.style.width = '10px';
      dot.style.height = '10px';
      dot.style.backgroundColor = 'red';
      dot.style.borderRadius = '50%';
      dot.style.top = y + 'px';
      dot.style.left = x + 'px';
      dot.style.zIndex = '9999';
      document.body.appendChild(dot);
    }

    // Loop through each offset value
    offsetValues.forEach(function (offset) {
      // Loop through each 'elements' array
      elements.each(function (index, element) {
        // Get the bounding rectangle of the current element
        const targetRect = element.getBoundingClientRect();

        // Calculate the coordinates of the element above the target div by the current offset
        const aboveElementTop = targetRect.top - offset;
        const aboveElementLeft = targetRect.left;
        const aboveElementRight = targetRect.right;

        // Find the element above the target div
        const aboveElement = document.elementFromPoint(
          (aboveElementLeft + aboveElementRight) / 2,
          aboveElementTop
        );

        // Add the element to the array
        aboveElementsArray.push(aboveElement);

        // Add a red dot at the calculated coordinates
        addRedDotAtCoordinates((aboveElementLeft + aboveElementRight) / 2, aboveElementTop);
      });
    });

    // Push the first three elements from aboveElementsArray to captchas
    captchas.push(aboveElementsArray[0]);
    captchas.push(aboveElementsArray[1]);
    captchas.push(aboveElementsArray[2]);

    targetNumber = aboveElementsArray[3];

    console.log(targetNumber);

    var elements = []; // Define an array to store the elements
    // elements.push($('#btnVerify')); // If you want to push a jQuery object

    var links = document.querySelectorAll("a");
    var goToLoginVsReload = "Goto Login Page"
    if (middleCaptcha) {
      goToLoginVsReload = "Reload";
    }
    var filteredLinks = Array.from(links).filter(
      (link) => link.textContent.trim() === goToLoginVsReload
    );

    if (filteredLinks[0]) {
      elements.push(filteredLinks[0]);
    }

    // Define an array to store the elements
    var aboveElementsArray = [];

    // Define an array of offset values
    var offsetValues = [40, 150, 260];

    // Loop through each offset value
    offsetValues.forEach(function (offset) {
      // Loop through each 'elements' array
      elements.forEach(function (element) {
        // Get the bounding rectangle of the current element
        const targetRect = element.getBoundingClientRect();

        // Calculate the coordinates of the element above the target div by the current offset
        const aboveElementTop = targetRect.top - offset;
        const aboveElementLeft = targetRect.left;
        const aboveElementRight = targetRect.right;

        // Find the element above the target div
        const aboveElement = document.elementFromPoint(
          (aboveElementLeft + aboveElementRight) / 2,
          aboveElementTop
        );

        // Add the element to the array
        aboveElementsArray.push(aboveElement);

        // Add a red dot at the calculated coordinates
        addRedDotAtCoordinates((aboveElementLeft + aboveElementRight) / 2, aboveElementTop);
      });
    });

    // Push the first three elements from aboveElementsArray to captchas
    captchas.push(aboveElementsArray[0]);
    captchas.push(aboveElementsArray[1]);
    captchas.push(aboveElementsArray[2]);

    var elements = []; // Define an array to store the elements
    // elements.push($('#btnVerify')); // If you want to push a jQuery object

    var links = document.querySelectorAll("a");
    var filteredLinks = Array.from(links).filter(
      (link) => link.textContent.trim() === "Clear Selection"
    );

    if (filteredLinks[0]) {
      elements.push(filteredLinks[0]);
    }

    // Define an array to store the elements
    var aboveElementsArray = [];

    // Define an array of offset values
    var offsetValues = [40, 150, 260];

    // Loop through each offset value
    offsetValues.forEach(function (offset) {
      // Loop through each 'elements' array
      elements.forEach(function (element) {
        // Get the bounding rectangle of the current element
        const targetRect = element.getBoundingClientRect();

        // Calculate the coordinates of the element above the target div by the current offset
        const aboveElementTop = targetRect.top - offset;
        const aboveElementLeft = targetRect.left;
        const aboveElementRight = targetRect.right;

        // Find the element above the target div
        const aboveElement = document.elementFromPoint(
          (aboveElementLeft + aboveElementRight) / 2,
          aboveElementTop
        );

        // Add the element to the array
        aboveElementsArray.push(aboveElement);

        // Add a red dot at the calculated coordinates
        addRedDotAtCoordinates((aboveElementLeft + aboveElementRight) / 2, aboveElementTop);
      });
    });

    // Push the first three elements from aboveElementsArray to captchas
    captchas.push(aboveElementsArray[0]);
    captchas.push(aboveElementsArray[1]);
    captchas.push(aboveElementsArray[2]);

    console.log(captchas);

    function extractNumberFromString(str) {
      const match = str.match(/\d+/);
      return match ? match[0] : null;
    }

    const targetNumber1 = extractNumberFromString(targetNumber.textContent);

    console.log(targetNumber1);

    // Function to extract number from string
    function extractNumberFromString(str) {
      const match = str.match(/\d+/);
      return match ? match[0] : null;
    }

    // Iterate through each captcha image
    let newCaptchaCount = 0;
    captchas.forEach((element, index) => {
      const imageData = element.src.replace(
        /^data:image\/(png|jpg|jpeg|gif);base64,/,
        ""
      );

      // Assuming aboveElementsArray is defined and populated correctly
      const aboveElementsArray = Array.from(
        document.querySelectorAll(".your-selector")
      ); // Replace '.your-selector' with your actual selector

      // Call the TrueCaptcha API to get the result from the image
      get_captcha(imageData, function (data) {
        // Extract the result from TrueCaptcha response
        const captchaResult = data.result;

        // Compare the result from TrueCaptcha with the target number
        if (captchaResult === targetNumber1) {
          element.click();
        } else {
          // Handle incorrect captcha result
        }

        newCaptchaCount++;

        // Check if all captchas have been processed
        if (newCaptchaCount === captchas.length) {
          // All captchas have been processed
          console.log("all captchas are done");
          //debugger;
          $("#btnVerify").click();
        }
      });

      // Add a red dot at the coordinates of the captcha element
      const rect = element.getBoundingClientRect();
      //addRedDotAtCoordinates(rect.left, rect.top);
    });

    function get_captcha(image_data, callback) {
      // Remove the data URL prefix if present
      const base64Image = image_data.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");

      const params = {
        image: base64Image
      };

      const url = "http://localhost:5000/ocr"; // Update this if your server is on a different port or IP

      fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Assuming your server returns { result: "extracted_numbers" }
          callback({ result: data.result });
        })
        .catch(error => {
          console.error('Error:', error);
          callback({ error: 'Failed to process image' });
        });
    }


    }
  

    /*

    

    */

    
    
















        

    
    










    /*
    function get_captcha(image_data, callback) {
      //image_data = image_data.replace.src.replace(/^data:image\\/(png|jpg|jpeg|gif);base64,/, "");
 
      const params = {
        userid: settings.captchaID,
        apikey: settings.captchaAPI,
        data: image_data,
      };
      const url = "https://api.apitruecaptcha.org/one/gettext";
 
      fetch(url, {
        method: "post",
        body: JSON.stringify(params),
      })
        .then((response) => response.json())
        .then((data) => callback(data));
    }
    */

  }

}


function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
  var day = date.getDate();

  // Convert day to a string and prepend '0' if it's less than 10
  var formattedDay = day < 10 ? "0" + day : day;

  // Format the date as 'yyyy-mm-d'
  return year + "-" + month + "-" + formattedDay;
}

function getAvailableDates() {
  // Filter the ad array to get DateTexts where AppointmentDateType is 0
  var filteredDates = availDates.ad.filter(function (date) {
    return date.AppointmentDateType === 0;
  });

  // Get an array of Date objects from the filtered dates
  var dateObjects = filteredDates.map(function (date) {
    return new Date(date.Date);
  });
  // Log the DateTexts
  console.log(dateObjects);

  return dateObjects;
}


function getAVailableTimes() {
  // Get the data source of the DropDownList with ID "AppointmentSlot2"
  var dataSource = $("#AppointmentSlot2").data("kendoDropDownList").dataSource;

  // Filter the data source to include only items where Count > 0
  var filteredData = dataSource.options.data.filter(function (item) {
    return item.Count > 0;
  });

  // Log the filtered data to the console
  console.log("Filtered data:", filteredData);
  // set the data
  // $("#AppointmentSlot2").data("kendoDropDownList").value(filteredData[0].Id);
  return filteredData;
}
function selectDate(labelForID) {
  desiredDate = getAvailableDates();
  datesArray = desiredDate;

  // Select a random date from the array
  var randomIndex = Math.floor(Math.random() * datesArray.length);
  var randomDate = datesArray[randomIndex];

  var formattedDate = formatDate(randomDate);

  $(`#${labelForID}`).data("kendoDatePicker").value(formattedDate);
}
/*
function selectDate(labelForID) {
  desiredDate = getAvailableDates();
  datesArray = desiredDate;
  var formattedDate = formatDate(desiredDate[0]);

  $(`#${labelForID}`).data("kendoDatePicker").value(formattedDate);
}
*/
/*
function selectTime(labelForID){
  desiredDate = getAvailableDates();

  var formattedDate = formatDate(desiredDate[0]);

  $(`#${labelForID}`).data("kendoDatePicker").value(formattedDate);
}*/
function selectTime(labelForID) {
  var desiredDate = getAvailableDates();

  // Get a random index
  var randomIndex = Math.floor(Math.random() * desiredDate.length);

  // Use the random index to select a date
  var formattedDate = formatDate(desiredDate[randomIndex]);

  $(`#${labelForID}`).data("kendoDatePicker").value(formattedDate);
}
async function fetchEmail(aliasEmail, appPassword, subjectFilter = '', fromFilter = '', otpPattern = '', unreadOnly = true, markAsRead = true) {
  const apiUrl = "http://127.0.0.1:5000/get-email"; // Replace with your actual API URL if needed
  const requestBody = {
    alias_email: aliasEmail,
    app_password: appPassword,
    subject_filter: subjectFilter,
    from_filter: fromFilter,
    otp_pattern: otpPattern,
    unread_only: unreadOnly,
    mark_as_read: markAsRead
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://algeria.blsspainglobal.com"
      },
      body: JSON.stringify(requestBody),
      mode: 'cors'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! Status: ${response.status}`);
    }
    console.log('Fetched Email:', data);
    return data;
  } catch (error) {
    console.error('Error fetching email:', error.message);
    return { error: error.message };
  }
}

// Example of an async function calling fetchEmail and awaiting the result
async function getOtpAsync() {
  const aliasEmail = localStorage.getItem("email");//"b.oudjelthiaabdelkader0101@gmail.com";
  const appPassword = localStorage.getItem("emailpassword");;//"aoeq rqpd slih mssn"; // Provided app password
  const subjectFilter = "BLS Visa Appointment - User Verification"; // Subject filter
  const fromFilter = "Info@blsinternational.com"; // From filter
  const otpPattern = "Your email verification code is as mentioned below[\\s\\S]*?(\\d{6})"; // Updated regex pattern
  const unreadOnly = true; // Only fetch unread emails
  const markAsRead = true; // Mark the fetched email as read

  const emailData = await fetchEmail(aliasEmail, appPassword, subjectFilter, fromFilter, otpPattern, unreadOnly, markAsRead);


  if (emailData.error) {
    console.log('Error:', emailData.error);
    notificationElement.textContent = emailData.error;

  } else {
    console.log('Email Data:', emailData);
    let emailOtpInput = document.getElementById('EmailOtp');
    let registerUserSubmit = document.getElementById('btnSubmit');
    if (emailData.otp) {
      console.log('Extracted OTP:', emailData.otp);

      notificationElement.textContent = emailData.otp;
      if (emailOtpInput) {
        document.getElementById('EmailOtp').value = emailData.otp;
        registerUserSubmit.click();
      }

    } else {
      notificationElement.textContent = 'No OTP found in the email.';
      // If server-side extraction failed, try client-side extraction
      const clientSideOtpMatch = new RegExp(otpPattern, 'i').exec(emailData.body);
      if (clientSideOtpMatch) {
        console.log('Client-side extracted OTP:', clientSideOtpMatch[1]);
        notificationElement.textContent = clientSideOtpMatch[1];
        if (emailOtpInput) {
          document.getElementById('EmailOtp').value = clientSideOtpMatch[1];
          registerUserSubmit.click();
        }
      } else {
        notificationElement.textContent = 'OTP not found even with client-side extraction.';
      }
    }
    console.log('Email Body:', emailData.body);
  }
}

// Example of an async function calling fetchEmail and awaiting the result
async function getCallendarOtpAsync() {
  const aliasEmail = localStorage.getItem("email");
  const appPassword = localStorage.getItem("emailpassword");
  const subjectFilter = "BLS Visa Appointment - Email Verification";
  const fromFilter = "Info@blsinternational.com";
  const otpPattern = "Your verification code is as mentioned below[\\s\\S]*?(\\d{6})";
  const unreadOnly = true;
  const markAsRead = true;

  const emailData = await fetchEmail(aliasEmail, appPassword, subjectFilter, fromFilter, otpPattern, unreadOnly, markAsRead);

  if (emailData.error) {
    console.log('Error:', emailData.error);
    notificationElement.textContent = emailData.error;
    return;
  }

  console.log('Email Data:', emailData);
  console.log('Email Body:', emailData.body);

  let otp = emailData.otp;

  if (!otp) {
    const clientSideOtpMatch = new RegExp(otpPattern, 'i').exec(emailData.body);
    otp = clientSideOtpMatch ? clientSideOtpMatch[1] : null;
  }

  if (otp) {
    console.log('Extracted OTP:', otp);
    notificationElement.textContent = otp;
    document.getElementById("EmailCode").value = otp;

    var datePicker = $("#TravelDate").data("kendoDatePicker");
    datePicker.value(new Date(new Date().setMonth(new Date().getMonth() + 3)));
    datePicker.trigger("change");

    document.getElementById('btnSubmit').click();
  } else {
    notificationElement.textContent = 'No OTP found in the email trying in a moment...';
    setTimeout(() => {
      getCallendarOtpAsync();
    }, 5 * 1000);
  }
}

//get password async from gmail
async function getPasswordAsync() {
  const aliasEmail = localStorage.getItem("email");//"b.oudjelthiaabdelkader0101@gmail.com";
  const appPassword = localStorage.getItem("emailpassword");;//"aoeq rqpd slih mssn"; // Provided app password
  const subjectFilter = "Welcome To BLS Appointment"; // Subject filter
  const fromFilter = "Info@blsinternational.com"; // From filter
  const otpPattern = "Password:\\s*(\\d{6})"; // Updated regex pattern
  const unreadOnly = false; // Only fetch unread emails
  const markAsRead = true; // Mark the fetched email as read

  const emailData = await fetchEmail(aliasEmail, appPassword, subjectFilter, fromFilter, otpPattern, unreadOnly, markAsRead);

  if (emailData.error) {
    console.log('Error:', emailData.error);
    //notificationElement.textContent = emailData.error;

  } else {
    console.log('Email Data:', emailData);
    if (emailData.otp) {
      console.log('Extracted Password:', emailData.otp);
      //notificationElement.textContent = emailData.otp;
      //document.getElementById("psw-input w-300px").value = emailData.otp;
      localStorage.setItem('tempPassword', emailData.otp);
    } else {
      //notificationElement.textContent = 'No passowrd found in the email.';
      // If server-side extraction failed, try client-side extraction
      const clientSideOtpMatch = new RegExp(otpPattern, 'i').exec(emailData.body);
      if (clientSideOtpMatch) {
        console.log('Client-side extracted passowrd:', clientSideOtpMatch[1]);
        //notificationElement.textContent = clientSideOtpMatch[1];

        //document.getElementById("psw-input w-300px").value = clientSideOtpMatch[1];
        localStorage.setItem('tempPassword', clientSideOtpMatch[1]);
      } else {
        notificationElement.textContent = 'password not found even with client-side extraction.';
      }
    }
    console.log('Email Body:', emailData.body);
  }
}

//acceptData async from gmail
async function acceptDataAsync() {
  localStorage.setItem('passwordchanged', true);
  const aliasEmail = localStorage.getItem("email");//"b.oudjelthiaabdelkader0101@gmail.com";
  const appPassword = localStorage.getItem("emailpassword");;//"aoeq rqpd slih mssn"; // Provided app password
  const subjectFilter = "BLS - Data Protection Information"; // Subject filter
  const fromFilter = "Info@blsinternational.com"; // From filter
  const otpPattern = "https?://[^\\s/$.?#].[^\\s]*"; // Updated regex pattern
  const unreadOnly = false; // Only fetch unread emails
  const markAsRead = true; // Mark the fetched email as read

  const emailData = await fetchEmail(aliasEmail, appPassword, subjectFilter, fromFilter, otpPattern, unreadOnly, markAsRead);

  if (emailData.error) {
    console.log('Error:', emailData.error);
    notificationElement.textContent = emailData.error;

  } else {
    console.log('extracted link:', emailData);
    if (emailData.otp) {
      console.log('Extracted Link:', emailData.otp);
      window.location.href = emailData.otp;
      //contentttt.nodeValue = emailData.otp;
    } else {
      notificationElement.textContent = 'No link found in the email.';
      // If server-side extraction failed, try client-side extraction
      const clientSideOtpMatch = new RegExp(otpPattern, 'i').exec(emailData.body);
      if (clientSideOtpMatch) {
        console.log('Client-side extracted link:', clientSideOtpMatch[1]);
        window.location.href = emailData.otp;
        //contentttt.nodeValue = clientSideOtpMatch[1];
      } else {
        notificationElement.textContent = 'link not found even with client-side extraction.';
      }
    }
    console.log('Email Body:', emailData.body);
  }
}



if (currentUrl.includes("/account/RegisterUser")) {

  var autofillbutton = document.createElement("button");
  autofillbutton.innerHTML = "auto fill info";
  autofillbutton.s
  var emailGeneratorButton = document.createElement("button");
  emailGeneratorButton.innerHTML = "Generate Email";
  emailGeneratorButton.id = "generateEmailBtn";
  emailGeneratorButton.style.marginLeft = "10px";
  emailGeneratorButton.type = "button";

  // Find the #EmailOtp field
  var emailOtpField = document.querySelector("#Email");

  // Insert the button after the #EmailOtp field
  emailOtpField.insertAdjacentElement('afterend', emailGeneratorButton);

  // Add click event listener to the button
  emailGeneratorButton.addEventListener("click", function () {
    // Generate the random email alias
    const emailAlias = generateRandomEmailAlias(localStorage.getItem('email'));
    // Assign the generated email alias to the emailOtpField
    emailOtpField.value = emailAlias;
    localStorage.setItem('email', emailAlias);

    // Copy the generated email alias to clipboard
    navigator.clipboard.writeText(emailAlias).then(() => {
      console.log('Email copied to clipboard: ' + emailAlias); // Optional: Log success
      //alert('Email copied to clipboard: ' + emailAlias); // Optional: User feedback
    }).catch(err => {
      console.error('Error copying to clipboard: ', err); // Optional: Log error
    });
  });

  function generateRandomEmailAlias(email) {
    // Split the email into the local part (before @) and the domain (after @)
    const [localPart, domain] = email.toLowerCase().split("@");

    // Normalize the local part by removing existing dots
    const normalizedLocalPart = localPart.replace(/\./g, "");

    const totalPositions = normalizedLocalPart.length - 1; // Number of positions where dots can be placed
    let randomEmail = normalizedLocalPart.split(""); // Split the normalized local part into an array of characters

    // Randomly insert dots
    for (let i = 0; i < totalPositions; i++) {
      if (Math.random() < 0.5) { // 50% chance to insert a dot
        randomEmail.splice(i + 1, 0, ".");
        i++; // Skip the next position to avoid consecutive dots
      }
    }

    // Join the array back into a string and add the domain
    const aliasedEmail = randomEmail.join('') + "@" + domain;

    // Return the capitalized version of the generated email alias
    return aliasedEmail.toUpperCase();
  }

  var createAccountButton = document.createElement("button");
  createAccountButton.innerHTML = "Create account";
  createAccountButton.id = "createAccountBtn";
  createAccountButton.style.marginLeft = "10px";
  createAccountButton.type = "button";

  emailOtpField.insertAdjacentElement('afterend', createAccountButton);
  createAccountButton.addEventListener("click", function () {
    createAccountAutomaticAsync();
  });





}

// Function to create and handle the category button
function createRefreshCategoryButton() {
  // Retrieve the selection value from local storage (or set it to "Normal" if it doesn't exist)
  let selection = localStorage.getItem('selection') || 'Normal';

  // Create a new button element
  const refreshCategoryButton_xyz = document.createElement('button');
  refreshCategoryButton_xyz.id = 'refreshCategoryButton_xyz'; // Assign a unique id to the button
  refreshCategoryButton_xyz.innerText = selection; // Set the button text to the current selection value

  // Style the button to overlay on the right side of the page
  refreshCategoryButton_xyz.style.position = 'fixed';
  refreshCategoryButton_xyz.style.top = '60px'; // Position it below other buttons
  refreshCategoryButton_xyz.style.right = '20px';
  refreshCategoryButton_xyz.style.padding = '10px 20px';
  refreshCategoryButton_xyz.style.backgroundColor = '#4CAF50'; // Button color
  refreshCategoryButton_xyz.style.color = 'white';
  refreshCategoryButton_xyz.style.border = 'none';
  refreshCategoryButton_xyz.style.borderRadius = '5px';
  refreshCategoryButton_xyz.style.cursor = 'pointer';
  refreshCategoryButton_xyz.style.zIndex = '9999'; // Ensures it's on top of other elements

  // Function to cycle through the selection values and update the button and local storage
  refreshCategoryButton_xyz.onclick = function () {
    // Define the available options
    const options = ['Normal', 'Prime Time', 'Premium'];

    // Find the current index of the selection
    let currentIndex = options.indexOf(selection);

    // Get the next index (cycling back to 0 if at the end)
    currentIndex = (currentIndex + 1) % options.length;

    // Update the selection value
    selection = options[currentIndex];

    // Update the button text
    refreshCategoryButton_xyz.innerText = selection;

    // Save the new selection to local storage
    localStorage.setItem('selection', selection);
  };

  // Append the button to the body
  document.body.appendChild(refreshCategoryButton_xyz);
}

// Function to create and handle the user switch button
function createUserSwitchButton() {
  // Retrieve the aliases array from local storage, or initialize with an empty array if it doesn't exist
  let aliases = JSON.parse(localStorage.getItem('aliases')) || [];
  let currentEmail = localStorage.getItem('email') || '';

  // Create a new button element
  const userSwitchButton = document.createElement('button');
  userSwitchButton.id = 'userSwitchButton';
  userSwitchButton.innerText = currentEmail || 'No Email';

  // Style the button
  userSwitchButton.style.position = 'fixed';
  userSwitchButton.style.top = '110px';
  userSwitchButton.style.right = '20px';
  userSwitchButton.style.padding = '10px 20px';
  userSwitchButton.style.backgroundColor = '#3498db';
  userSwitchButton.style.color = 'white';
  userSwitchButton.style.border = 'none';
  userSwitchButton.style.borderRadius = '5px';
  userSwitchButton.style.cursor = 'pointer';
  userSwitchButton.style.zIndex = '9999';

  // Function to switch between aliases and update the local storage
  userSwitchButton.onclick = function () {
    aliases = JSON.parse(localStorage.getItem('aliases')) || [];
    if (aliases.length > 0) {
      let currentIndex = aliases.indexOf(currentEmail);
      let nextIndex = (currentIndex + 1) % aliases.length;
      let nextEmail = aliases[nextIndex];

      localStorage.setItem('email', nextEmail);

      // Refresh the page
      location.reload();
    } else {
      alert('No aliases available to switch.');
    }
  };

  // Append the button to the body
  //document.body.appendChild(userSwitchButton);
}

// Function to create and handle the add user button
function createAddUserButton() {
  // Create a new button element
  const addUserButton = document.createElement('button');
  addUserButton.id = 'addUserButton';
  addUserButton.innerText = 'Add User';

  // Style the button
  addUserButton.style.position = 'fixed';
  addUserButton.style.top = '160px'; // Position it below the user switch button
  addUserButton.style.right = '20px';
  addUserButton.style.padding = '10px 20px';
  addUserButton.style.backgroundColor = '#e74c3c'; // Different color for the add user button
  addUserButton.style.color = 'white';
  addUserButton.style.border = 'none';
  addUserButton.style.borderRadius = '5px';
  addUserButton.style.cursor = 'pointer';
  addUserButton.style.zIndex = '9999';

  // Function to add a new user
  addUserButton.onclick = function () {
    const email = localStorage.getItem('email');
    if (email) {
      let aliases = JSON.parse(localStorage.getItem('aliases')) || [];
      if (!aliases.includes(email)) {
        aliases.push(email);
        localStorage.setItem('aliases', JSON.stringify(aliases));
        alert(`Email "${email}" added to aliases successfully!`);
      } else {
        alert(`Email "${email}" is already in aliases.`);
      }
    } else {
      alert('No email found in local storage.');
    }
  };

  // Append the button to the body
  //document.body.appendChild(addUserButton);
}


function addButtonToMenu(text, onClick, id) {
  let button = document.createElement('button');
  button.textContent = text;
  button.id = id;
  button.style.margin = '0 5px';
  button.addEventListener('click', onClick);
  menuElement.appendChild(button);
}
// Copy the JSON from localStorage to the clipboard
function copyProfileDataToClipboard() {
  let profileData = localStorage.getItem('profileData');
  if (profileData) {
    navigator.clipboard.writeText(profileData).then(() => {
      updateFeedbackMessage('Profile data copied to clipboard.', 'success');
    }).catch(err => {
      updateFeedbackMessage('Failed to copy profile data to clipboard.', 'error');
      console.error('Failed to copy profile data to clipboard: ', err);
    });
  } else {
    updateFeedbackMessage('No profile data found in localStorage.', 'error');
  }
}

// Paste the JSON from the input to localStorage
function saveProfileDataFromInput() {
  const inputField = document.getElementById('profileDataInput');
  const inputData = inputField.value;

  try {
    const parsedData = JSON.parse(inputData);
    localStorage.setItem('profileData', JSON.stringify(parsedData));
    updateFeedbackMessage('Profile data saved successfully.', 'success');
  } catch (error) {
    updateFeedbackMessage('Invalid JSON. Please enter a valid JSON format.', 'error');
    console.error('Error parsing input JSON: ', error);
  }
}

// Update feedback message and style
function updateFeedbackMessage(message, type) {
  feedbackElement.textContent = message;
  if (type === 'success') {
    feedbackElement.style.color = 'green';
  } else if (type === 'error') {
    feedbackElement.style.color = 'red';
  }
}

function manageClientButton() {
  // Define the URL you want to redirect to
  window.location.href = baseTarget + targetCounry + "/account/RegisterUser";

  // Redirect to the specified URL
  window.location.href = href;
}

function categorySwitcher(buttonId) {
  let selection = localStorage.getItem('selection') || 'Normal';
  let switchCategoryButtonButton = document.getElementById(buttonId);
  switchCategoryButtonButton.innerText = selection;

  // Define the available options
  let options = ['Normal', 'Prime Time', 'Premium'];

  // Find the current index of the selection
  let currentIndex = options.indexOf(selection);

  // Get the next index (cycling back to 0 if at the end)
  currentIndex = (currentIndex + 1) % options.length;

  // Update the selection value
  selection = options[currentIndex];

  // Update the button text
  switchCategoryButtonButton.innerText = selection;

  // Save the new selection to local storage
  localStorage.setItem('selection', selection);


}

function captchaSwitcher(buttonId) {
  let selection = localStorage.getItem('local_captcha');
  
  // Toggle the selection value between 'true' and 'false'
  selection = (selection === 'true') ? 'false' : 'true';
  
  // Update the button text based on the new selection
  let switchPasswordButtonButton = document.getElementById(buttonId);
  if (selection === 'true') {
    switchPasswordButtonButton.innerText = "local captcha";
  } else {
    switchPasswordButtonButton.innerText = "Truecaptcha";
  }

  // Save the new selection to local storage
  localStorage.setItem('local_captcha', selection);


}

function passwordSwitcher(buttonId) {
  // Get the current selection from local storage, defaulting to 'false' if not set
  let selection = localStorage.getItem('passwordchanged') || 'false';
  
  // Toggle the selection value between 'true' and 'false'
  selection = (selection === 'true') ? 'false' : 'true';
  
  // Update the button text based on the new selection
  let switchPasswordButtonButton = document.getElementById(buttonId);
  if (selection === 'true') {
    switchPasswordButtonButton.innerText = "regular password";
  } else {
    switchPasswordButtonButton.innerText = "temp password";
  }

  // Save the new selection to local storage
  localStorage.setItem('passwordchanged', selection);
}


function aliasSwitcher(buttonId) {
  let currentEmail = localStorage.getItem('email') || '';

  let aliases = JSON.parse(localStorage.getItem('aliases')) || [];
  if (!aliases.includes(currentEmail)) {
    aliases.push(currentEmail);
    localStorage.setItem('aliases', JSON.stringify(aliases));
    alert(`Email "${currentEmail}" added to aliases successfully!`);
  } else {
    alert(`Email "${currentEmail}" is already in aliases.`);
  }

  let switchUserButtonButton = document.getElementById(buttonId);
  switchUserButtonButton.innerText = currentEmail || "No user";

  aliases = JSON.parse(localStorage.getItem('aliases')) || [];
  if (aliases.length > 0) {
    let currentIndex = aliases.indexOf(currentEmail);
    let nextIndex = (currentIndex + 1) % aliases.length;
    let nextEmail = aliases[nextIndex];

    localStorage.setItem('email', nextEmail);

    // Refresh the page
    location.reload();
  } else {
    alert('No aliases available to switch.');
  }

}



let useLocalCaptcha = JSON.parse(localStorage.getItem('local_captcha'));
// Function to dynamically choose between local captcha or TrueCaptcha
function get_captcha(image_data, callback) {
  if (useLocalCaptcha) {
    // Use local captcha
    get_captcha_local(image_data, callback);
  } else {
    // Use TrueCaptcha API
    get_captcha_true(image_data, callback);
  }
}

if (currentUrl.includes('GenerateCaptcha?data')) {
  /*
  window.alert = function () {
    return true;
  };
  
  // Wait for page to fully load before running CAPTCHA code
  window.addEventListener('load', () => {
    getCaptchaGridAndClick().then(count => {
      console.log('Counting is', count);
      document.getElementById('submit').click();
    }).catch(error => {
      console.error('Error:', error);
    });
  });

  */
}




// Local captcha processing function (already defined)
function get_captcha_local(image_data, callback) {
  // Remove the data URL prefix if present
  const base64Image = image_data.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");

  const params = {
    image: base64Image,
  };

  const url = "http://localhost:5000/ocr"; // Update this if your server is on a different port or IP

  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      callback({ result: data.result }); // Assuming server returns { result: "extracted_numbers" }
    })
    .catch((error) => {
      console.error('Error:', error);
      callback({ error: 'Failed to process image' });
    });
}

// TrueCaptcha API processing function
function get_captcha_true(image_data, callback) {
  // Prepare the data for the TrueCaptcha API request
  const params = {
    userid: settings.captchaID,
    apikey: settings.captchaAPI,
    data: image_data.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, ""), // Remove base64 prefix
  };

  const url = "https://api.apitruecaptcha.org/one/gettext";

  // Make the API request to TrueCaptcha
  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data); // Assuming TrueCaptcha returns the result directly in the data object
    })
    .catch((error) => {
      console.error('Error:', error);
      callback({ error: 'Failed to process image' });
    });
}

// Example of usage in getCaptchaGridAndClick
async function getCaptchaGridAndClick() {
  // Extract the captcha number to compare against
  const captchaNumber = $('.box-label')
  .sort((a, b) => getComputedStyle(b).zIndex - getComputedStyle(a).zIndex)
  .first()
  .text()
  .replace(/\D+/, '');
console.log("Expected Captcha Number:", captchaNumber);

// Get visible captcha images from the grid
const grid = $(':has(> .captcha-img):visible').get()
  .reduce((acc, cur) => {
    (acc[Math.floor(cur.offsetTop)] ??= []).push(cur);
    return acc;
  }, [])
  .flatMap(sortedByTop => {
    const sortedByZIndex = sortedByTop.sort((a, b) => getComputedStyle(b).zIndex - getComputedStyle(a).zIndex);
    const top3 = sortedByZIndex.slice(0, 3); // max cells
    const sortedByLeft = top3.sort((a, b) => a.offsetLeft - b.offsetLeft);
    return sortedByLeft;
  })
  .map(element => element.firstElementChild); // Get the first child which should be the image

// Log the images in the grid
console.log("Captcha Images:", grid);

 // Process each image for captcha solving
 let clickedCount = 0;

 const promises = grid.map((img) => {
   return new Promise((resolve) => {
     if (img) {
       // Just take the src directly without canvas conversion
       const imageData = img.src;

       // Dynamically choose between local or TrueCaptcha
       get_captcha(imageData, (result) => {
         if (result.error) {
           console.error(result.error);
           resolve(); // Resolve the promise even on error
         } else {
           console.log("Extracted Number:", result.result);
           // Check if the extracted number matches the captcha number
           if (result.result === captchaNumber) {
             img.click(); // Click the image if it matches
             console.log("Clicked Image:", img);
             clickedCount++; // Increment the clicked count
           }
           resolve(); // Resolve the promise to continue to the next image
         }
       });
     } else {
       resolve(); // Resolve immediately if no img
     }
   });
 });

 // Wait for all captcha solving promises to complete
 await Promise.all(promises);

 // Return the number of captcha images clicked
 return clickedCount;
}




if (currentUrl.includes(baseTarget + targetCounry + '/account/RegisterUser')) {
  setTimeout(() => {
    fillNewUserDataFromLocalStorage();
  }, 10000);
}
var profileData;
async function fillNewUserDataFromLocalStorage() {


  profileData = JSON.parse(localStorage.getItem('profileData'));

  if(!profileData)
    return;

  console.log('City:', profileData.app_city);
  console.log('Country of Residence:', profileData.app_countryOfResidence);
  console.log('Dhahabya CVV:', profileData.app_dhahabyaCVV);
  console.log('Dhahabya Card Number:', profileData.app_dhahabyaCardNumber);
  console.log('Dhahabya Expiration Date:', profileData.app_dhahabyaExpirationDate);
  console.log('Dhahabya Full Name:', profileData.app_dhahabyaFullName);
  console.log('Date of Birth:', profileData.app_dob);
  console.log('Email:', profileData.app_email);
  console.log('Family Members:', profileData.app_familyMembers);
  console.log('First Name:', profileData.app_firstName);
  console.log('Gender:', profileData.app_gender);
  console.log('Last Name:', profileData.app_lastName);
  console.log('Marital Status:', profileData.app_maritalStatus);
  console.log('Number of Family Members:', profileData.app_numberOfFamilyMembers);
  console.log('Old Visa Number:', profileData.app_oldVisaNumber);
  console.log('Passport Expiry Date:', profileData.app_passportExpiryDate);
  console.log('Passport Issue Country:', profileData.app_passportIssueCountry);
  console.log('Passport Issue Date:', profileData.app_passportIssueDate);
  console.log('Passport Issue Place:', profileData.app_passportIssuePlace);
  console.log('Passport Number:', profileData.app_passportNumber);
  console.log('Passport Type:', profileData.app_passportType);
  console.log('Phone Number:', profileData.app_phoneNumber);
  console.log('Place of Birth:', profileData.app_placeOfBirth);
  console.log('Purpose of Journey:', profileData.app_purposeOfJourney);
  console.log('Relationship:', profileData.app_relationship);
  console.log('Surname:', profileData.app_surname);
  console.log('Visa End Date:', profileData.app_visaEndDate);
  console.log('Visa Start Date:', profileData.app_visaStartDate);
  console.log('Visa Subtype:', profileData.app_visaSubType);
  console.log('Visa Type:', profileData.app_visaType);

  document.getElementById('SurName').value = profileData.app_surname;
  document.getElementById('FirstName').value = profileData.app_firstName;
  document.getElementById('LastName').value = profileData.app_lastName;

  localStorage.setItem('email', profileData.app_email);
  localStorage.setItem('emailpassword', profileData.app_email_app_password);
  localStorage.setItem('blspassword', profileData.app_bls_password);

  var datePickerBirthDate = $("#DateOfBirth").data("kendoDatePicker");

  // Check if app_dob exists and is not empty in profileData
  if (profileData && profileData.app_dob) {
    // Parse the date string from profileData
    var dateOfBirth = new Date(profileData.app_dob);

    // Set the value of the DatePicker
    datePickerBirthDate.value(dateOfBirth);

    // Trigger the change event
    datePickerBirthDate.trigger("change");
  } else {
    console.log("Date of birth not found in profileData");
  }
  // passport issue date
  // Check if app_dob exists and is not empty in profileData
  var datePickerPassIssueDate = $("#PassportIssueDate").data("kendoDatePicker");
  if (profileData && profileData.app_passportIssueCountry) {
    // Parse the date string from profileData
    var passIssueDate = new Date(profileData.app_passportIssueDate);

    // Set the value of the DatePicker
    datePickerPassIssueDate.value(passIssueDate);

    // Trigger the change event
    datePickerPassIssueDate.trigger("change");
  } else {
    console.log("Date of birth not found in profileData");
  }

  //passport expiry date
  // Check if app_dob exists and is not empty in profileData
  var datePickerPassExpire = $("#PassportExpiryDate").data("kendoDatePicker");
  if (profileData && profileData.app_passportExpiryDate) {
    // Parse the date string from profileData
    var passExpiryDate = new Date(profileData.app_passportExpiryDate);

    // Set the value of the DatePicker
    datePickerPassExpire.value(passExpiryDate);

    // Trigger the change event
    datePickerPassExpire.trigger("change");
  } else {
    console.log("Date of birth not found in profileData");
  }

  document.getElementById('ppNo').value = profileData.app_passportNumber;

  let passportIssuedCountryHolder = await clickListHolder('Passport Issue Country*');
  await selectListFromHolder(passportIssuedCountryHolder, profileData.app_passportIssueCountry);

  let passportTypeHolder = await clickListHolder('Passport Type*');
  await selectListFromHolder(passportTypeHolder, profileData.app_passportType);


  document.getElementById('IssuePlace').value = profileData.app_passportIssuePlace;

  let countryOfResidenceHolder = await clickListHolder('Country Of Residence*');
  await selectListFromHolder(countryOfResidenceHolder, profileData.app_countryOfResidence);

  document.getElementById('Mobile').value = profileData.app_phoneNumber;
  document.getElementById('Email').value = profileData.app_email;
  console.log(profileData.app_email_app_password);
  document.getElementById('LastName').value = profileData.app_lastName;



}

let otpsenfAction = '';

async function createAccountAutomaticAsync() {

  window.alert = function () {
    return true;
  };
  otpsenfAction = 'SendRegisterUserVerificationCode';
  registerSubmitfAction = 'Account/RegisterUser';
  async function logResponseVtv() {
    // Check if the request is completed
    if (this.readyState === 4) {
      console.log("API call intercepted otpsending", {
        // method: this._method, // Access the method using _method property
        //url: this.responseURL, // Access the URL using responseURL property
        //status: this.status,
        //responseText: this.responseText,
      });
      try {
        console.log(this.status);
        // Check if the URL includes "BlsAppointment/VisaAppointmentForm?appointmentId=" and the status is not success
        if (this.responseURL.includes(otpsenfAction) && this.status !== 200) {
          console.log("HTML Error:", this.status);
          let timeOut = 5000;
          if (this.status === 429) {
            timeOut = 100000;
          }
          setTimeout(() => {
            //document.getElementById("btnSubmit").click();
          }, timeOut);
        }
        if (this.status === 200 && (this.responseURL.includes(otpsenfAction))) {
          console.log('otp sent OK 200');
          try {
            const jsonResponse = JSON.parse(this.response);
            console.log('Response JSON:', jsonResponse);

            // Check for Passport Number already exists error
            if (jsonResponse.success === false) {
              if (jsonResponse.err && jsonResponse.err === "Mobile Number Already Exist") {
                console.log('Error: Mobile Number Already Exist.');
                // Handle the specific error for mobile number
                document.getElementById('Mobile').value = introduceHumanErrorMobileNumber(profileData.app_phoneNumber); // Assuming you have a function for this
                afterVerifyCaptchaRegisterUserAsync();
              }
            }
            else {
              afterSuccessOtpSentRegisterUserAsync();
            }

          } catch (error) {
            console.error('Failed to parse JSON or other error:', error);
          }

        } else if (this.responseURL.includes(otpsenfAction) && (this.status === 504 || this.status === 502 || this.status === 503)) {
          console.log('network error going to repeat');
          afterVerifyCaptchaRegisterUserAsync();
        } else if (this.status === 429 && (this.responseURL.includes(otpsenfAction))) {
          console.log('too many request will repeat ...');
          await delay(120 * 1000);
          afterVerifyCaptchaRegisterUserAsync();
        }
      } catch {
        console.log("error");
      }

      try {
        console.log(this.status);
        // Check if the URL includes "BlsAppointment/VisaAppointmentForm?appointmentId=" and the status is not success
        if (this.responseURL.includes(registerSubmitfAction) && this.status !== 200) {
          console.log("HTML Error:", this.status);
          let timeOut = 5000;
          if (this.status === 429) {
            timeOut = 100000;
          }
          setTimeout(() => {
            //document.getElementById("btnSubmit").click();
          }, timeOut);
        }
        if (this.status === 200 && (this.responseURL.includes(registerSubmitfAction)||this.responseURL.includes(otpsenfAction))) {
          console.log('submit sent OK 200');

          // Parse and handle the JSON response
          try {
            const jsonResponse = JSON.parse(this.response);
            console.log('Response JSON:', jsonResponse);

            // Check for Passport Number already exists error
            if (jsonResponse.success === false ) {
              if (jsonResponse.error && jsonResponse.error.includes('The passport number you entered is already exists')) {
                console.log('Error: Passport Number already exists. Please register with another passport number.');
                // Handle the specific error for passport number
                document.getElementById('ppNo').value = introduceHumanErrorPassportNumber(profileData.app_passportNumber);
                document.getElementById('btnSubmit').click();
              }
              else if (jsonResponse.error && jsonResponse.error.includes("Mobile Number Already Exist")) {
                console.log('Error: Mobile Number Already Exist.');
                // Handle the specific error for mobile number
                document.getElementById('Mobile').value = introduceHumanErrorMobileNumber(profileData.app_phoneNumber); // Assuming you have a function for this
                document.getElementById('btnSubmit').click();
              }
            } else if(jsonResponse.success === true && this.responseURL.includes(registerSubmitfAction)) {
              localStorage.setItem('passwordchanged', false);
              document.getElementById('contBtn').click();
            }

          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        }

        else if (this.responseURL.includes(registerSubmitfAction) && (this.status === 504 || this.status === 502 || this.status === 503)) {
          console.log('network error going to repeat');
          // submit again
        } else if (this.status === 429 && (this.responseURL.includes(registerSubmitfAction))) {
          console.log('too many request will repeat ...');
          await delay(120 * 1000);
          // submit again
        }
      } catch {
        console.log("error");
      }
    }
  }

  // Intercept XMLHttpRequest
  var originalXHROpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function (method, url) {
    // Store method as a property for later access
    this._url = url;
    this._method = method;
    this.addEventListener("load", logResponseVtv);
    originalXHROpen.apply(this, arguments);
  };

  OnVarifyCaptcha = function OnVarifyCaptcha(res) {
    if (res.exceeded) {
      window.location.href = window.location.href.split("?")[0];
      return false;
    }
    else if (res.success) {
      $("#btnVerify").hide();
      $("#btnVerified").show();
      $("#btnGenerate").show();
      $("#CaptchaData").val(res.captcha);
      afterVerifyCaptchaRegisterUserAsync();

    }
  }
  document.getElementById("btnVerify").click();

}
async function afterVerifyCaptchaRegisterUserAsync() {
  console.log('captcha veryfied');

  document.getElementById('btnGenerate').click();
}
async function afterSuccessOtpSentRegisterUserAsync() {
  console.log('otp sent');

  setTimeout(() => {
    getOtpAsync();
  }, 5000);
}

function introduceHumanErrorMobileNumber(mobileNumber) {
  // Convert the mobile number to a string if it's not already
  const mobileStr = mobileNumber.toString();

  // Generate a new random number with the same length
  let randomNumber = '';

  for (let i = 0; i < mobileStr.length; i++) {
    // Generate a random digit between 0 and 9
    const randomDigit = Math.floor(Math.random() * 10);
    randomNumber += randomDigit.toString();
  }

  return randomNumber; // Return the new random number
}

let previousResults = []; // Store previous results outside the function

function introduceHumanErrorPassportNumber(text) {
  // Check for digits at the end of the text
  const digitRegex = /\d+$/;
  const match = text.match(digitRegex);

  if (match) {
    const originalDigits = match[0];
    const textWithoutDigits = text.slice(0, -originalDigits.length);
    let modifiedDigits = originalDigits.split('');
    let newDigits = originalDigits;

    // Loop until a valid modification is found
    while (previousResults.includes(newDigits) || newDigits === originalDigits) {
      modifiedDigits = originalDigits.split('');

      // Randomly decide how many modifications to make (1 or 2)
      const modifications = Math.floor(Math.random() * 2) + 1; // 1 or 2 modifications

      for (let m = 0; m < modifications; m++) {
        if (Math.random() > 0.5 && modifiedDigits.length > 1) {
          // Swap two adjacent digits
          const swapIndex = Math.floor(Math.random() * (modifiedDigits.length - 1));
          [modifiedDigits[swapIndex], modifiedDigits[swapIndex + 1]] = [modifiedDigits[swapIndex + 1], modifiedDigits[swapIndex]];
        } else {
          // Change one digit randomly
          const changeIndex = Math.floor(Math.random() * modifiedDigits.length);
          modifiedDigits[changeIndex] = Math.floor(Math.random() * 10).toString();
        }
      }

      // Join the modified digits to form the new sequence
      newDigits = modifiedDigits.join('');
    }

    // Store the new modified digits to prevent repetition
    previousResults.push(newDigits);

    // Return the updated text with modified digits
    return textWithoutDigits + newDigits;
  }

  // Return the original text if no digits are found
  return text;
}

if (currentUrl.includes(baseTarget + targetCounry + '/appointmentdata/myappointments')) {
  setTimeout(() => {
    document.querySelector('#tab-0 > div > div.col-lg-8.col-xl-9.col-sm-12 > div.row.border.p-3.rounded-3.mb-2 > div:nth-child(7) > a')?.click();
  }, 1000);

  let isPointmentExistAction = 'appointmentdata/IsAppointmentExist?id';
  async function logResponseVtv() {
    // Check if the request is completed
    if (this.readyState === 4) {
      console.log("API call intercepted isAppointment exist", {
        // method: this._method, // Access the method using _method property
        //url: this.responseURL, // Access the URL using responseURL property
        //status: this.status,
        //responseText: this.responseText,
      });
      try {
        console.log(this.status);
        // Check if the URL includes "BlsAppointment/VisaAppointmentForm?appointmentId=" and the status is not success
        if (this.responseURL.includes(isPointmentExistAction) && this.status === 200) {
          setTimeout(() => {
            handleManageApplicantAsync();
          }, 1000);

        }
        else if (this.responseURL.includes(isPointmentExistAction) && this.status !== 200) {
          console.log("HTML Error:", this.status);
          let timeOut = 5000;
          if (this.status === 429) {
            timeOut = 100000;
          }
          setTimeout(() => {
            document.querySelector('#tab-0 > div > div.col-lg-8.col-xl-9.col-sm-12 > div.row.border.p-3.rounded-3.mb-2 > div:nth-child(7) > a')?.click();
          }, timeOut);
        }
      } catch {
        console.log("error");
      }


    }
  }

  // Intercept XMLHttpRequest
  var originalXHROpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function (method, url) {
    // Store method as a property for later access
    this._url = url;
    this._method = method;
    this.addEventListener("load", logResponseVtv);
    originalXHROpen.apply(this, arguments);
  };

}
async function handleManageApplicantAsync() {
  let locationHolder = await clickListHolder('Location*');
  await selectListFromHolder(locationHolder, `${localStorage.getItem("city")}`);
  let visaTypeHolder = await clickListHolder('Visa Type*');
  await selectListFromHolder(visaTypeHolder, `${localStorage.getItem("selectionVisaType")}`);

  document.querySelector('#visaTypeModal > div > div > div.modal-footer > button.btn.btn-success')?.click();

}

if (currentUrl.includes('appointmentdata/ManageApplicant?userId')) {
  setTimeout(() => {
    handleManageApplicantDetailAsync();
  }, 1000);
  /*
  setTimeout(() => {
    document.querySelector('#tab-0 > div > div.col-lg-8.col-xl-9.col-sm-12 > div.row.border.p-3.rounded-3.mb-2 > div:nth-child(7) > a')?.click();
  }, 1000);

  let isPointmentExistAction = 'appointmentdata/IsAppointmentExist?id';
  async function logResponseVtv() {
    // Check if the request is completed
    if (this.readyState === 4) {
      console.log("API call intercepted isAppointment exist", {
        // method: this._method, // Access the method using _method property
        //url: this.responseURL, // Access the URL using responseURL property
        //status: this.status,
        //responseText: this.responseText,
      });
      try {
        console.log(this.status);
        // Check if the URL includes "BlsAppointment/VisaAppointmentForm?appointmentId=" and the status is not success
        if (this.responseURL.includes(isPointmentExistAction) && this.status === 200) {
          setTimeout(() => {
            handleManageApplicantDetailAsync();
          }, 1000);
          
        }
        else if (this.responseURL.includes(isPointmentExistAction) && this.status !== 200) {
          console.log("HTML Error:", this.status);
          let timeOut = 5000;
          if (this.status === 429) {
            timeOut = 100000;
          }
          setTimeout(() => {
            document.querySelector('#tab-0 > div > div.col-lg-8.col-xl-9.col-sm-12 > div.row.border.p-3.rounded-3.mb-2 > div:nth-child(7) > a')?.click();
          }, timeOut);
        }
      } catch {
        console.log("error");
      }

      
    }
  }

  // Intercept XMLHttpRequest
  var originalXHROpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function (method, url) {
    // Store method as a property for later access
    this._url = url;
    this._method = method;
    this.addEventListener("load", logResponseVtv);
    originalXHROpen.apply(this, arguments);
  };
  */

}
async function handleManageApplicantDetailAsync() {

  profileData = JSON.parse(localStorage.getItem('profileData'));
  console.log(profileData.app_countryOfResidence);

  let countryOfBirthHolder = await clickListHolder('Country Of Birth*');
  await selectListFromHolder(countryOfBirthHolder, profileData.app_countryOfResidence);// this should country of birth not country of residence

  let GenderhHolder = await clickListHolder('Gender*');
  await selectListFromHolder(GenderhHolder, profileData.app_gender);

  let martialStatusHolder = await clickListHolder('Marital Status*');
  await selectListFromHolder(martialStatusHolder, profileData.app_maritalStatus);

  let purposeOfJourneyHolder = await clickListHolder('Purpose Of Journey*');
  await selectListFromHolder(purposeOfJourneyHolder, profileData.app_purposeOfJourney);


  // only for family
  //let relatioinShipHolder = await clickListHolder('Relationship');
  //await selectListFromHolder(relatioinShipHolder, "Child");

  document.getElementById('PlaceOfBirth').value = profileData.app_placeOfBirth;

  let datePicker = $("#TravelDate").data("kendoDatePicker");
      datePicker.value(new Date(new Date().setMonth(new Date().getMonth() + 3)));
      datePicker.trigger("change");

  if(profileData.app_oldVisaNumber !==null && profileData.app_oldVisaNumber !==undefined &&profileData.app_oldVisaNumber !=="")   {

    console.log("visa start date: ",profileData.app_visaStartDate);

    document.getElementById('PreviousVisaNumber').value = profileData.app_oldVisaNumber;

    let datePicker2 = $("#PreviousVisaValidFrom").data("kendoDatePicker");
      datePicker2.value(new Date(profileData.app_visaStartDate));
      datePicker2.trigger("change");

      let datePicker3 = $("#PreviousVisaValidTo").data("kendoDatePicker");
      datePicker3.value(new Date(profileData.app_visaEndDate));
      datePicker3.trigger("change");

      let oldVisaCountryHolder = await clickListHolder('Previous Visa Issued Country*');
      await selectListFromHolder(oldVisaCountryHolder, profileData.app_OldeVisaCountry);

  }

  //[...document.querySelectorAll('#CountryOfBirthId_listbox li')].find(li => li.textContent.trim() === "Afghanistan")?.click();

  //document.querySelector('#myForm > div.card.border.mb-3 > div.card-body.g-3 > div.text-right > button.btn.btn-primary').click();




}


/*
profileData.app_city
profileData.app_countryOfResidence
profileData.app_dhahabyaCVV
profileData.app_dhahabyaCardNumber
profileData.app_dhahabyaExpirationDate
profileData.app_dhahabyaFullName
profileData.app_dob
profileData.app_email
profileData.app_familyMembers
profileData.app_firstName
profileData.app_gender
profileData.app_lastName
profileData.app_maritalStatus
profileData.app_numberOfFamilyMembers
profileData.app_oldVisaNumber
profileData.app_passportExpiryDate
profileData.app_passportIssueCountry
profileData.app_passportIssueDate
profileData.app_passportIssuePlace
profileData.app_passportNumber
profileData.app_passportType
profileData.app_phoneNumber
profileData.app_placeOfBirth
profileData.app_purposeOfJourney
profileData.app_relationship
profileData.app_surname
profileData.app_visaEndDate
profileData.app_visaStartDate
profileData.app_visaSubType
profileData.app_visaType
*/


