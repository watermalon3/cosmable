const router = require("express").Router();
const User = require('../models/User');


router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedUser = await User.updateOne({ _id: id }, { $set: body });

        res.status(200).json({
            message: `User successfully updated`,
            updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const findUser = await User.findbyIdAndDelete(id);
        if (!findUser) {
            throw new Error(`This user does not exist`);
        } else {
            res.status(200).json({
                message: `User has been deleted`,
            });
        }
    } catch (error) {
        res.status(200).json({
            message: error.message,
        });
    }
});

module.export = router;

