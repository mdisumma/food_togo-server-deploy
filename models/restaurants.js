import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
	openingHours: { type: Object, default: "" },
	delivery: { type: Boolean, default: "" },
	logo: { type: String, default: "" },
	name: { type: String, default: "" },
	description: { type: String, default: "" },
	address: { type: String, default: "" },
	postcode: { type: String, default: "" },
	latitude: { type: Number, default: "" },
	longitude: { type: Number, default: "" },
	city: { type: String, default: "" },
	vegetarian: { type: Number, default: "" },
	type: { type: String, default: "" },
	rate: { type: Array, default: "" },
	rated: { type: Number, default: null },
	menu: { type: Object, default: "" },
});

restaurantSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

restaurantSchema.set("toJSON", {
	virtuals: true,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
