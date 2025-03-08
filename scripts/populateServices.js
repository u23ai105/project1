// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Service from '../models/Service.js';
// import { services } from '../lib/service.js';

// dotenv.config();

// // MongoDB connection
// const MONGO_URI = "mongodb+srv://admin:muzammil@backenddb.jylrc.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB";
// if (!MONGO_URI) {
//   console.error("❌ MONGO_URI is not defined in environment variables.");
//   process.exit(1);
// }

// const populateServices = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("✅ Connected to MongoDB");

//     // Clear existing services (optional)
//     await Service.deleteMany({});
//     console.log("🗑️ Cleared existing services");

//     // Insert new services
//     await Service.insertMany(services);
//     console.log("✅ Services populated successfully!");
//   } catch (error) {
//     console.error("❌ Error populating services:", error);
//   } finally {
//     // Disconnect from MongoDB
//     await mongoose.disconnect();
//     console.log("🔌 Disconnected from MongoDB");
//   }
// };

// // Run the script
// populateServices();
// // 