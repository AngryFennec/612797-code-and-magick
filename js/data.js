'use strict';
(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var wizardObject = {
    coat: document.querySelector('.setup-wizard .wizard-coat'),
    coatInput: document.querySelector('input[name="coat-color"]'),
    eyes: document.querySelector('.setup-wizard .wizard-eyes'),
    eyesInput: document.querySelector('input[name="eyes-color"]'),
    fireball: document.querySelector('.setup-fireball-wrap'),
    fireballInput: document.querySelector('input[name="fireball-color"]'),
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  function getRandomArrayElement(array) {
    var max = array.length - 1;
    return array[getRandomInt(0, max)];
  }

  function createDOMWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  }

  function addWizardsToPage(fragment) {
    similarListElement.appendChild(fragment);
  }

  function removeWizardsFromPage() {
    similarListElement.innerHTML = '';
  }

  function createDOMWizardsList(wizardsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsArray.length; i++) {
      fragment.appendChild(createDOMWizard(wizardsArray[i]));
    }
    return fragment;
  }

  function showWizards(wizards) {
    var wizardsList = createDOMWizardsList(wizards.slice(0, 4));
    addWizardsToPage(wizardsList);
  }


  function setWizardHandlers() {
    wizardObject.coat.addEventListener('click', function () {
      var coatColor = getRandomArrayElement(COAT_COLORS);
      wizardObject.coat.style.fill = coatColor;
      wizardObject.coatInput.value = coatColor;
    });
    wizardObject.eyes.addEventListener('click', function () {
      var eyesColor = getRandomArrayElement(EYES_COLORS);
      wizardObject.eyes.style.fill = eyesColor;
      wizardObject.eyesInput.value = eyesColor;
    });
    wizardObject.fireball.addEventListener('click', function () {
      var fireballColor = getRandomArrayElement(FIREBALL_COLORS);
      wizardObject.fireball.style.background = fireballColor;
      wizardObject.fireballInput.value = fireballColor;
    });
  }

  window.data = {
    show: showWizards,
    setWizardHandlers: setWizardHandlers,
    remove: removeWizardsFromPage
  };
})();
