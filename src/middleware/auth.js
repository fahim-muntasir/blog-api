const auth = (req, _res, next) => {
  req.user = {
    _id: "65b49c1d6b2d7c673a015509", 
    name: "fahim",
    email: "example@example.com",
    role: "user",
  };

  next();
};

module.exports = auth;
