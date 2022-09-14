const blogModal = require("../modals/blogModal");

const createBlog = async ({ Title, Body, _id }) => {
  if (!Title || !Body || !_id)
    return { message: "Insufficiant Data provided", status: "error" };

  const preExist = await blogModal.findOne({ _id });
  if (preExist?._id == _id)
    return { message: "Blog already exist", status: "error" };

  const blogSave = new blogModal({ Title, Body, _id });
  await blogSave.save();
  return {
    message: "Blog added sucessfully",
    status: "done",
  };
};

module.exports = { createBlog };
