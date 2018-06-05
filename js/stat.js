'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var COLUMN_WIDTH = 40;
var SPACE_WIDTH = 50;
var GISTO_HEIGHT = 150;
var TEXT_HEIGHT = 20;
var CLOUD_START = 100;
var CLOUD_STEP = 20;
var columnHeight = GISTO_HEIGHT - 2 * TEXT_HEIGHT;

function renderComplexCloud(ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y + 2 * CLOUD_STEP);
  ctx.quadraticCurveTo(x, y, x + 2 * CLOUD_STEP, y);
  ctx.lineTo(x + width - 2 * CLOUD_STEP, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + 2 * CLOUD_STEP);
  ctx.lineTo(x + width, y + height - 2 * CLOUD_STEP);
  ctx.quadraticCurveTo(x + width, y + height, x + width - 2 * CLOUD_STEP, y + height);
  ctx.lineTo(x + 2 * CLOUD_STEP, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - 2 * CLOUD_STEP);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
}

function renderColumn(ctx, x, y, color, width, height, text, points) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = 'black';
  ctx.fillText(text, x, y + height + 10);
  ctx.fillText(Math.ceil(points), x, y - TEXT_HEIGHT);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomBlue() {
  return 'hsl(240, ' + getRandomInt(0, 100) + '%, 50%)';
}

function getStartX(cloudWidth, cloudStart, columnWidth, spaceWidth, names) {
  var workflowWidth = names.length * columnWidth + (names.length - 1) * spaceWidth;
  return (cloudWidth - workflowWidth) / 2 + cloudStart;
}

function getMaxElement(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
}

window.renderStatistics = function (ctx, names, times) {
  renderComplexCloud(ctx, CLOUD_START + 10, 20, 'rgba(0, 0, 0, 0.7)', CLOUD_WIDTH, CLOUD_HEIGHT);
  renderComplexCloud(ctx, CLOUD_START, 10, 'white', CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.font = 'PT Mono 16px';
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 130, 30);
  ctx.fillText('Список результатов:', 130, 50);
  var startX = getStartX(CLOUD_WIDTH, CLOUD_START, COLUMN_WIDTH, SPACE_WIDTH, names);
  var maxResult = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var color = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomBlue();
    var calculatedHeight = columnHeight / maxResult * times[i];
    renderColumn(ctx, startX + i * (COLUMN_WIDTH + SPACE_WIDTH), 120 + columnHeight - calculatedHeight, color, COLUMN_WIDTH, calculatedHeight, names[i], times[i]);
  }
};
