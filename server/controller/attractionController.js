import attractionsModel from "../models/attractionModel.js";

const getAllAttractions = async (req, res) => {
  try {
    const requestedAttractions = await attractionsModel
      .find({})
      .populate({ path: "city", select: "name" });
    res.status(200).json({
      number: requestedAttractions.length,
      requestedAttractions,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong in the server",
    });
  }
};

export { getAllAttractions };
