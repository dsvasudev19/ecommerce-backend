const { User, RefreshToken } = require("./../models");

const verify = async (req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Login Token Not found.....!!" });
    }
    const { id, email } = jwt.verify(token, "abcdefgh");
    if (!id) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Login Token" });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 1000 * 60 * 30,
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = verify;
