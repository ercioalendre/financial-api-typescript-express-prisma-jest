import { isAuthenticated } from "@desenvolvimento-intuix/middleware-api";
import { addressesRouter } from "@requirements/addresses/routers/AddressesRouter";
import { contactsRouter } from "@requirements/contacts/routers/ContactsRouter";
import { customersRouter } from "@requirements/customers/routers/CustomersRouter";
import { usersRouter } from "@requirements/users/routers/UsersRouter";
import { LoginController } from "@tests/providers/LoginController.test";
import express from "express";

const mainRouter = express.Router();

mainRouter.post("/login", (request, response) => {
  return new LoginController().handler(request, response);
});

mainRouter.use(isAuthenticated);
mainRouter.use("/users", usersRouter);
mainRouter.use("/customers", customersRouter);
mainRouter.use("/addresses", addressesRouter);
mainRouter.use("/contacts", contactsRouter);

mainRouter.use("*", (req, res) => {
  res.status(404).json("Oops! Page not found.");
});

export { mainRouter };
