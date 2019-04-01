var closeWindow = function() {
  var element = document.getElementById("pop-up-wrapper");
  var popup = document.getElementById("success-message");
  var formWindow = document.getElementById("pop-up-window");
  element.style.top = "-999px";
  element.style.left = "-999px";
  popup.style.display = "none";
  formWindow.style.display = "flex";
};
var openWindow = function() {
  var element = document.getElementById("pop-up-wrapper");
  element.style.top = "0";
  element.style.left = "0";
};

var stopOnclick = function(event) {
  event.stopPropagation();
};

var submissionSuccessfull = function(name) {
  var popup = document.getElementById("success-message");
  var formWindow = document.getElementById("pop-up-window");

  var successText = document.getElementById("success-message-text");
  var bold = document.createElement("strong");
  var textnode = document.createTextNode(name);
  bold.appendChild(textnode);
  textnode = document.createTextNode(", сообщение получено, рады знакомству!");
  successText.appendChild(bold);
  successText.appendChild(textnode);
  formWindow.style.display = "none";
  popup.style.display = "flex";
};
window.addEventListener(
  "load",
  function load() {
    window.removeEventListener("load", load, false);
    document.getElementById("main-logo-wrapper").classList.remove("fade-out");
    setTimeout(function() {
      document.getElementById("middle-text").classList.remove("fade-in");
      document.getElementById("growing-icon").classList.remove("fade-in");
      document.getElementById("footer").classList.remove("fade-in");
    }, 1300);
    setTimeout(function() {
      document.getElementById("mymuseum-logo").classList.remove("fade-in");
    }, 2000);
    setTimeout(function() {
      document.getElementById("gallerist-logo").classList.remove("fade-in");
    }, 2250);
    setTimeout(function() {
      document.getElementById("private-logo").classList.remove("fade-in");
    }, 2500);
    setTimeout(function() {
      document.getElementById("artist-logo").classList.remove("fade-in");
    }, 2750);
  },
  false
);

var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
var formTried = false;

function validateForm() {
  var name = document.forms["myForm"]["name"];
  var organisation = document.forms["myForm"]["organisation"];
  var phone = document.forms["myForm"]["telephone"];
  var mail = document.forms["myForm"]["mail"];
  var description = document.forms["myForm"]["description"];
  var button = document.getElementById("submit-button");
  var toggle = true;

  if (name.value == "") {
    toggle = false;
    name.classList.add("error-border");
  } else {
    name.classList.remove("error-border");
    name.style.borderColor = "#19a638";
  }

  if (organisation.value == "") {
    toggle = false;
    organisation.classList.add("error-border");
  } else {
    organisation.classList.remove("error-border");
    organisation.style.borderColor = "#19a638";
  }

  if (mail.value == "" || !emailRegex.test(mail.value)) {
    toggle = false;
    mail.classList.add("error-border");
  } else {
    mail.classList.remove("error-border");
    mail.style.borderColor = "#19a638";
  }

  if (phone.value == "" || !phoneRegex.test(phone.value)) {
    toggle = false;
    phone.classList.add("error-border");
  } else {
    phone.classList.remove("error-border");
    phone.style.borderColor = "#19a638";
  }

  if (description.value == "") {
    toggle = false;
    description.classList.add("error-border");
  } else {
    description.classList.remove("error-border");
    description.style.borderColor = "#19a638";
  }

  if (!toggle) {
    button.classList.remove("success-border");
    button.classList.add("error-border-button");
  } else {
    button.classList.remove("error-border-button");
    button.classList.add("success-border");
  }
  formTried = true;

  if (toggle) {
    var x = new XMLHttpRequest();
    var data = {};
    data.name = name.value;
    data.number = phone.value;
    data.organisation = organisation.value;
    data.description = description.value;
    data.mail = mail.value;

    var string = JSON.stringify(data);

    x.open("POST", "mailer.php", true);
    x.setRequestHeader("Content-type", "application/json");

    x.onreadystatechange = function() {
      if (x.readyState != 4) return;
      if (x.status != 200 && x.status != 304) {
        alert("HTTP error " + req.status);
        return;
      }

      //data.resp = JSON.parse(x.responseText);
      //if (data.resp.status == "success") {
      console.log("response: ", x.responseText);
      //} else {
      // alert("That didn't work!");
      //}
    };
    submissionSuccessfull(name.value);
    console.log("sent");
    x.send(string);

    return false;
  }

  return false;
}

var nameValid = false;
var organisationValid = false;
var phoneValid = false;
var emailValid = false;
var descriptionValid = false;

function handleChangeName() {
  var name = document.forms["myForm"]["name"];
  var button = document.getElementById("submit-button");
  var buttonIcon = document.getElementById("button-icon");
  var buttonIconReady = document.getElementById("button-icon-ready");
  var icon = document.getElementById("name-icon");
  if (name.value == "") {
    icon.style.opacity = "0.45";
    nameValid = false;
    if (formTried) {
      name.classList.add("error-border");
    } else {
      name.style.borderColor = "inherit";
    }
  } else {
    name.classList.remove("error-border");
    name.style.borderColor = "#19a638";
    icon.style.opacity = "1";
    nameValid = true;
  }
  if (
    nameValid &&
    organisationValid &&
    phoneValid &&
    emailValid &&
    descriptionValid
  ) {
    button.classList.remove("error-border-button");
    button.classList.add("success-border");
    buttonIcon.style.display = "none";
    buttonIconReady.style.display = "block";
  } else if (formTried) {
    button.classList.remove("success-border");
    button.classList.add("error-border-button");
    buttonIconReady.style.display = "none";
    buttonIcon.style.display = "block";
  } else {
    button.classList.remove("success-border");
    button.style.borderColor = "inherit";
    buttonIconReady.style.display = "none";
    buttonIcon.style.display = "block";
  }
}

