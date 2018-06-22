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



var wizardsList = createDOMWizardsList(getWizards());
addWizardsToPage(wizardsList);


/* module4-task1 */
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYE_COLORS = [
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
var setupBlock = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupSimilar = setupBlock.querySelector('.setup-similar');
var userIcon = document.querySelector('.setup-open-icon');
var userNameInput = document.querySelector('.setup-user-name');

function openSetup() {
  setupBlock.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
  document.addEventListener('keydown', onKeyEscPressHandler);
  document.addEventListener('keydown', onSetupClosePressHandler);
}

function closeSetup() {
  setupBlock.classList.add('hidden');
  setupSimilar.classList.add('hidden');
  document.removeEventListener('keydown', onKeyEscPressHandler);
}

function isIconInFocus() {
  return (userIcon === document.activeElement);
}

function isCloseBtnInFocus() {
  return (setupClose === document.activeElement);
}

function isInputNameInFocus() {
  return (userNameInput === document.activeElement);
}

function isSetupOpened() {
  return (!setupBlock.classList.contains('hidden'));
}

function onKeyEnterPressHandler(event) {
  if (event.keyCode === 13) {
    openSetup();
  }
}

function onSetupClosePressHandler(event) {
  if (event.keyCode === 27 && isCloseBtnInFocus()) {
    closeSetup();
  }
}

function onKeyEscPressHandler(event) {
  if (event.keyCode === 27 && !isInputNameInFocus()) {
    closeSetup();
  }
}

function onIconFocusHandler() {
  document.addEventListener('keydown', onKeyEnterPressHandler);
}

function onIconBlurHandler() {
  document.removeEventListener('keydown', onKeyEnterPressHandler);
}

setupOpen.addEventListener('click', openSetup);
setupClose.addEventListener('click', closeSetup);
userIcon.addEventListener('focus', onIconFocusHandler);
userIcon.addEventListener('blur', onIconBlurHandler);
