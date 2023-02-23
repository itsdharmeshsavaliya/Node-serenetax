import _ from 'underscore';
import { userValidatorSchema, messageValidatorSchema } from '../validators';
import { Messages } from "../models";
import { messageTypeJSON } from '../staticdata';

const messagesController = {
    async info(req, res, next) {
        try {
            let { error } = userValidatorSchema.userIdValidatorSchema.validate(req.user);
            if (error) return next(error);

            let user_id = req.user.user_id;
            const messagesInfo = await Messages.fetchMessages(user_id);
            res.json({
                data: { messagesInfo, messageTypeInfo: messageTypeJSON }
            });
        } catch (err) {
            return next(err);
        }
    },
    async send(req, res, next) {
        const { error } = messageValidatorSchema.validate(req.body);
        if (error) return next(error);

        let { user_id } = req.user;
        try {
            await Messages.sendMessage({
                user_id,
                ...req.body
            });
            res.json({ message: "Message send successful." });
        } catch (err) {
            return next(err);
        }
    }
}
export default messagesController;