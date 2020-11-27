import limit from "express-rate-limit";
import { LIMIT } from "../constants/environtment";

export const createCommentLimiter = limit({
  windowMs: LIMIT.time,
  max: LIMIT.max,
  message: LIMIT.message
});
