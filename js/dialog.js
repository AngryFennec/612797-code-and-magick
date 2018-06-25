'use strict';
(function () {
  var setupBlock = document.querySelector('.setup');
  var setupPic = document.querySelector('.upload');
  var isMoved = false;
  var initCoords = null;

  function setInitCoords(obj) {
    if (!isMoved) {
      var tempCoords = {
        x: obj.style.left,
        y: obj.style.top
      };
      initCoords = tempCoords;
      isMoved = true;
    }
  }

  function getInitCoords() {
    return initCoords;
  }

  function setCoords(obj) {
    if (initCoords !== null) {
      obj.style.top = initCoords.y;
      obj.style.left = initCoords.x;
    }
  }

  function setHandler() {
    setupPic.addEventListener('mousedown', function (event) {
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

        setupBlock.style.top = (setupBlock.offsetTop - shift.y) + 'px';
        setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + 'px';
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
    });
  }
  window.dialog = {
    getInitCoords: getInitCoords,
    setInitCoords: setInitCoords,
    setHandler: setHandler,
    setCoords: setCoords
  };
})();
