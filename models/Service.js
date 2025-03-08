import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [
    {
      icon: { type: String, required: true }, // Store the icon name as a string
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      actualprice: {type: Number,required: true,},
      discountedprice: {type: Number,required: true,},
    },
  ],
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;