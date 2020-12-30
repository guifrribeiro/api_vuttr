var allowCrossDomain = function(req, res) {
  req.header('Access-Control-Allow-Origin', '*')
  req.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  req.header('Access-Control-Allow-Headers', 'Content-Type')
}

module.exports = allowCrossDomain