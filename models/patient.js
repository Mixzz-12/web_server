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
  code_machine: String,
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
      compartment: String,
      note: String
    }
  ],
  soap: [
    {
      subjective: String,
      objective: String,
      assessment: String,
      plan: String,
      date:String,
    }
  ],
});

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema, "medical_history");

export default Patient;
