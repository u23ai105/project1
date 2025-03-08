import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  serviceEmail: {
    type: String,
    required: true,
    default: '',
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Async pre('validate') hook that prefixes employeeId and serviceEmail with "budy"
EmployeeSchema.pre('validate', async function () {
  if (this.isNew) {
    console.log('Running pre-validate hook for new Employee');
    const count = await this.constructor.countDocuments();
    this.employeeId = 'budy' + (count + 1).toString().padStart(5, '0');
    if (!this.serviceEmail || !this.serviceEmail.startsWith('budy')) {
      this.serviceEmail = `${this.employeeId}@gmail.com`;
    }
    console.log('Generated employeeId:', this.employeeId);
    console.log('Generated serviceEmail:', this.serviceEmail);
  }
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);