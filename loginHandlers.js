const database = require("./database");

const getUserByEmailWiythPasswordAndPassToNext = (req, res, next) => {
  // const email = "dwight@theoffice.com";
  // const password = "123456";
  // if (req.body.email === email && req.body.password === password) {
  //   res.status(200).send("Credentials are valid");
  // }
  // else {
  //   res.sendStatus(401);
  // }

  const email = req.body.email;
  database
    .query(`SELECT email, hashedPassword FROM users WHERE email = '${email}';`)
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
}

module.exports = {
  getUserByEmailWiythPasswordAndPassToNext
};

//         "email": "mercredi.addams@example.com",
//        "password": "merdams32"
// hashedPasdword : $argon2id$v=19$m=65536,t=5,p=1$RMx0tCu0+t4QmOhLgcKqiQ$PAAmnHCTmBrNsi28Ozlza0H9zzL2YPMVGoOJTnI4pxM