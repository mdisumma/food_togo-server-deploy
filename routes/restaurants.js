import Restaurant from "../models/restaurants.js";
import mongoose from "mongoose";

const client = mongoose
	.connect(process.env.URI, { dbName: "TOGO_DB" })
	.then(() => console.log("Mongose - restaurant connection is ready"))
	.catch((error) => console.log(error));

const RestaurantRouter = (app) => {
	app.get(`/restaurantRouter`, async (request, response) => {
		const restaurantList = await Restaurant.find();
		if (!restaurantList) {
			response.status(500).json({ success: false });
		}
		response.status(200).send(restaurantList);
	});

	app.get(`/restaurant/:id`, async (request, response) => {
		const restaurant = await Restaurant.findById(request.params.id);
		if (!restaurant) {
			response
				.status(500)
				.json({ success: false, message: "restaurant not found" });
		}
		response.status(200).send(restaurant);
	});

	app.put("/restaurantRouter/:id", async (request, response) => {
		const restaurant = await Restaurant.findByIdAndUpdate(
			request.params.id,
			{
				openingHours: request.body.openingHours,
				delivery: request.body.delivery,
				logo: request.body.logo,
				name: request.body.name,
				description: request.body.description,
				address: request.body.address,
				postcode: request.body.postcode,
				latitude: request.body.latitude,
				longitude: request.body.longitude,
				city: request.body.city,
				vegetarian: request.body.vegetarian,
				type: request.body.type,
				rate: request.body.rate,
				menu: request.body.menu,
			},
			{ new: true }
		);

		if (!restaurant)
			return response.status(400).send("the restaurant cannot be updated!");

		response.send(restaurant);
	});

	app.put("/restaurantRate/:id", async (request, response) => {
		const restaurant = await Restaurant.findByIdAndUpdate(
			request.params.id,
			{
				rate: request.body,
			},
			{ new: true }
		);
		response.send(restaurant);

		// restaurant = await restaurant.save();
	});
};

export default RestaurantRouter;
