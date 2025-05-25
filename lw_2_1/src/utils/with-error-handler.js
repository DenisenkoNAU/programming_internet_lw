module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Server Error',
        details: error.message,
      });
    }
  }
};
