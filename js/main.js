'use strict';
(function () {
  var setupPic = document.querySelector('.upload');
  function onSetupPickMousedown(event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };
    var dragged = false;

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      window.setup.getSetupBlock().style.top = (window.setup.getSetupBlock().offsetTop - shift.y) + 'px';
      window.setup.getSetupBlock().style.left = (window.setup.getSetupBlock().offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          setupPic.removeEventListener('click', onClickPreventDefault);
        };
        setupPic.addEventListener('click', onClickPreventDefault);
      }

    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setHandler(obj) {
    obj.addEventListener('mousedown', onSetupPickMousedown);
  }

  function removeHandler(obj) {
    obj.removeEventListener('mousedown', onSetupPickMousedown);
  }

  function openSetup() {
    window.dialog.setInitCoords(window.setup.getSetupBlock());
    window.dialog.setCoords(window.setup.getSetupBlock());
    window.setup.show();
    document.addEventListener('keydown', onKeyEscPressHandler);
    window.data.setWizardHandlers();
    setHandler(setupPic);
  }

  function closeSetup() {
    window.setup.hide();
    document.removeEventListener('keydown', onKeyEscPressHandler);
    removeHandler(setupPic);
  }

  function onKeyEnterPressHandler(event) {
    if (event.keyCode === 13 && !window.setup.isSetupOpened() && window.setup.isIconInFocus()) {
      openSetup();
    }
  }

  function onKeyEscPressHandler(event) {
    if (event.keyCode === 27 && !window.setup.isInputNameInFocus()) {
      closeSetup();
    }
  }

  function onIconFocusHandler() {
    document.addEventListener('keydown', onKeyEnterPressHandler);
  }

  function onIconBlurHandler() {
    document.removeEventListener('keydown', onKeyEnterPressHandler);
  }

  window.data.show();
  window.setup.setOpenListener(openSetup);
  window.setup.setCloseListener(closeSetup);
  window.setup.setIconListener('focus', onIconFocusHandler);
  window.setup.setIconListener('blur', onIconBlurHandler);
})();
