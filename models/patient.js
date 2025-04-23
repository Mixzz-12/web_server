import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  critizen_id: String,
  name: String,
  age: String,
  height: String,
  weight: String,
  gender: String,
  nation: String,
  religion: String,
  history: [
    {
      date: String,
      medical: {
        type: Map,
        of: Number
      }
    }
  ],
  medications: [
    {
      name: String,
      quantity: String,
      timing: {
        meal: String,
        times: [String]
      },
      note: String
    }
  ]
});

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema, "medical_history");

export default Patient;
