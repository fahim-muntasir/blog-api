const { generateBadRequestError } = require("../../../../utils/error");
const user = require("../../../../lib/user");

const create = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = generateBadRequestError({ name, email, password });
    next(error);
  }

  try {
    const createdUser = await user.create({ name, email, password });

    const responseData = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.role,
      updatedAt: createdUser.updatedAt,
      createdAt: createdUser.createdAt,
    };

    const links = {
      self: `/users/${createdUser.id}`
    };

    const response = {
      code: 201,
      data: responseData,
      links
    }

    // send final response
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
