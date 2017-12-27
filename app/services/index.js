'use strict';
const CourseDaoMongoDBImpl = require('../daos/CourseDaoMongoDBImpl');
const CommentDaoMongoDBImpl = require('../daos/CommentDaoMongoDBImpl');
const FriendDaoMongoDBImpl = require('../daos/FriendDaoMongoDBImpl');
const GameDaoMongoDBImpl = require('../daos/GameDaoMongoDBImpl');
const GameResultDaoMongoDBImpl = require('../daos/GameResultDaoMongoDBImpl');
const UserDaoMongoDBImpl = require('../daos/UserDaoMongoDBImpl');
const UserStatsDaoMongoDBImpl = require('../daos/UserStatsDaoMongoDBImpl');

const CourseServiceImpl = require('./CourseServiceImpl');
const courseServiceImpl = CourseServiceImpl(CourseDaoMongoDBImpl());
const CommentServiceImpl = require('./CommentServiceImpl');
const commentServiceImpl = CommentServiceImpl(CommentDaoMongoDBImpl());
const FriendServiceImpl = require('./FriendServiceImpl');
const friendServiceImpl = FriendServiceImpl(FriendDaoMongoDBImpl());
const GameServiceImpl = require('./GameServiceImpl');
const gameServiceImpl = GameServiceImpl(GameDaoMongoDBImpl());
const GameResultServiceImpl = require('./GameResultServiceImpl');
const gameResultServiceImpl = GameResultServiceImpl(GameResultDaoMongoDBImpl());
const UserServiceImpl = require('./UserServiceImpl');
const userServiceImpl = UserServiceImpl(UserDaoMongoDBImpl());
const UserStatsServiceImpl = require('./UserStatsServiceImpl');
const userStatsServiceImpl = UserStatsServiceImpl(UserStatsDaoMongoDBImpl());

module.exports = {
  courseService: courseServiceImpl,
  commentService: commentServiceImpl,
  gameService: gameServiceImpl,
  gameResultService: gameResultServiceImpl,
  userService: userServiceImpl,
  userStatsService: userStatsServiceImpl,
  friendService: friendServiceImpl,
};
