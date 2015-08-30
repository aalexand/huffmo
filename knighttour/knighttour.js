"use strict";

function getQueryParam(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return undefined;
}

var R = getQueryParam('r') || 5;
var C = getQueryParam('c') || 5;
var counter = 0;
var last = null;
var board = new Array(R);

function foo(event) {
  var cell = $(event.target);
  if (last == null || cell.hasClass('candidate')) {
    cell.toggleClass('clicked');
    $('.candidate').removeClass('candidate');
    cell.text(counter++);
    last = event.target;
    var moves = possibleMoves(cell.prop('row'), cell.prop('col'));
    for (var i in moves) {
      var candidate = board[moves[i][0]][moves[i][1]];
      if (candidate.hasClass('clicked')) {
        continue;
      }
      candidate.addClass('candidate');
    }
  }
  return true
}

function possibleMoves(row, col) {
  var ret = [
    [row+2, col+1], [row+1, col+2],
    [row+2, col-1], [row+1, col-2],
    [row-2, col+1], [row-1, col+2],
    [row-2, col-1], [row-1, col-2],
  ].filter(function(x) {
    return x[0] >= 0 && x[0] < R && x[1] >= 0 && x[1] < C;
  });
  return ret;
}

$(window).load(function() {
  $('#mainChessBoard').width(C * 40).height(R * 40);
  for (var i = 0; i < R; i++) {
    board[i] = new Array(C);
    for (var j = 0; j < C; j++) {
      var child = $('<div>').appendTo('#mainChessBoard');
      board[i][j] = child;
      child.prop('row', i);
      child.prop('col', j);
      var colorClass = parseInt(R - i + 1 + j) % 2 == 0 ? 'black' : 'white';
      child.addClass('square');
      child.addClass('candidate');
      child.addClass(colorClass);
      child.click(foo);
    }
  }
});

// vim: set ts=2 et sw=2 sts=2 :

