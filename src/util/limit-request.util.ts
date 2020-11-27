import limit from "express-rate-limit";
import { COMMENT_LIMIT } from "../constants/environtment";

export const createCommentLimiter = limit({
  windowMs: COMMENT_LIMIT.time,
  max: COMMENT_LIMIT.max,
  message: COMMENT_LIMIT.message
});
