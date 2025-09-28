const userSchema = require("../models/user");
const bcrypt = require('bcrypt');
const Jwt = require("jsonwebtoken");

module.exports = {

    async createUser(userData) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            const user = new userSchema({
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            });

            await user.save();
            return { success: true, message: "Account created successfully" };

        } catch (err) {
            if (err.keyPattern.email) {
                return { success: false, message: "Email already exists" };
            }
            return { success: false, message: err.message };
        }
    },

    async userLogin(userData) {
        try {
            const user = await userSchema.findOne({ email: userData.email });
            if (!user) {
                return { success: false, message: "User not found." };
            }

            const isMatch = await bcrypt.compare(userData.password, user.password);
            if (!isMatch) {
                return { success: false, message: "Invalid Credentials" };
            }

            const token = Jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET || "secret",
                { expiresIn: "24h" }
            );

            return { success: true, token, user, message: "Login successfully" };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }
}