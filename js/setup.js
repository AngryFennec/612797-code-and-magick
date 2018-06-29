'use strict';
(function () {
  var setupBlock = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupSimilar = setupBlock.querySelector('.setup-similar');
  var userIcon = document.querySelector('.setup-open-icon');
  var userNameInput = document.querySelector('.setup-user-name');

  function showSetup() {
    setupBlock.classList.remove('hidden');
    setupSimilar.classList.remove('hidden');
  }

  function hideSetup() {
    setupBlock.classList.add('hidden');
    setupSimilar.classList.add('hidden');
  }

  function isIconInFocus() {
    return userIcon === document.activeElement;
  }

  function isInputNameInFocus() {
    return userNameInput === document.activeElement;
  }

  function isSetupOpened() {
    return !setupBlock.classList.contains('hidden');
  }

  function getSetupBlock() {
    return setupBlock;
  }

  function getSetupOpen() {
    return setupOpen;
  }

  function getSetupClose() {
    return setupClose;
  }

  function getUserIcon() {
    return userIcon;
  }

  window.setup = {
    show: showSetup,
    hide: hideSetup,
    isIconInFocus: isIconInFocus,
    isInputNameInFocus: isInputNameInFocus,
    isSetupOpened: isSetupOpened,
    getSetupBlock: getSetupBlock,
    getSetupOpen: getSetupOpen,
    getSetupClose: getSetupClose,
    getUserIcon: getUserIcon
  };

})();
