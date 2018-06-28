/** Schema for users */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserSchema = new Schema({
    firstName: {
        type: String,
        trim:true,
        required: [true, "Please provide first name"]
    }
});



// create the model for users and expose it to our app
module.exports = mongoose.model('tweet', UserSchema);