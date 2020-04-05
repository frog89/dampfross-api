exports.handleError = (res, err) => {
  console.log(`handleError: status=500, error=${err}`);
  res.status(500).json({
    error: err
  });
}

exports.handleStatusError = (res, status, error, internalError = null) => {
  console.log(`handleStatusError: status=${status}, error=${error}, internal error=${internalError}`);
  res.status(status).json({
    error: error
  });
}