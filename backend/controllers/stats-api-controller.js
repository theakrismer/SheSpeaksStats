import mongoose from "mongoose";
const personModel = mongoose.model("person");
const formModel = mongoose.model("form");

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


// Returns various information about the groups.
const getGroupsOverview = async (req, res) => {
  try {
    let family = await getGroupStatistics("family");
    let extendedfamily = await getGroupStatistics("extendedfamily");
    let closefriends = await getGroupStatistics("closefriends");
    let friends = await getGroupStatistics("friends");
    let acquaintances = await getGroupStatistics("acquaintances");

    // Calculate the group with the highest percentage of problematic people
    let groupPercents = [family.percentProblematic, extendedfamily.percentProblematic, closefriends.percentProblematic, friends.percentProblematic, acquaintances.percentProblematic];
    let largestGroupIndex = 0;
    for(let i = 0; i < groupPercents.length; i++){
      if(groupPercents[i] > groupPercents[largestGroupIndex]) largestGroupIndex = i;
    }
    switch(largestGroupIndex){
      case 0:
        family["mostProblematic"] = true;
        break;
      case 1:
        extendedfamily["mostProblematic"] = true;
        break;
      case 2:
        closefriends["mostProblematic"] = true;
        break;
      case 3:
        friends["mostProblematic"] = true;
        break;
      case 4: 
        acquaintances["mostProblematic"] = true;
        break;
    }

    family["groupname"] = "family";
    extendedfamily["groupname"] = "extended family";
    closefriends["groupname"] = "close friends";
    friends["groupname"] = "friends";
    acquaintances["groupname"] = "acquaintances";

    res.status(200).json({"family": family, "extendedfamily": extendedfamily, "closefriends":closefriends, "friends":friends, "acquaintances":acquaintances});
  } catch (err) {
    res.status(400).send("Bad Request");
  }
};

const getMostTargetedAge = async (req,res) => {

  let allGroup;
  allGroup = await formModel.find({}).sort({age:-1});
  let current_age = -1;
  let group_data = {};

  let totalMen = 0;
  let totalProblematicMen = 0;
  allGroup.forEach((submission)=>{
    

    // Reset counters when entering new age group
    if (!submission.age || current_age === -1 || submission.age < current_age) {

      
      if(current_age !== -1 && current_age != undefined){
        group_data[current_age] = {
          "age": current_age,
          "totalMen": totalMen,
          "totalProblematicMen": totalProblematicMen,
          "percentProblematic": totalProblematicMen/totalMen
        };
      }

      current_age = submission.age;
      totalMen = 0;
      totalProblematicMen = 0;
    }

    totalMen += submission.men.length;
    submission.men.forEach((man)=>{
      if (man.problematic === true) totalProblematicMen++;
    })


  })

  let worstAge;
  let worstPercent;
  
  for (var cAge in group_data) {
    if(worstAge === undefined || worstPercent === undefined || group_data[cAge].worstPercent > worstPercent) {
      worstAge = group_data[cAge].age;
      worstPercent = group_data[cAge].percentProblematic
    }
  }
  res.status(200).json({"age": worstAge, "percent": worstPercent});
}

const getPercentProblematicByVictimAge = async (req,res) => {
  let results = await getMenByVictimAge(req.params.age);
  res.status(200).json(results);
}

const getMenByVictimAge = async (age) => {
  let allGroup;
  allGroup = await formModel.find({"age":age});
  let totalProblematicMen = 0;
  let totalMen = 0;
  let percentProblematic = 0;

  allGroup.forEach((submission, sub_index)=>{
    totalMen = totalMen + submission.men.length;
    submission.men.forEach(man => {
      if(man.problematic === true){
        totalProblematicMen++;
      }
    })
  })

  percentProblematic = totalProblematicMen / totalMen; 
  return {"totalMen": totalMen, "problematicMen": totalProblematicMen, "percentage": percentProblematic};
}

const getGroupStatistics = async (groupName) =>{
    
    let allGroup;
    let groupProblematic;
    let groupProblematicPercent;
    allGroup = await personModel.find({"group":groupName}).exec();
    groupProblematic = await personModel.find({"problematic":true, "group":groupName}).exec();
    if(allGroup.length == 0 || groupProblematic.length == 0)
      groupProblematicPercent = 0;
    else groupProblematicPercent = groupProblematic.length / allGroup.length;
    return {"total": allGroup.length, "totalProblematic":groupProblematic.length, "percentProblematic":groupProblematicPercent};
}

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


  export { getProblematicPercent, getTotalMen, getTotalProblematicMen, getGroupsOverview, getPercentProblematicByVictimAge, getMostTargetedAge }