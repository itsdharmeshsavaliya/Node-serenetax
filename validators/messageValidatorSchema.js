import * as Joi from 'joi';

const messageValidatorFields = {
    subject: Joi.string().required().label('Subject'),
    message_type_id: Joi.number().required().label("Message type"),
    message: Joi.string().required().label("Message")
};
const messageValidatorSchema = Joi.object(messageValidatorFields).unknown();

export default messageValidatorSchema;