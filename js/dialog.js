'use strict';

var setupBlock = document.querySelector('.setup');
var setupPic = document.querySelector('.upload');

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
          setupPic.removeEventListener('click', onClickPreventDefault)
        };
        setupPic.addEventListener('click', onClickPreventDefault);
      }

    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})
