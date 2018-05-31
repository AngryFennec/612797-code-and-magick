var fireballSize = 22;
var getFireballSpeed = function(left) {
  return left ? 5 : 2;
}
var wizardSpeed = 3;
var wizardWidth = 70;
var getwizardHeight = function(width) {
  return 1.337 * width;
}
var getWizardX = function(width) {
  return width/2 - wizardWidth/2;
}
var getWizardY = function(height) {
  return height/3;
}
