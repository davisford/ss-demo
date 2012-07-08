// req.session.userId should be set here if user
// hit the rpc demo.sendMessage, but it is not

exports.authenticated = function() {
  return function(req, res, next) {
    console.log("middleware.authenticated session =>\n", req.session);
    if (req.session && req.session.userId) {
      return next();
    } else {
      throw new Error('unauthorized');
    }
  };
};