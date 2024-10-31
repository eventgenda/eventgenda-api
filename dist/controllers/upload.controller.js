"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const upload_repository_1 = __importDefault(require("../repositories/upload.repository"));
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const cloudinary = require('cloudinary').v2;
dotenv_1.default.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const uploadController = {
    uploadImage: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!request.files || Object.keys(request.files).length === 0) {
                console.log('No files detected in request');
                return response.status(400).json({ msg: 'No files were uploaded.' });
            }
            // Check if 'image' exists in request.files
            if (!request.files.image) {
                console.log('No image field in request.files');
                return response.status(400).json({ msg: 'No image in the request.' });
            }
            const file = request.files.image;
            //   console.log('File details:', {
            //     name: file.name,
            //     size: file.size,
            //     mimetype: file.mimetype,
            //     tempFilePath: file.tempFilePath
            //   });
            // Now pass this file to uploadRepository
            const result = yield upload_repository_1.default.uploadImage(file);
            return (0, response_utils_1.successResponseStatus)(response, 'Upload image successfully.', result);
        }
        catch (error) {
            console.error('Error in uploadImage:', error);
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    deleteImage: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { public_id } = request.body;
            const result = yield upload_repository_1.default.deleteImage(public_id);
            return (0, response_utils_1.successResponseStatus)(response, 'Delete image successfully.', null);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
};
exports.default = uploadController;
