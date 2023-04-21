const User = require("../model/user");

exports.createUser = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (user)
            res.status(404).json({ user: null, message: 'user exist' });
        else {
            const newUser = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            });
            const createdUser = await newUser.save()
        }
        res.status(200).json({ user: createdUser, message: 'user created' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};