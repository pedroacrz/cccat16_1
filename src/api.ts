import express from "express";
import { account_router } from "../src/routes/account-routes";

const app = express();
app.use(express.json());

app.use("/signup", account_router);

app.listen(3000, () => console.log("server running"));
