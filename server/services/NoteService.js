import mongoose from "mongoose";
import Note from "../models/Note";
import Bug from "../models/Bug";

const _repository = mongoose.model("Note", Note);
const _bugrepository = mongoose.model("Bug", Bug);

class NotesService {
  async getAll() {
    return await _repository.find({}).populate("bug");
  }
  async getById(id) {
    return await _repository.findById(id).populate("bug")
  }
  getByBugId(bug) {
    return _repository.find({ bug }).populate("bug")
  }
  async create(rawData) {
    return await _repository.create(rawData)
  }
  async delete(id) {
    return await _repository.findByIdAndDelete(id)
  }
  async edit(id, update) {
    let note = await _repository.findById(id).populate("bug")
    if (!note["bug"].closed) {
      note.update(update)
      await note.save()
      return "success"
    }
    throw new Error("bug that note belongs too is closed")
  }
}

const bugsService = new NotesService();
export default bugsService;
