import { authService } from "./../api/auth/auth.service.js";

export function requireAuth(req, res, next) {
  const { loginToken } = req.cookies;
  const loggedinUser = authService.validateToken(loginToken);
  if (!loggedinUser) return res.status(401).send("Not authenticated");
  req.loggedinUser = loggedinUser;
  next();
}

