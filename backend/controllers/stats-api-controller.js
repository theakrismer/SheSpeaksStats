import mongoose from "mongoose";
const personModel = mongoose.model("person");

const getProblematicPercent = async (req, res) => {
    try {
      let allPeople = await personModel.find().exec();
      let allProblematic = await personModel.find({"problematic":true}).exec();
      res.status(200).json({allPeople, allProblematic});
    } catch (err) {
      res.status(400).send("Bad Request");
    }
  };

  export { getProblematicPercent}