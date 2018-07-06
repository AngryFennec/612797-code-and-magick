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
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var coatColor;
  var eyesColor;
  var wizards = [];

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
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  }

  function addWizardsToPage(fragment) {
    removeWizardsFromPage();
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

  function showWizards(wizardsArray) {
    wizards = wizardsArray;
    coatColor = wizardObject.coatInput.value;
    eyesColor = wizardObject.eyesInput.value;
    var wizardsList = createDOMWizardsList(wizards.slice(0, 4));
    addWizardsToPage(wizardsList);
  }

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  var updateWizards;

  function changeCoatColor() {
    var newCoatColor = getRandomArrayElement(COAT_COLORS);
    coatColor = newCoatColor;
    wizardObject.coat.style.fill = coatColor;
    wizardObject.coatInput.value = coatColor;
    updateWizards();
  }

  function changeEyesColor() {
    var newEyesColor = getRandomArrayElement(EYES_COLORS);
    eyesColor = newEyesColor;
    wizardObject.eyes.style.fill = eyesColor;
    wizardObject.eyesInput.value = eyesColor;
    updateWizards();
  }


  function setWizardHandlers() {
    wizardObject.coat.addEventListener('click', function () {
      changeCoatColor();
    });
    wizardObject.eyes.addEventListener('click', function () {
      changeEyesColor();
    });
    wizardObject.fireball.addEventListener('click', function () {
      var fireballColor = getRandomArrayElement(FIREBALL_COLORS);
      wizardObject.fireball.style.background = fireballColor;
      wizardObject.fireballInput.value = fireballColor;
    });
  }

  function setDebounce(callback) {
    updateWizards = callback(function () {
      var sameCoatAndEyesWizards = wizards.filter(function (it) {
        return it.colorCoat === coatColor &&
          it.colorEyes === eyesColor;
      });

      var sameCoatWizards = wizards.filter(function (it) {
        return it.colorCoat === coatColor;
      });
      var sameEyesWizards = wizards.filter(function (it) {
        return it.colorEyes === eyesColor;
      });

      var filteredWizards = sameCoatAndEyesWizards;
      filteredWizards = filteredWizards.concat(sameCoatWizards);
      filteredWizards = filteredWizards.concat(sameEyesWizards);
      filteredWizards = filteredWizards.concat(wizards);

      var uniqueWizards = filteredWizards.filter(function (it, i) {
        return filteredWizards.indexOf(it) === i;
      });


      showWizards(uniqueWizards.slice().
            sort(function (left, right) {
              var rankDiff = getRank(right) - getRank(left);
              if (rankDiff === 0) {
                namesComparator(left.name, right.name);
              }
              return rankDiff;
            }));
    });
  }

  window.data = {
    show: showWizards,
    setWizardHandlers: setWizardHandlers,
    remove: removeWizardsFromPage,
    setDebounce: setDebounce
  };


})();
