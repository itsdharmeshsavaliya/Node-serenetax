import * as Joi from 'joi';

const refreshTokenFields = {
    refresh_token: Joi.string().required(),
};
const refreshTokenValidatorSchema = Joi.object(refreshTokenFields).unknown();

export default refreshTokenValidatorSchema;