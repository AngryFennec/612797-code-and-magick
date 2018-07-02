'use strict';
(function () {
  var setupBlock = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupSimilar = setupBlock.querySelector('.setup-similar');
  var userIcon = document.querySelector('.setup-open-icon');
  var userNameInput = document.querySelector('.setup-user-name');
  var setupSubmit = setupBlock.querySelector('.setup-submit');

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

  function setOpenListener(callback) {
    setupOpen.addEventListener('click', callback);
  }

  function setCloseListener(callback) {
    setupClose.addEventListener('click', callback);
  }

  function setIconListener(evt, callback) {
    userIcon.addEventListener(evt, callback);
  }

  function setSumbitListener(callback) {
    setupSubmit.addEventListener('click', callback);
  }

  window.setup = {
    show: showSetup,
    hide: hideSetup,
    isIconInFocus: isIconInFocus,
    isInputNameInFocus: isInputNameInFocus,
    isSetupOpened: isSetupOpened,
    getSetupBlock: getSetupBlock,
    setOpenListener: setOpenListener,
    setCloseListener: setCloseListener,
    setIconListener: setIconListener,
    setSumbitListener: setSumbitListener
  };

})();
