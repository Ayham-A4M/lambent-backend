const userModel = require('../../models/user');
const handleUpdateStreak = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const userId = res.locals.id;
        console.log(userId);
        const userFromDb = await userModel.findById(userId);
        const user=userFromDb;

        const lastDateStreak = user?.lastDateStreak;
        user.lastDateStreak = new Date(); // mean user now is click on streak
        if (!lastDateStreak) {

            user.currentStreakSerial = 1;
            user.longestStreak = 1
            const response = await user.save();
            if (response) {
                return res.status(200).send({ msg: "you collect the streak for today" });
            }
        } else {
            lastDateStreak.setHours(0, 0, 0, 0);
            const dayDiff = parseInt((today - lastDateStreak) / (1000 * 60 * 60 * 24));
            if (dayDiff == 1) {

                if ((user.currentStreakSerial === user.longestStreak)) {
                    user.currentStreakSerial += 1;
                    user.longestStreak += 1

                } else if ((user?.currentStreakSerial < user?.longestStreak)) {
                    user.currentStreakSerial += 1;
                }
                const response = await user.save();
                if (response) {
                    return res.status(200).send({ msg: "you collect the streak for today" });
                }

            } else if (dayDiff > 1) {
                user.currentStreak = 1;
                const response = await user.save();
                if (response) {
                    return res.status(200).send({ msg: "you collect the streak for today" });
                }
            }
        }



    } catch (err) {
        next(err);
    }
}
module.exports = handleUpdateStreak