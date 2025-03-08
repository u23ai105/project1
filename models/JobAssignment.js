import mongoose from 'mongoose';

const JobAssignmentSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true },
  acceptedAt: { type: Date, default: Date.now },
});

export default mongoose.models.JobAssignment || mongoose.model('JobAssignment', JobAssignmentSchema);