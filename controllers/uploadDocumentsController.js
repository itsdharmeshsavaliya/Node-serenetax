import _ from 'underscore';
import multer from 'multer';
import CustomErrorHandler from '../services/CustomErrorHandler';
import { userValidatorSchema, documentValidatorSchema } from '../validators';
import { Documents } from "../models";
import { documentTypeJSON } from '../staticdata';
import { commonHelper } from '../helper';
import { APP_URL } from '../config';

let dirPath = `./uploads/documents`;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        commonHelper.createDir(dirPath);
        cb(null, dirPath);
    },
    filename: async(req, file, cb) => {
        let uniqueFilename = await commonHelper.uniqueFilename(file);
        cb(null, uniqueFilename);
    },
});
let handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
    fileFilter: (req, file, cb) => {
        if (file) {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|doc|docm|pdf|docx|csv|xls)$/)) { //Accept images only
                req.fileValidationError = 'Only files with extensions (jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|doc|docm|pdf|docx|csv|xls) are allowed!';
                return cb(null, false);
            }
        }
        cb(null, true);
    }
}).single('document_file');

const uploadDocumentsController = {
    async info(req, res, next) {
        try {
            let { error } = userValidatorSchema.userIdValidatorSchema.validate(req.user);
            if (error) return next(error);

            let user_id = req.user.user_id;
            const { year } = req.query;
            if (!year) return next(CustomErrorHandler.unprocessableEntity("Please select year!"));

            const documentsInfo = await Documents.fetchDocuments(user_id, year);
            if (documentsInfo) {
                await Promise.all(documentsInfo.map(document => {
                    document.document_file = (document.document_file) ? `${APP_URL}${document.document_file}` : "";
                }));
            }
            res.json({ data: { documentsInfo, documentTypeInfo: documentTypeJSON } });
        } catch (err) {
            return next(err);
        }
    },
    async save(req, res, next) {
        try {
            handleMultipartData(req, res, async(err) => { //Multipart form data 
                if (req.fileValidationError) return next(CustomErrorHandler.serverError(req.fileValidationError));
                if (err instanceof multer.MulterError) return next(CustomErrorHandler.serverError(err.message));
                if (err) return next(CustomErrorHandler.serverError(err.message));
                if (!req.file) return next(CustomErrorHandler.serverError("Please select document file!"));

                const { error } = documentValidatorSchema.documentCreateValidatorSchema.validate(req.body);
                if (error) {
                    if (req.file) await commonHelper.deleteFile(req.file.path);
                    return next(error);
                }

                let { user_id } = req.user;
                req.body.document_file = commonHelper.convertFilePathSlashes(req.file.path);
                await Documents.saveDocument({ user_id, ...req.body });
                res.json({ message: "Data saved successful." });
            });
        } catch (err) {
            if (req.file) await commonHelper.deleteFile(req.file.path);
            return next(err);
        }
    },
    async remove(req, res, next) {
        try {
            const { error } = documentValidatorSchema.documentDeleteValidatorSchema.validate(req.params);
            if (error) return next(error);

            let { document_id } = req.params;
            const document = await Documents.fetchbyId(document_id);
            if (!_.isEmpty(document)) {
                const isDeleted = await Documents.delete(document_id);
                if (isDeleted) {
                    if (document.document_file) await commonHelper.deleteFile(document.document_file);
                }
                return res.json({ message: "Document deleted successful." });
            } else {
                return next(CustomErrorHandler.somethingWrong());
            }
        } catch (err) {
            return next(err);
        }
    }
}
export default uploadDocumentsController;