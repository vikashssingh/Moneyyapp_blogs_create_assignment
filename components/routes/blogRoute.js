const { Router } = require("express");
const blogModal = require("../modals/blogModal");
const { v4: uuidv4 } = require("uuid");
const { createBlog } = require("../controller/blogController");

const blogRoute = Router();

blogRoute.get("/all", async (req, res) => {
  let allBlog = await blogModal.find();

  if (!allBlog) {
    return res
      .status(200)
      .send({ status: "error", message: "No data available" });
  }

  return res.status(200).send({ status: "done", blogs: allBlog });
});

blogRoute.get(`/blogById/:blogID`, async (req, res) => {
  const { blogID } = req.params;

  if (!blogID) {
    return res
      .status(400)
      .send({ status: "error", meassage: "Insufficiant input" });
  }
  const blog = await blogModal.findOne({ _id: blogID });
  if (!blog) {
    return res
      .status(500)
      .send({ status: "error", meassage: "No blog available for this id" });
  }
  return res.status(200).send({ status: "done", data: blog });
});

blogRoute.post(`/create`, async (req, res) => {
  const { Title, Body } = req.body;
  const _id = uuidv4();
  let { status, message } = await createBlog({ Title, Body, _id });

  if (status == "error") return res.status(500).send({ status, message });

  return res.status(201).send({ status, message });
});

blogRoute.patch(`/update/:blogID`, async (req, res) => {
  const { Title, Body } = req.body;
  const { blogID } = req.params;
  if (!Title || !Body || !blogID) {
    return res
      .status(400)
      .send({ status: "error", message: "Insufficiant input provided" });
  }
  const blog = await blogModal.findByIdAndUpdate(
    { _id: blogID },
    { $set: { Title, Body } }
  );
  if (!blog) {
    return res
      .status(500)
      .send({ status: "error", message: "Can not find blog for this Id" });
  }
  return res
    .status(200)
    .send({ status: "done", message: "Data updated Sucessfully" });
});

blogRoute.delete(`/delete/:blogID`, async (req, res) => {
  const { blogID } = req.params;

  if (!blogID) {
    return res
      .status(400)
      .send({ status: "error", message: "Insufficiant input provided" });
  }
  const blog = await blogModal.deleteOne({ _id: blogID });

  if (!blog.deletedCount) {
    return res
      .status(500)
      .send({ status: "error", message: "No blog found for the id" });
  }
  return res
    .status(200)
    .send({ status: "done", message: "Deleted Sucessfully" });
});

module.exports = blogRoute;
