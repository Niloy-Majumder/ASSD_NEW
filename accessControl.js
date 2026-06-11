const access = (allowedRole) => {
  return (req, res, next) => {
    console.log("User: ");

    console.log(req.user);
    console.log(req.role);

    if (req.role === allowedRole) next();
    else res.status(401).send("Unauthorized");
  };
};

module.exports = access;
