const jwt = require("jsonwebtoken");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv')
dotenv.config();

exports.loginauth = async (req, res, next) => {
  console.log(req.body);
  const findeduser = await user.findOne({ email: req.body.email });
  if (!findeduser) {
    return res.status(401).json("email and password doesn't matched ");
  }
  const password = await bcrypt.compare(req.body.password, findeduser.password);
  if (!password) {
    return res.status(401).json("email and password doesn't matched");
  }
  req.user = findeduser;
  next();
};

exports.signupauth = async (req, res, next) => {
  const signupdata = req.body.email;
  // console.log('hello')
  // console.log(signupdata)
  const userexists = await user.findOne({ email: req.body.email });
  if (userexists) {
    return res.status(409).json("email already exists");
  }
  const bcryptedpassword = await bcrypt.hash(req.body.password, 10);
  const useradded = {
    name: req.body.name,
    email: req.body.email,
    password: bcryptedpassword,
  };
  req.user = useradded;

  next();
};

exports.songliked = async (req, res, next) => {
  const body = req.body;
  const usertoken = body.token;
  jwt.verify(
    usertoken,
    process.env.SPOTIFY_TOKEN_KEY,
    async (err, tokendata) => {
      if (!err) {
        req.data = tokendata;
        next();
      }
    }
  );
};
exports.likedsongs = (req, res, next) => {
  // console.log(req.headers)
  const usertoken = req.headers.authentication;
  jwt.verify(
    usertoken,
    process.env.SPOTIFY_TOKEN_KEY,
    async (err, tokendata) => {
      if (err) {
        return res.status(404).json("authentication Error");
      }
      if (!err) {
        req.data = tokendata;
        next();
      }
    }
  );
};
exports.likeplaylist = (req, res, next) => {
  const body = req.body;
  const token = jwt.verify(
    body.token,
    process.env.SPOTIFY_TOKEN_KEY,
    async (err, tokendata) => {
      if (err) {
        return res.status(404).json("authentication Error");
      } else {
        req.userdata = tokendata;
        next();
      }
    }
  );
};
