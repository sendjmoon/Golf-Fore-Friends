'use strict';
const CourseDaoMongoDBImpl = require('../daos/CourseDaoMongoDBImpl');
const GameDaoMongoDBImpl = require('../daos/GameDaoMongoDBImpl');
const GameResultDaoMongoDBImpl = require('../daos/GameResultDaoMongoDBImpl');
const UserDaoMongoDBImpl = require('../daos/UserDaoMongoDBImpl');
const UserStatsDaoMongoDBImpl = require('../daos/UserStatsDaoMongoDBImpl');
const FriendDaoMongoDBImpl = require('../daos/FriendDaoMongoDBImpl');

const CourseServiceImpl = require('./CourseServiceImpl');
const courseServiceImpl = CourseServiceImpl(CourseDaoMongoDBImpl());
const GameServiceImpl = require('./GameServiceImpl');
const gameServiceImpl = GameServiceImpl(GameDaoMongoDBImpl());
const GameResultServiceImpl = require('./GameResultServiceImpl');
const gameResultServiceImpl = GameResultServiceImpl(GameResultDaoMongoDBImpl());
const UserServiceImpl = require('./UserServiceImpl');
const userServiceImpl = UserServiceImpl(UserDaoMongoDBImpl());
const UserStatsServiceImpl = require('./UserStatsServiceImpl');
const userStatsServiceImpl = UserStatsServiceImpl(UserStatsDaoMongoDBImpl());
const FriendServiceImpl = require('./FriendServiceImpl');
const friendServiceImpl = FriendServiceImpl(FriendDaoMongoDBImpl());

module.exports = {
  courseService: courseServiceImpl,
  gameService: gameServiceImpl,
  gameResultService: gameResultServiceImpl,
  userService: userServiceImpl,
  userStatsService: userStatsServiceImpl,
  friendService: friendServiceImpl,
};
