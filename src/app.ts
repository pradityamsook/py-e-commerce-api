import { ConnectDatabase } from "./server";

const connection = new ConnectDatabase().connection();
connection;