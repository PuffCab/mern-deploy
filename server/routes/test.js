import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({
    message: "my first Route",
  });
});

export default router;
