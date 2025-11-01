import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const strictLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "5m"),
});

export const lightLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1m"),
});
