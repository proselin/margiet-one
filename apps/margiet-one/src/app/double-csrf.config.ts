import { doubleCsrf } from 'csrf-csrf';

export const doubleCsrfUtilities = doubleCsrf({
  getSecret: () => "Secret", // A function that optionally takes the request and returns a secret
  getSessionIdentifier: (req) => "", // A function that should return the session identifier for a given request
  cookieName: "__Host-psifi_margiet0One.x-csrf-token", // The name of the cookie to be used, recommend using Host prefix.
  cookieOptions: {
    sameSite:"lax",  // Recommend you make this strict if posible
    path:"/",
    secure:true,
  },
  size: 64, // The size of the generated tokens in bits
  ignoredMethods: ["GET", "HEAD", "OPTIONS"], // A list of request methods that will not be protected.
  getTokenFromRequest: (req) => req.headers["x-csrf-token"], // A function that returns the token from the request
});
