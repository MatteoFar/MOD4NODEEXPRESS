export default function checkSession(req, res, next) {
  console.log("test");

  console.log(req.session);
  next();
}
