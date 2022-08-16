import express from "express";
import fs from "fs/promises";
const persistRouter = express.Router();

persistRouter.post("/", async (req, res) => {
  const email = req.body.email;
  const raw_data = await fs.readFile("persist.json", {
    encoding: "utf8",
    flag: "r",
  });
  let state = JSON.parse(raw_data);
  let new_state_from_req = req.body.newState;
  let new_state = { ...state };
  new_state[email] = new_state_from_req;
  let data = JSON.stringify(new_state);
  try {
    await fs.writeFile("persist.json", data, { flag: "w" });
  } catch (err) {
    console.error(err);
  }
});

export default persistRouter;
