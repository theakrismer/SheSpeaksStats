import express from 'express';
const router = express.Router();

import { addNewSubmission } from '../controllers/form-api-controller.js';
import { getProblematicPercent, getTotalMen, getTotalProblematicMen, getGroupsOverview, getPercentProblematicByVictimAge, getMostTargetedAge } from '../controllers/stats-api-controller.js'

router.route('/submissions').post(addNewSubmission);

router.route('/stats/problematic-percent/:group?').get(getProblematicPercent);

router.route('/stats/problematic-percent/age/:age?').get(getPercentProblematicByVictimAge);

router.route('/stats/total-men/:group?').get(getTotalMen);

router.route('/stats/total-problematic-men/:group?').get(getTotalProblematicMen);

router.route('/stats/groups-overview').get(getGroupsOverview);

router.route('/stats/most-targeted-age').get(getMostTargetedAge);

export default router;