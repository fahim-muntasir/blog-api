const { generateBadRequestError, authenticateError } = require("../../../../utils/error");
const userServices = require("../../../../lib/user");
const { tokenGenerator } = require("../../../../lib/auth");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = generateBadRequestError({email, password});
    next(error);
  }

  try {
    // check your exiest or not
    const isExistUser = await userServices.existUser(email);

    if (!isExistUser) {
      throw authenticateError("Invalid credentials!");
    }

    if (isExistUser.password !== password) {
      throw authenticateError("Invalid credentials!");
    }

    const payload = getTransfromSingleData({
      item: isExistUser,
      selection: ["id", "name", "email", "role"],
    })
    
    // generate a token
    const token = await tokenGenerator(payload);

    // and send a response
    const response = {
      code: 200,
      data:{
        token
      },
      links: {
        self: `/users/${isExistUser._id}`,
      }
    }

    // send final response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = signin;