function handleChangeOrganisation() {
  var organisation = document.forms["myForm"]["organisation"];
  var button = document.getElementById("submit-button");
  var buttonIcon = document.getElementById("button-icon");
  var buttonIconReady = document.getElementById("button-icon-ready");
  var icon = document.getElementById("organisation-icon");
  if (organisation.value == "") {
    icon.style.opacity = "0.45";
    organisationValid = false;
    if (formTried) {
      organisation.classList.add("error-border");
    } else {
      organisation.style.borderColor = "inherit";
    }
  } else {
    organisation.classList.remove("error-border");
    organisation.style.borderColor = "#19a638";
    icon.style.opacity = "1";
    organisationValid = true;
  }
  if (
    nameValid &&
    organisationValid &&
    phoneValid &&
    emailValid &&
    descriptionValid
  ) {
    button.classList.remove("error-border-button");
    button.classList.add("success-border");
    buttonIcon.style.display = "none";
    buttonIconReady.style.display = "block";
  } else if (formTried) {
    button.classList.remove("success-border");
    button.classList.add("error-border-button");
    buttonIconReady.style.display = "none";
    buttonIcon.style.display = "block";
  } else {
    button.classList.remove("success-border");
    button.style.borderColor = "inherit";
    buttonIconReady.style.display = "none";
    buttonIcon.style.display = "block";
  }
}

function handleChangeEmail() {
  var mail = document.forms["myForm"]["mail"];
  var button = document.getElementById("submit-button");
  var buttonIcon = document.getElementById("button-icon");
  var buttonIconReady = document.getElementById("button-icon-ready");
  var icon = document.getElementById("mail-icon");
  if (mail.value == "" || !emailRegex.test(mail.value)) {
    if (mail.value !== "") {
      icon.style.opacity = "1";
    } else {
      icon.style.opacity = "0.45";
    }
    emailValid = false;
    if (formTried) {
      mail.classList.add("error-border");
    } else {
      mail.style.borderColor = "inherit";
    }
  } else {
    mail.classList.remove("error-border");
    mail.style.borderColor = "#19a638";
    icon.style.opacity = "1";
    emailValid = true;
  }
  if (
    nameValid &&
    organisationValid &&
    phoneValid &&
    emailValid &&
    descriptionValid
  ) {
    button.classList.remove("error-border-button");
    button.classList.add("success-border");
    buttonIcon.style.display = "none";
    buttonIconReady.style.display = "block";
  } else if (formTried) {
    button.classList.remove("success-border");
    button.classList.add("error-border-button");
    buttonIconReady.style.display = "none";
    buttonIcon.style.display = "block";
  } else {
    button.classList.remove("success-border");
    button.style.borderColor = "inherit";
    buttonIconReady.style.display = "none";
    buttonIcon.style.display = "block";
  }
}

function handleChangePhone() {
  var phone = document.forms["myForm"]["telephone"];
  var button = document.getElementById("submit-button");
  var buttonIcon = document.getElementById("button-icon");
  var buttonIconReady = document.getElementById("button-icon-ready");
  var icon = document.getElementById("phone-icon");
  if (phone.value == "" || !phoneRegex.test(phone.value)) {
    if (phone.value !== "") {
      icon.style.opacity = "1";
    } else {
      icon.style.opacity = "0.45";
    }
    phoneValid = false;
    if (formTried) {
      phone.classList.add("error-border");
    } else {
      phone.style.borderColor = "inherit";
    }
  } else {
    phone.classList.remove("error-border");
    phone.style.borderColor = "#19a638";
    icon.style.opacity = "1";
    phoneValid = true;
  }
  if (
    nameValid &&
    organisationValid &&
    phoneValid &&
    emailValid &&
    descriptionValid
  ) {
    button.classList.remove("error-border-button");
    button.classList.add("success-border");
    buttonIcon.style.display = "none";
    buttonIconReady.style.display = "block";
  } else if (formTried) {
    button.classList.remove("success-border");
    button.classList.add("error-border-button");
    buttonIconReady.style.display = "none";
    buttonIcon.style.display = "block";
  } else {
    button.classList.remove("success-border");
    button.style.borderColor = "inherit";
    buttonIconReady.style.display = "none";
    buttonIcon.style.display = "block";
  }
}

function handleChangeDescription() {
  var description = document.forms["myForm"]["description"];
  var button = document.getElementById("submit-button");
  var buttonIcon = document.getElementById("button-icon");
  var buttonIconReady = document.getElementById("button-icon-ready");
  var icon = document.getElementById("description-icon");
  if (description.value == "") {
    icon.style.opacity = "0.45";
    descriptionValid = false;
    if (formTried) {
      description.classList.add("error-border");
    } else {
      description.style.borderColor = "inherit";
    }
  } else {
    description.classList.remove("error-border");
    description.style.borderColor = "#19a638";
    icon.style.opacity = "1";
    descriptionValid = true;
  }
  if (
    nameValid &&
    organisationValid &&
    phoneValid &&
    emailValid &&
    descriptionValid
  ) {
    button.classList.remove("error-border-button");
    button.classList.add("success-border");
    buttonIcon.style.display = "none";
    buttonIconReady.style.display = "block";
  } else if (formTried) {
    button.classList.remove("success-border");
    button.classList.add("error-border-button");
    buttonIconReady.style.display = "none";
    buttonIcon.style.display = "block";
  } else {
    button.classList.remove("success-border");
    button.style.borderColor = "inherit";
    buttonIconReady.style.display = "none";
    buttonIcon.style.display = "block";
  }
}
