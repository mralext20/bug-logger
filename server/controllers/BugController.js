import express from "express";
import BugsService from "../services/BugsService";
import NoteService from "../services/NoteService"

export default class ValueController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/notes", this.getNotesByBugId)
      .post("", this.create)
      .put("/:id", this.edit)
      .put("/:bug/notes/:id", this.editNote)
      .delete("/:id", this.close)

  }

  async getAll(req, res, next) {
    try {
      let data = await BugsService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getNotesByBugId(req, res, next) {
    try {
      let data = await NoteService.getByBugId(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await BugsService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await BugsService.create(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await BugsService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async editNote(req, res, next) {
    try {
      let data = await NoteService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async close(req, res, next) {
    try {
      let data = await BugsService.close(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}