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
Object.defineProperty(exports, "__esModule", { value: true });
const removeTemp_utils_1 = require("../utils/removeTemp.utils");
const cloudinary = require('cloudinary').v2;
class UploadRepository {
    uploadImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!file || Object.keys(file).length === 0) {
                    reject(new Error('No file was uploaded.'));
                    return;
                }
                if (file.size > 1024 * 1024) {
                    reject(new Error('Size too large.'));
                    return;
                }
                if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                    reject(new Error('File format is incorrect.'));
                    return;
                }
                cloudinary.uploader.upload(file.tempFilePath, { folder: 'Rug Pull' }, (error, result) => {
                    (0, removeTemp_utils_1.removeTmp)(file.tempFilePath);
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve({
                            public_id: (result === null || result === void 0 ? void 0 : result.public_id) || '',
                            url: (result === null || result === void 0 ? void 0 : result.secure_url) || '',
                        });
                    }
                });
            });
        });
    }
    deleteImage(public_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!public_id)
                    reject({ msg: 'No images selected.' });
                cloudinary.uploader.destroy(public_id, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve({ msg: 'Deleted image' });
                    }
                });
            });
        });
    }
}
exports.default = new UploadRepository();
