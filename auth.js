const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.password = hashedPassword;
      next();
      delete req.body.password;
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  const playload = { sub: req.user };
  const token = jwt.sign(playload, process.env.JWT_SECRET, { expiresIn: '3600s' })
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        delete req.user.hashedPassword;
        res.status(200).send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500)
    });
}

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }
    const [type, token] = authorizationHeader.split(" ");
    if (type !== 'Bearer') {
      throw new Error("Authorization header has not the 'Bearer' type");
    }
    req.playload = jwt.verify(token, process.env.JWT_SECRET)
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken
}