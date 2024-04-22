import formSchema from "../models/form-schema.js";
import personSchema from "../models/person-schema.js";
import mongoose from "mongoose";
const formModel = mongoose.model("form");
const personModel = mongoose.model("person")

// Allows adding a new submission of men, and their relation to self
const addNewSubmission = async (req, res) => {
    try {
      let menArray = req.body.men;
      let subInfo = req.body.submission;
      await personModel.insertMany(menArray);
      await formModel.create(subInfo)

      res.status(201).send(req.body);
    } catch (err) {
      console.log(req.body);
      console.log(err);
      res.status(400).send(
        "Bad Request. The message in the body of the \
          Request is either missing or malformed."
      );
    }
  };

  export { addNewSubmission };