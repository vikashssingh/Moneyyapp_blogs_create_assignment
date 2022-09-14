const reviewsModal = require("../modals/reviewsModal");

const createReview = async ({ userId, description, _id }) => {
  if (!userId || !description || !_id)
    return { message: "Insufficiant Data provided", status: "error" };

  const preExist = await reviewsModal.findOne({ _id });
  if (preExist?._id == _id)
    return { message: "Review already exist", status: "error" };

  const reviewSave = new reviewsModal({ userId, description, _id });
  await reviewSave.save();
  return {
    message: "Review added sucessfully",
    status: "done",
  };
};

module.exports = { createReview };
