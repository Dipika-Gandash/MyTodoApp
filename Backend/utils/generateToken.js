import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (user, res) => {
    const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "mysecret",
    { expiresIn: "28d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 28 * 24 * 60 * 60 * 1000 // 28 days
  });

  return token;
}