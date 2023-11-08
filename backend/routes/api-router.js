import express from 'express';

// import { getAllMessages, addNewMessage, updateMessage, deleteMessage } from '../controllers/msg-api-controller.js';
// import { registerNewUser, logInUser, /*changeUsername, changeEmail*/ } from '../controllers/user-api-controller.js';
// import { getAllCourses, addNewCourse } from '../controllers/course-api-controller.js';
import { addNewSubmission } from '../controllers/form-api-controller.js';
import { getProblematicPercent } from '../controllers/stats-api-controller.js'

// import passport from 'passport';

const router = express.Router();
router.route('/submissions').post(addNewSubmission);
router.route('/stats/problematic-percent').get(getProblematicPercent);
// router.route('/messages').get(getAllMessages).post(passport.authenticate('jwt', { session: false }), addNewMessage);
// router.route('/messages/:messageId').patch(passport.authenticate('jwt', { session: false }), updateMessage);
// router.route('/messages/delete/:messageId').delete(passport.authenticate('jwt', { session: false }), deleteMessage);
// router.route('/users').post(registerNewUser);
// router.route('/users/username/:userId').patch(passport.authenticate('jwt', { session: false }), changeUsername);
// router.route('/users/email/:userId').patch(passport.authenticate('jwt', { session: false }), changeEmail);
// router.route('/login').post(passport.authenticate('local', { session: false }), logInUser);

// FINAL EXAM COURSES API
// router.route('/courses').get(getAllCourses);
// router.route('/courses').post(addNewCourse);
//
export default router;