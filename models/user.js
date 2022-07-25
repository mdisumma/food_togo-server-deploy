import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	address: { type: String, default: "" },
	city: { type: String, default: "" },
	firstName: { type: String, default: "" },
	lastName: { type: String, default: "" },
	postcode: { type: String, default: "" },
	cardName: { type: String, default: "" },
	cardNumber: { type: String, default: "" },
});

userSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

userSchema.set("toJSON", {
	virtuals: true,
});

const User = mongoose.model("User", userSchema);
export default User;
