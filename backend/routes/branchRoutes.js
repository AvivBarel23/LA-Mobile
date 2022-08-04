import express from "express";
import data from '../data.js'

const branchRouter = express.Router();
const {branches}=data;

branchRouter.get("/",  (req, res) => {
    console.log('heyyy')
    res.send(branches);
});

branchRouter.get("/slug/:slug",  (req, res) => {
    const branch = branches.find(b=>req.params.slug===b.slug);
    if (branch) {
        res.send(branch);
    } else {
        res.status(404).send({ message: "Branch doesn't exists" });
    }
});


export default branchRouter;
