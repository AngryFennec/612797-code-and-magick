'use strict';
(function () {
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


  window.dialog = {
    getInitCoords: getInitCoords,
    setInitCoords: setInitCoords,
    setCoords: setCoords
  };
})();
