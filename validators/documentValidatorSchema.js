import * as Joi from 'joi';

const documentCreateValidatorFields = {
    year: Joi.number().required().label('Document upload year'),
    document_name: Joi.string().required().label("Document upload year"),
    document_type_id: Joi.number().required().label("Document type"),
    document_comments: Joi.string().optional().allow('').default('').label('Comment')
};
const documentCreateValidatorSchema = Joi.object(documentCreateValidatorFields).unknown();

const documentDeleteValidatorFields = {
    document_id: Joi.number().required().label('Document ID')
};
const documentDeleteValidatorSchema = Joi.object(documentDeleteValidatorFields).unknown();

export default {
    documentCreateValidatorSchema,
    documentDeleteValidatorSchema
};