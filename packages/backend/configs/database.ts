import "colors";
import { connect } from "mongoose";
import { DATABASE_URL } from "./";

export const connectDatabase = async () => {
  console.log(`Mongoose connecting`.bgCyan.black);
  const conn = await connect(`${DATABASE_URL}`);
  console.log(`Mongoose connected to: ${conn.connection.host}`.bgCyan.black);
};
