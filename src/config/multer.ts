import multer from "multer";

import path from "path";
import crypto from "crypto";

const config = multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads", "avatars"),
    filename: (req, file, callback) => {
        const hash =  crypto.randomBytes(20).toString("hex");

        callback(null, hash + "-" + file.originalname);
    }
});

export default config;