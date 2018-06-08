'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var POPULATION = 4;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getRandomArrayElement(array) {
  var max = array.length - 1;
  return array[getRandomInt(0, max)];
}

function createWizard(firstNames, secondNames, coatColors, eyesColors) {
  var wizard = {
    name: getRandomArrayElement(firstNames) + ' ' + getRandomArrayElement(secondNames),
    coatColor: getRandomArrayElement(coatColors),
    eyesColor: getRandomArrayElement(eyesColors)
  };
  return wizard;
}

function getWizards() {
  var wizards = [];
  for (var i = 0; i < POPULATION; i++) {
    wizards[i] = createWizard(FIRST_NAMES, SECOND_NAMES, COAT_COLORS, EYES_COLOR);
  }
  return wizards;
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

function createDOMWizardsList(wizardsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsArray.length; i++) {
    fragment.appendChild(createDOMWizard(wizardsArray[i]));
  }
  return fragment;
}

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var wizardsList = createDOMWizardsList(getWizards());
addWizardsToPage(wizardsList);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
