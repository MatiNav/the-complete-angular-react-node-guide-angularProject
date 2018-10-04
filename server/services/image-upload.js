const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const Config = require('../config')

aws.config.update({
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    region: 'us-east-2'
})
const s3 = new aws.S3()

const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Los tipos permitidos de imagenes son JPEG y PNG'), false);
    }
}

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3: s3,
        bucket: 'ng-all-in-one-angular',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_METADATA' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload
