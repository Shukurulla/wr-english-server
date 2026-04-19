export function ok(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data });
}

export function created(res, data) {
  return ok(res, data, 201);
}

export function noContent(res) {
  return res.status(204).end();
}

export function paginated(res, data, meta) {
  return res.status(200).json({ success: true, data, meta });
}
