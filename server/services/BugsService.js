import mongoose from "mongoose";
import Bug from "../models/Bug";

const _repository = mongoose.model("Bug", Bug);

class BugsService {
  async getAll() {
    return await _repository.find({});
  }
  async getById(id) {
    return await _repository.findById(id)
  }
  async create(rawData) {
    return await _repository.create(rawData)
  }
  async edit(id, update) {
    let bug = await _repository.findById(id)
    if (!bug.closed) {
      bug.title = update.title || bug.title;
      bug.description = update.description || bug.description;
      await bug.save()
      return bug;
    }
    throw new Error("can not edit closed bug")
  }

  async close(id) {
    let bug = await _repository.findById(id);
    if (!bug.closed) {

      bug.closed = true
      bug.closedDate = new Date()
      bug.save()
      return "Success"
    }
    throw new Error("can not close bug already closed")
  }
}

const bugsService = new BugsService();
export default bugsService;
