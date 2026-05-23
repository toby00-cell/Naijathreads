export function notFound(_req, res) {
  res.status(404).json({ error: 'Not found' });
}

export function errorHandler(err, _req, res, _next) {
  console.error('[error]', err);
  const status = err.status || (err.name === 'ZodError' ? 400 : 500);
  res.status(status).json({ error: err.message || 'Server error', details: err.issues });
}