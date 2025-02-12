import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  title: String,
  price: Number,
  discount: Number,
  bookingDate: Date,
  bookingTime: String,
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
}, { _id: false });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  cart: [orderSchema],
  previousOrders: [orderSchema],
  currentOrders: [orderSchema]
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);