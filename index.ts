import config from "config";
import connect from "./db/connect";
import app from "./logicofServer"

const port = config.get("port") as number;

const host = config.get("host") as string;
app.listen(port, async() => {
  console.log(`⚡️[server]: Server is running at https://${host}:${port}`);
  await connect();
});
