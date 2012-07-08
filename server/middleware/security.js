// only let user through if they are admin
exports.authenticated = function() {
  return function (req, res, next) {
    console.log("middleware.authenticated session =>\n", req.session);
    if(req.session.userId === true) {
      return next();
    } else {
      throw new Error('unauthorized');
    } 
  };
};