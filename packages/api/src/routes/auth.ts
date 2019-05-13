import * as express from "express"
import * as jwt from "jsonwebtoken"
const router = express.Router()

router.get("/me", (_req, res) => {
  res.json({
    data: {},
  })
})

router.post("/login", (_req, res) => {
  const expiresAfterSecs = 60 * 60
  const token = jwt.sign(
    {
      data: "foobar",
    },
    "secret",
    { expiresIn: expiresAfterSecs },
  )
  res.cookie("access_token", token, {
    maxAge: expiresAfterSecs,
    httpOnly: true,
  })
  res.status(201).end()
})
// define the about route
router.post("/signup", (_req, res) => {
  res.send("About birds")
})

export default router
