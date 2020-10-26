const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});



AddressSchema.statics.createAddress = function(address) {
    return new Address({
        city: address.city,
        district: address.district,
        ward: address.ward,
        address: address.address
    })
}

AddressSchema.pre('save', function(next) {
    this.city = this.city.toLowerCase();
    this.district = this.district.toLowerCase();
    this.ward = this.ward.toLowerCase();
    this.address = this.address.toLowerCase();
    next();
})

const Address = mongoose.model('address', AddressSchema);

module.exports = Address