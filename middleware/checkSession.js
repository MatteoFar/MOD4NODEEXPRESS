export default function checkSession(req, res, next) {
  if (!req.session.auth) {
    res.redirect("/");
  } else {
    next();
  }
}
