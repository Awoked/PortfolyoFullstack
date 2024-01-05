// utils/rateLimiter.ts
export type RateLimitInfo = {
  count: number;
  lastRequestTime: number;
};

const requestLimits: Record<string, RateLimitInfo> = {};

export async function rateLimit(
  userKey: string,
  maxRequests: number,
  resetInterval: number
): Promise<Response | null> {
  if (!userKey) {
    return new Response(JSON.stringify({ error: "User key is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (!requestLimits[userKey]) {
    requestLimits[userKey] = {
      count: maxRequests - 1,
      lastRequestTime: Date.now(),
    };
    setTimeout(() => resetLimit(userKey, maxRequests), resetInterval);
  } else {
    const timeElapsed = Date.now() - requestLimits[userKey].lastRequestTime;

    if (timeElapsed > resetInterval) {
      await resetLimit(userKey, maxRequests);
    } else if (requestLimits[userKey].count <= 0) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    requestLimits[userKey].count--;
  }

  return null;
}

async function resetLimit(userKey: string, maxRequests: number) {
  requestLimits[userKey] = { count: maxRequests, lastRequestTime: Date.now() };
}
