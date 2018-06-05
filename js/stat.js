'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var COLUMN_WIDTH = 40;
var SPACE_WIDTH = 50;
var GISTO_HEIGHT = 150;
var TEXT_HEIGHT = 20;
var CLOUD_START = 100;
var columnHeight = GISTO_HEIGHT - 2 * TEXT_HEIGHT;

function renderCloud(ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
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
  renderCloud(ctx, CLOUD_START + 10, 20, 'rgba(0, 0, 0, 0.7)', CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_START, 10, 'white', CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.font = 'PT Mono 16px';
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 130, 30);
  ctx.fillText('Список результатов:', 130, 50);
  var startX = getStartX(CLOUD_WIDTH, CLOUD_START, COLUMN_WIDTH, SPACE_WIDTH, names);
  var maxResult = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var calculatedHeight = columnHeight / maxResult * times[i];
    if (names[i] === 'Вы') {
      renderColumn(ctx, startX + i * (COLUMN_WIDTH + SPACE_WIDTH), 120 + columnHeight - calculatedHeight, 'rgba(255, 0, 0, 1)', COLUMN_WIDTH, calculatedHeight, names[i], times[i]);
    } else {
      renderColumn(ctx, startX + i * (COLUMN_WIDTH + SPACE_WIDTH), 120 + columnHeight - calculatedHeight, getRandomBlue(), COLUMN_WIDTH, calculatedHeight, names[i], times[i]);
    }
  }
};
