import formSchema from "../models/form-schema.js";
import personSchema from "../models/person-schema.js";
import mongoose from "mongoose";
const formModel = mongoose.model("form");
const personModel = mongoose.model("person")

const addNewSubmission = async (req, res) => {
    try {
      let message = await formModel.create(req.body);
      res.status(201).send(req.body);

      let menArray = [];
      Object.entries(req.body).forEach(([group, groupValue]) => {
        Object.entries(req.body[group].men).forEach(([person, personValue])=> {
          menArray.push({
            "group": group,
            "reason": personValue.reason,
            "problematic": personValue.problematic
          })
        })
      })
      console.log(menArray);
      await personModel.insertMany(menArray);
      
    } catch (err) {
      console.log(req.body);
      res.status(400).send(
        "Bad Request. The message in the body of the \
          Request is either missing or malformed."
      );
    }
  };

  export { addNewSubmission };