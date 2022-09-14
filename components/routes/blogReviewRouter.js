const { Router } = require("express");
const reviewsModal = require("../modals/reviewsModal");
const { v4: uuidv4 } = require("uuid");
const { createReview } = require("../controller/reviewController");

const reviewRoute = Router();

reviewRoute.post(`/create`, async (req, res) => {
  const userId = req.headers["userid-access"];
  const { description } = req.body;
  const _id = uuidv4();
  let { status, message } = await createReview({ userId, description, _id });

  if (status == "error") return res.status(500).send({ status, message });

  return res.status(201).send({ status, message });
});

reviewRoute.delete(`/delete/:reviewID`, async (req, res) => {
  const userId = req.headers["userid-access"];
  const { reviewID } = req.params;

  if (!reviewID || !userId) {
    return res.status(400).send({ status: "error", message: "Unautherised" });
  }
  const review = await reviewsModal.deleteOne({
    _id: reviewID,
    userId: userId,
  });

  if (review.deletedCount == "0") {
    return res
      .status(500)
      .send({ status: "error", message: "No reviews found for this id" });
  } else {
    return res
      .status(200)
      .send({ status: "done", message: "Deleted sucessfully" });
  }
});

module.exports = reviewRoute;
