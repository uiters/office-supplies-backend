import express from 'express';
import { authJwt } from '../config/passport';
import { StatisticController } from '../controller/statistic.controller';
import { isAdmin } from '../util/permission.util';

const router = express.Router();

const statisticController = new StatisticController();

router.get('/statistic-products', authJwt, isAdmin, statisticController.totalProduct);
router.get('/statistic-invoices', authJwt, isAdmin, statisticController.totalFinishInvoices);

export default router;
