const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const MedicinalRouter = require("./src/routes/MedicinalRouter");
const DiseaseGroupRouter = require("./src/routes/DiseaseGroupRouter");
const UserRouter = require("./src/routes/UserRouter");
const CommentRouter = require("./src/routes/CommentsRoutes");
const { createComment2 } = require("./src/controllers/CommentController");
const User = require("./src/models/User");
const newFeed = require("./src/models/newFeed");
const medicinals = require("./src/models/Medicinal");

// Sử dụng middleware để parse JSON request body
app.use(express.json());
//public
app.use(bodyParser.urlencoded({ extended: true }));
// Gọi router
app.use(cors());
app.use("/api/medicinal", MedicinalRouter);
app.use("/api/disease", DiseaseGroupRouter);
app.use("/api/user", UserRouter);
app.use("/api", CommentRouter);
app.post("/create-comment", createComment2);
app.get("/api/get-all-user", async (req, res) => {
  try {
    const data = await User.find({});
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByIdAndDelete(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/api/edit-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataEdit = req.body;
    const data = await User.findByIdAndUpdate(id, dataEdit);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/api/edit-tree/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataEdit = req.body;
    const newFeedCreate = await medicinals.findByIdAndUpdate(id, dataEdit);
    return res.status(200).json(newFeedCreate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.get("/api/getuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataUser = await User.findById(id);
    return res.status(200).json(dataUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/api/create-newFeed/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const newFeedCreate = await newFeed.create({
      name: data.name,
      description: data.description,
      image: data.image,
      status: data.status,
      user: id,
    });
    return res.status(201).json(newFeedCreate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/api/updated-newFeed/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(data);
    const newFeedCreate = await newFeed.findByIdAndUpdate(
      id,
      {
        $set: {
          status: data.status,
        },
      },
      {
        new: true,
      }
    );
    return res.status(201).json(newFeedCreate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/api/updated-medicinals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(data);
    const newFeedCreate = await medicinals.findByIdAndUpdate(
      id,
      {
        $set: {
          status: data.status,
        },
      },
      {
        new: true,
      }
    );
    return res.status(201).json(newFeedCreate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/api/remove-newFeed/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const newFeedCreate = await newFeed.findByIdAndDelete(id);
    return res.status(201).json(newFeedCreate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.get("/api/get-all-feeds", async (req, res) => {
  try {
    const data = await newFeed.find({}).populate("user");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.get("/api/get-id-feeds/:id", async (req, res) => {
  try {
    const data = await newFeed.findById(req.params.id).populate("user");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// Cổng mặc định là 3000
const PORT = process.env.PORT || 8080;
const MongoDBUri =
  "mongodb+srv://trmkhang2001:J4oFmoMjmYhbooyy@cluster0.kgnsgs0.mongodb.net/dbthuoc";
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  // Kết nối MongoDB
  await mongoose
    .connect(MongoDBUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
});
