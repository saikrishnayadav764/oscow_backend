const TodoEntry = require("../models/todoEntry");

async function createEntry(req, res) {
  try {
    const {
      todoId,
      title,
      date,
      time,
      desc,
      category,
      alert,
      completed
    } =
      req.body;
    
      console.log("Authenticated user:", req.user);

    const newEntry = new TodoEntry({
      todoId: todoId,
      title: title,
      date: date,
      time: time,
      desc: desc,
      category: category,
      alert: alert,
      completed:completed,
      userId: req.user.id
    });

    await newEntry.save();

    res.json(newEntry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function getEntries(req, res) {
  try {
    const entries = await TodoEntry.find({userId: req.user.id});
    res.json(entries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function getEntryById(req, res) {
  try {
    const entryId = req.params.todoId;
    const entry = await TodoEntry.findById(entryId);
    if (!entry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    // Checking if the entry belongs to the specific user
    if (entry.user.toString() !== req.user.todoId) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    res.json(entry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function updateEntry(req, res) {
  try {
    const entryId = req.params.todoId;
    console.log(entryId)
    const { title,
      date,
      time,
      desc,
      category,
      alert,
      completed
     } = req.body;


    const updatedEntry = await TodoEntry.findOneAndUpdate(
      {todoId: entryId},
      {
        title,
        date,
        time,
        desc,
        category,
        alert,
        completed
      },
      { new: true }
    );


    res.json(updatedEntry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function deleteEntry(req, res) {
  try {
    const entryId = req.params.todoId;

    const entry = await TodoEntry.findOne({ todoId: entryId });

    if (!entry) {
      return res.status(404).json({ message: "Todo entry not found" });
    }

    // if (entry.user.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "Not authorized to delete this entry" });
    // }

    await TodoEntry.deleteOne({ todoId: entryId });

    res.json({ message: "Todo entry deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}


module.exports = {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry
};
