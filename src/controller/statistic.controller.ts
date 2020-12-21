import { NextFunction, Response } from 'express';
import { StatisticService } from '../service/statistic.service';
import { AuthRequest } from '../types/utils';

const statisticService = new StatisticService();
export class StatisticController {
    public async totalProduct(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const total = await statisticService.totalProducts();
            if (!total) return res.status(400).json('failed');
            res.status(200).json(total);
        } catch (error) {
            res.status(400).json('failed');
        }
        return next();
    }

    public async totalFinishInvoices(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const result = await statisticService.totalInvoices();
            if (!result) return res.status(400).json('Failed');
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json('Failed');
        }
        return next();
    }
}
