import express from "express";
import cors from "cors";

import "dotenv/config";

import UserRouter from "./routes/user.js";
import RestaurantRouter from "./routes/restaurants.js";
import OrderRouter from "./routes/order.js";

const server = express();
const PORT = process.env.PORT || 4000;

server.use(cors());
server.options("*", cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

UserRouter(server);
RestaurantRouter(server);
OrderRouter(server);

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
