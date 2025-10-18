const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

//CREATE
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);

    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

// UPDATE TASK
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;

    // Find the task by ID and update
    const updatedTask = await List.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true } // return updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


//DELETE
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id , 
      {$pull: {list: req.params.id}});
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task deleted" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});


// GET TASKS for a user
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

    if (list.length === 0) {
      return res.status(200).json({ message: "No Tasks" });
    }

    res.status(200).json({ list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;
