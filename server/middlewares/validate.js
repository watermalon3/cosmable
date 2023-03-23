const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const validate = async (req, res, next) => {
  try {
   
    if (req.method === "OPTIONS") {
      next();
      
    } else if (req.headers.authorization) {
      const authToken = req.headers.authorization.includes("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;
      console.log(authToken);
      const payLoad = authToken
        ? jwt.verify(authToken, JWT_SECRET_KEY)
        : undefined;
      if (payLoad) {
        const findUser = await Users.findOne({ _id: payLoad._id });

        if (findUser) {
          
          req.user = findUser;
          
          next();
        } else {
          throw new Error("User not found");
        }
      } else {
        throw new Error("Invalid token");
      }
    } else {
      throw new Error("forbidden");
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error ${error.message}`,
    });
  }
};

module.exports = validate;