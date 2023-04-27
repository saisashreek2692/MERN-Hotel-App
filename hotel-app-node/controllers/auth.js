import User from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  //validation
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6)
    return res.status(400).send("Password should be min 6 characters long");
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return res.status(400).send("Email is Taken");
  //register
  const user = new User(req.body);
  try {
    await user.save();
    console.log("User Created", user);
    return res.json({ ok: true });
  } catch (error) {
    console.log("Create User Failed", error);
    return res.status(400).send("Error. Try Again");
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).exec();
    console.log("USER EXIST", user);
    if (!user) res.status(400).send("User with that email not found");
    // compare password
    user.comparePassword(password, (err, match) => {
      console.log("COMPARE PASSWORD IN LOGIN ERR", err);
      if (!match || err) return res.status(400).send("Wrong Password");
      // GENERATE A TOKEN AND SEND A RESPONSE TO CLIENT
      let token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("Signin Failed");
  }
};
