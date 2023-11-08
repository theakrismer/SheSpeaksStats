import express from 'express';
const router = express.Router();

import { addNewSubmission } from '../controllers/form-api-controller.js';
import { getProblematicPercent, getTotalMen, getTotalProblematicMen } from '../controllers/stats-api-controller.js'

router.route('/submissions').post(addNewSubmission);

router.route('/stats/problematic-percent/:group?').get(getProblematicPercent);

router.route('/stats/total-men/:group?').get(getTotalMen);

router.route('/stats/total-problematic-men/:group?').get(getTotalProblematicMen);

export default router;