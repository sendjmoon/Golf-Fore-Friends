'use strict';

const express = require('express');
const router = express.Router();
const gameService = require('../services').gameService;
const userService = require('../services').userService;

// router.get('/all', function(req, res, next) {
//   gameService.getGames(req.session.user.email)
//     .then((games) => {
//       res.json(games);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: 'error getting games',
//       });
//     });
// });

// router.get('/:publicId', function(req, res, next) {
//   gameService.getByPublicId(req.params.publicId)
//     .then((game) => {
//       res.json(game);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: 'error getting game',
//       });
//     });
// });

// router.post('/all', function(req, res, next) {
//   gameService.getAllByPublicId(req.body.publicIdArray)
//     .then((games) => {
//       res.json(games);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: 'error getting games',
//       });
//     });
// });

router.post('/create', function(req, res, next) {
  gameService.create(req.body.name, req.body.location, req.body.datePlayed)
    .then((game) => {
      gameService.update(game.publicId, req.body.resultsData, req.body.options)
        .then((res) => {
          console.log('game updated');
          console.log(res);
          res.status(200).json({
            message: 'great success',
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error creating game',
      });
    });
});

module.exports = router;
