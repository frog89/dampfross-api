exports.handleError = (msg, res, err) => {
  console.log(`handleError-${msg}: status=500, error=${err}`);
  res.status(500).json({
    error: err
  });
}

exports.handleStatusError = (msg, res, status, error, internalError = null) => {
  console.log(`handleStatusError-${msg}: status=${status}, error=${error}, internal error=${internalError}`);
  res.status(status).json({
    error: error
  });
}