import express from "express";
import fs from "fs/promises";
const persistRouter = express.Router();

persistRouter.post("/", async (req, res) => {
  const email = req.body.email;
  const raw_data = await fs.readFile("persistedData.json", {
    encoding: "utf8",
    flag: "r",
  });
  let state = JSON.parse(raw_data);
  let new_state_from_req = req.body.newState;
  let new_state = { ...state };
  new_state[email] = new_state_from_req;
  let data = JSON.stringify(new_state);
  await fs.writeFile("persistedData.json", data, { flag: "w" });
});

export default persistRouter;
