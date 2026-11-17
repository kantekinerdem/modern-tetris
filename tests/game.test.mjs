import test from 'node:test';
import assert from 'node:assert/strict';
import { TYPES, createBag, makePiece } from '../js/pieces.js';
import { createBoard, collides, tryRotate, clearLines } from '../js/board.js';
import { Game, STATES } from '../js/game.js';

const audio = { play() {} };

test('7-bag contains each tetromino exactly once', () => {
  const bag = createBag(() => 0.37);
  assert.equal(bag.length, 7);
  assert.deepEqual(new Set(bag), new Set(TYPES));
});

test('all pieces rotate and an I piece can kick away from a wall', () => {
  for (const type of TYPES) {
    const piece = makePiece(type);
    assert.equal(tryRotate(createBoard(), piece, true), true, type);
    assert.equal(piece.rotation, 1, type);
  }
  const piece = makePiece('I');
  piece.x = -2;
  assert.equal(tryRotate(createBoard(), piece), true);
  assert.equal(collides(createBoard(), piece), false);
});

test('collision detects floor and line clearing handles two and four rows', () => {
  const board = createBoard();
  const piece = makePiece('O');
  piece.y = 18;
  assert.equal(collides(board, piece, 0, 1), true);
  board[19].fill('T'); board[18].fill('I');
  assert.equal(clearLines(board), 2);
  for (let y = 16; y < 20; y++) board[y].fill('Z');
  assert.equal(clearLines(board), 4);
  assert.equal(board.length, 20);
});

test('hard drop scores, clears a line, and hold can only be used once per lock', () => {
  const game = new Game(audio);
  game.start();
  game.lines = 9;
  game.current = { ...makePiece('I'), x: 3, y: 0 };
  game.board[19].fill('T');
  for (let x = 3; x < 7; x++) game.board[19][x] = null;
  game.hardDrop();
  assert.equal(game.lines, 10);
  assert.equal(game.score, 136);
  assert.equal(game.level, 2);
  game.holdPiece();
  const held = game.hold;
  assert.equal(game.canHold, false);
  game.holdPiece();
  assert.equal(game.hold, held);
});

test('a four-line clear awards Tetris points at the current level', () => {
  const game = new Game(audio);
  game.start();
  for (let y = 16; y < 20; y++) {
    game.board[y].fill('T');
    game.board[y][4] = null;
  }
  const piece = makePiece('I');
  assert.equal(tryRotate(game.board, piece), true);
  piece.x = 2;
  piece.y = 16;
  game.current = piece;
  game.lock();
  assert.equal(game.lines, 4);
  assert.equal(game.score, 800);
});

test('pause freezes updates; reset keeps best score and spawn can end the game', () => {
  const game = new Game(audio);
  game.best = 999;
  game.start();
  game.pause();
  const y = game.current.y;
  game.update(10000);
  assert.equal(game.state, STATES.PAUSED);
  assert.equal(game.current.y, y);
  game.reset();
  assert.equal(game.score, 0);
  assert.equal(game.best, 999);
  game.board[0].fill('T');
  game.spawn();
  assert.equal(game.state, STATES.GAME_OVER);
});
