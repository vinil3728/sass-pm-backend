import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage =
    multer.diskStorage({

        destination(
            req,
            file,
            cb
        ) {

            cb(
                null,
                'storage/attachments'
            );
        },

        filename(
            req,
            file,
            cb
        ) {

            const uniqueName =
                `${Date.now()}-${crypto.randomUUID()}${path.extname(file.originalname)}`;

            cb(
                null,
                uniqueName
            );
        },
    });

export const upload =
    multer({
        storage,
        limits: {
            fileSize:
                20 * 1024 * 1024,
        },
    });