import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	orderNumber: { type: String, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true },
	status: { type: String, required: true },
	rated: { type: Number, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	address: { type: String, required: true },
	postcode: { type: String, required: true },
	city: { type: String, required: true },
	coordinate: {
		postcode: { type: String, required: true },
		latitude: { type: Number, required: true },
		longitude: { type: Number, required: true },
	},

	notes: { type: String, default: "true" },
	restaurant: [
		{
			id: { type: String, required: true },
			name: { type: String, required: true },
			address: { type: String, required: true },
			postcode: { type: String, required: true },
			city: { type: String, required: true },
			latitude: { type: Number, required: true },
			longitude: { type: Number, required: true },
			rate: [{ type: Number, required: true }],
			deliveryTime: { type: Number, required: true },
			expectedDelivery: { type: String, required: true },
		},
	],
	items: [
		{
			id: { type: String, required: true },
			name: { type: String, required: true },
			amount: { type: Number, required: true },
			price: { type: Number, required: true },
			totalAmount: { type: Number, required: true },
		},
	],
	totalAmount: { type: Number, required: true },
});

orderSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

orderSchema.set("toJSON", {
	virtuals: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
