const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator/check")
const config = require("config")

router.post(
  "/",
  [
    check("discount", "Discount is required")
      .not()
      .isEmpty(),
    check("bonus", "Bonus should not be empty")
      .not()
      .isEmpty(),
    check("deposit", "Deposit should not be empty")
      .not()
      .isEmpty(),
    check("winning", "Winning should not be empty")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      var entryFee = req.body.entryFee
      const discount = 1 - req.body.discount / 100
      var bonus = req.body.bonus
      var deposit = req.body.deposit
      var winning = req.body.winning
      entryFee = discount * entryFee
      if (bonus + deposit + winning < entryFee) {
        return res.status(400).json({ errors: [{ msg: "Not enough balance" }] })
      }
      if (0.1 * entryFee <= bonus) {
        bonus = bonus - 0.1 * entryFee
        entryFee = entryFee - 0.1 * entryFee
      } else {
        entryFee = entryFee - bonus
        bonus = 0
      }
      if (entryFee <= deposit) {
        deposit = deposit - entryFee
        entryFee = 0
      } else {
        entryFee = entryFee - deposit
        deposit = 0
      }
      if (entryFee <= winning) {
        winning = winning - entryFee
        entryFee = 0
      } else {
        entryFee = entryFee - winning
        winning = 0
      }

      finalOp = {}
      finalOp.bonus = bonus
      finalOp.deposit = deposit
      finalOp.winning = winning
      res.json(finalOp)
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

module.exports = router
