const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Validates a 10-digit mobile number
      },
      message: (props) => `${props.value} is not a valid 10-digit mobile number!`,
    },
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
