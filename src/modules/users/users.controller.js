import * as usersService from "./users.service.js";
import { ok, created, paginated } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const list = asyncHandler(async (req, res) => {
  const result = await usersService.listUsers(req.query);
  return paginated(res, result.data, result.meta);
});

export const get = asyncHandler(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  return ok(res, user);
});

export const create = asyncHandler(async (req, res) => {
  const user = await usersService.createUser(req.body);
  return created(res, user);
});

export const update = asyncHandler(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  return ok(res, user);
});

export const remove = asyncHandler(async (req, res) => {
  const user = await usersService.deleteUser(req.params.id);
  return ok(res, user);
});

export const bulkImport = asyncHandler(async (req, res) => {
  const result = await usersService.bulkImport(req.body.users);
  return ok(res, result);
});
