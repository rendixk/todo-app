const jwt = require('jsonwebtoken')

function jwtverify(req, res, next) {
   let token = req.header('authorization')
   if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided" })
   }

   try {
      token = token.split(' ')[1]
      const decoded = jwt.verify(token, "rahasia")
      console.log("Decoded Token Payload:", decoded)

      req.userId = parseInt(decoded.userId, 10)

      console.log("Attached User ID (as Integer):", req.userId)
      next()
   }
   catch (error) {
      console.error("Error in JWT verification:", error.message)
      return res.status(500).json({ error: "Invalid token" })
   }
}

module.exports = jwtverify