const jwt = require("jsonwebtoken");

const tokenGenerator = async (payload) => {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });

  return token;
};

module.exports = { tokenGenerator };
