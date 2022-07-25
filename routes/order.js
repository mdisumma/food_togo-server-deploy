import Order from "../models/order.js";
import mongoose from "mongoose";

const client = mongoose
	.connect(process.env.URI, { dbName: "TOGO_DB" })
	.then(() => console.log("Mongose - order connection is ready"))
	.catch((error) => console.log(error));

const OrderRouter = (app) => {
	app.get(`/orderRouter`, async (request, response) => {
		const orderList = await Order.find();
		if (!orderList) {
			response.status(500).json({ success: false });
		}
		response.status(200).send(orderList);
	});

	app.get(`/orderRouter/:id`, async (request, response) => {
		const order = await Order.findById(request.params.id);
		if (!order) {
			response.status(500).json({ success: false, message: "order not found" });
		}
		response.status(200).send(order);
	});

	app.post("/orderRouter", async (request, response) => {
		let order = new Order({
			orderNumber: new Date().getTime(),
			date: request.body.date,
			time: request.body.time,
			status: request.body.status,
			rated: request.body.rated,
			firstName: request.body.firstName,
			lastName: request.body.lastName,
			address: request.body.address,
			postcode: request.body.postcode,
			city: request.body.city,
			coordinate: request.body.coordinate,
			notes: request.body.notes,
			restaurant: request.body.restaurant,
			items: request.body.items,
			totalAmount: request.body.totalAmount,
		});
		order = await order.save();
		if (!order) return response.status(500).send("order can not be created");

		response.status(200).json(order);
	});

	app.put("/orderRouter/:id", async (request, response) => {
		const order = await Order.findByIdAndUpdate(
			request.params.id,
			{
				date: request.body.date,
				time: request.body.time,
				payment: request.body.payment,
				status: request.body.status,
				rated: request.body.rated,
				firstName: request.body.firstName,
				lastName: request.body.lastName,
				address: request.body.address,
				postcode: request.body.postcode,
				city: request.body.city,
				coordinate: request.body.coordinate,
				notes: request.body.notes,
				restaurant: request.body.restaurant,
				items: request.body.items,
				totalAmount: request.body.totalAmount,
			},
			{ new: true }
		);

		if (!order)
			return response.status(400).send("the order cannot be updated!");

		response.send(order);
	});
};

export default OrderRouter;
