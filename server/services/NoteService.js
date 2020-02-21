import mongoose from "mongoose";
import Note from "../models/Note";
import Bug from "../models/Bug";

const _repository = mongoose.model("Note", Note);

class NotesService {
  async getAll() {
    return await _repository.find({});
  }
  async getById(id) {
    return await _repository.findById(id)
  }
  getByBugId(bug) {
    return _repository.find({ bug })
  }
  async create(rawData) {
    return await _repository.create(rawData)
  }
  async delete(id) {
    return await _repository.findByIdAndDelete(id)
  }
}

const bugsService = new NotesService();
export default bugsService;
