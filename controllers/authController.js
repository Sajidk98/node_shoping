const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //   const isLoggedIn = req.get("Cookie").trim().split("=")[1] ==="true"; //get cookies
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isloggedIn: req.session.isloggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5ec7b656fd3cf22ac764a291")
    .then((user) => {
      req.session.user = user;
      req.session.isloggedIn = true; 
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    //destoy session
    res.redirect("/");
  });
};
