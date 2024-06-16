const User = require("../models/User");
const bcrypt = require("bcryptjs");
// Hàm xử lý đăng ký người dùng
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userOld = await User.findOne({ email });
    console.log(userOld);
    if (userOld) {
      return res.status(401).json({ message: "Email đã tồn tại" });
    }
    const user = new User({ name, email, phone, password });
    await user.save();
    return res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email không tồn tại" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }
    // Đăng nhập thành công, trả về thông tin user hoặc token
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};
