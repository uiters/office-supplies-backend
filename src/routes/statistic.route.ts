import express from 'express';
import { isArguments } from 'lodash';
import { StatisticController } from '../controller/statistic.controller';
import { isAdmin } from '../util/permission.util';

const router = express.Router();

const statisticController = new StatisticController();

router.get('/statistic-products', isAdmin, statisticController.totalProduct);
router.get('/statistic-invoices', isAdmin, statisticController.totalFinishInvoices);

export default router;
