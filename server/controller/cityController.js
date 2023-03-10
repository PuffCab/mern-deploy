import cityModel from "../models/cityModel.js";

const getAllCities = async (req, res) => {
  try {
    const allCities = await cityModel
      .find({})
      .populate({ path: "attractions", select: ["name", "price"] });
    console.log("allCities", allCities);
    res.status(201).json({
      number: allCities.length,
      allCities,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "something went wrong in the server",
    });
  }
};

const getCitiesByCountrycode = async (req, res) => {
  console.log("req >>>>", req);
  const { countryCode } = req.params;
  const { likes } = req.query;
  if (req.query.likes) {
    try {
      const requestedCities = await cityModel.find({
        countryCode: countryCode,
        likes: { $gte: req.query.likes },
      });
      res.status(200).json({
        number: requestedCities.length,
        requestedCities,
      });
    } catch (error) {
      res.status(500).json({ msg: "error...." });
    }
  } else {
    try {
      const requestedCities = await cityModel
        .find({ countryCode: req.params.countryCode })
        .exec();

      if (requestedCities.length === 0) {
        res.status(200).json({
          msg: "No cities with that Country code in our DB",
        });
      } else {
        res.status(200).json({
          number: requestedCities.length,
          requestedCities,
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "something went wrong in the server",
      });
    }
  }
};
export { getAllCities, getCitiesByCountrycode };
