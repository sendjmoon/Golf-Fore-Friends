'use strict';

let holeTemplate = {
  handicap: {
    mens: { type: Number },
    ladies: { type: Number },
  },
  distance: {
    red: { type: Number },
    yellow: { type: Number },
    green: { type: Number },
    white: { type: Number },
    blue: { type: Number },
    black: { type: Number },
  },
  // par: { type: Number, required: true },
  par: { type: Number },
};

module.exports = holeTemplate;
