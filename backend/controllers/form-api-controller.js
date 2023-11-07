import formSchema from "../models/form-schema.js";
import mongoose from "mongoose";
const formModel = mongoose.model("form");

const addNewSubmission = async (req, res) => {
    try {
      let message = await formModel.create(req.body);
      res.status(201).send(message);
    } catch (err) {
      console.log(req.body);
      res.status(400).send(
        "Bad Request. The message in the body of the \
          Request is either missing or malformed."
      );
    }
  };

  export { addNewSubmission };