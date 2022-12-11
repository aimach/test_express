// const database = require("./database");

const getLogin = (req, res) => {
  const email = "dwight@theoffice.com";
  const password = "123456";
  if (req.body.email === email && req.body.password === password) {
    res.status(200).send("Credentials are valid");
  }
  else {
    res.sendStatus(401);
  }
}

module.exports = {
  getLogin
};

//         "email": "marie.schneider@gmail.com",
//