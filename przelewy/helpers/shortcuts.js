
exports.module = {
  red_err_msg: function(res, msg, link) {
    if(!link) {
      res.render('error_msg', { message: msg, link: '/' });
    } else {
      res.render('error_msg', { message: msg, })
    }
  }
};
