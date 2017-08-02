'use strict';
const CourseDaoMongoDBImpl = require('../daos/CourseDaoMongoDBImpl');
const GameDaoMongoDBImpl = require('../daos/GameDaoMongoDBImpl');
const UserDaoMongoDBImpl = require('../daos/UserDaoMongoDBImpl');
const FriendDaoMongoDBImpl = require('../daos/FriendDaoMongoDBImpl');

const CourseServiceImpl = require('./CourseServiceImpl');
const courseServiceImpl = CourseServiceImpl(CourseDaoMongoDBImpl());
const GameServiceImpl = require('./GameServiceImpl');
const gameServiceImpl = GameServiceImpl(GameDaoMongoDBImpl());
const UserServiceImpl = require('./UserServiceImpl');
const userServiceImpl = UserServiceImpl(UserDaoMongoDBImpl());
const FriendServiceImpl = require('./FriendServiceImpl');
const friendServiceImpl = FriendServiceImpl(FriendDaoMongoDBImpl());

module.exports = {
  courseService: courseServiceImpl,
  gameService: gameServiceImpl,
  userService: userServiceImpl,
  friendService: friendServiceImpl,
};
