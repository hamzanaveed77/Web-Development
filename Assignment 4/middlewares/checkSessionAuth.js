module.exports = function (req, res, next) {
  if (!req.session.user) {
    req.flash("danger", "Please login to access this page");
    return res.redirect("/login");
  }
  next();
};
