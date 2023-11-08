import mongoose from "mongoose";
const personModel = mongoose.model("person");

// Returns the percent of problematic men, in decimal format.
// Optional :group parameter
const getProblematicPercent = async (req, res) => {
    try {
      let allPeople
      let allProblematic

      if(req.params.group) {
        allPeople = await personModel.find({"group":req.params.group}).exec();
        allProblematic = await personModel.find({"problematic":true, "group":req.params.group}).exec();
      }
      else{
        allPeople = await personModel.find().exec();
        allProblematic = await personModel.find({"problematic":true}).exec();
      }

      res.status(200).json(allProblematic.length / allPeople.length);
    } catch (err) {
      res.status(400).send("Bad Request");
    }
  };

  // Returns the total number of men submitted.
  // Optional :group parameter
  const getTotalMen = async (req, res) => {
    try {
      let allPeople;
      
      if(req.params.group) {allPeople = await personModel.find({"group":req.params.group}).exec();}
      else {allPeople = await personModel.find().exec();}

      res.status(200).json(allPeople.length);
    } catch (err) {
      res.status(400).send("Bad Request");
    }
  };

  // Returns the total number of men marked as problematic.
  // Optional :group parameter
  const getTotalProblematicMen = async (req, res) => {
    try {
      let allProblematic

      if (req.params.group) allProblematic = await personModel.find({"problematic":true, "group":req.params.group}).exec();
      else allProblematic = await personModel.find({"problematic":true}).exec();

      res.status(200).json(allProblematic.length);
    } catch (err) {
      res.status(400).send("Bad Request");
    }
  };


  export { getProblematicPercent, getTotalMen, getTotalProblematicMen }