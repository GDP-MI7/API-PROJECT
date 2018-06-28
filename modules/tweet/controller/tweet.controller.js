const path = require("path")
const fs = require("fs")

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "./data");
        },
        filename: function (req, file, callback) {
            callback(null, 'input.csv');
        }
    }),
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(new Error('Only CSVs are allowed'))
        }
        cb(null, true)
    }
}).single("file");

/**
 * Save the uploaded file
 */
let uploadFile = function (req, res, next) {

    upload(req, res, function (err) {
        if (err) {
            return res.status(403).json({ message: err });
        }
        next()
    });


}
module.exports.uploadFile = uploadFile;

/**
 * Conver csv data to JSON format
 */
let convertCSVToJSON = function (req, res, next) {
    if (!fs.existsSync("data/input.csv")) {
        return res.status(403).json({ message: "Upload a valid file" });
    } else {

        xlsxj({
            input: "data/input.csv",
            output: null,
            lowerCaseHeaders: true //converts excel header rows into lowercase as json keys
        }, function (err, result) {
            if (err) {
                res.json({ msg: err });
            } else {
                req.session.fileData = result
                next();
            }
        });
    }
}
module.exports.convertCSVToJSON = convertCSVToJSON;
