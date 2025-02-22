import mongoose from "mongoose";

const dataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.AUTH}@appconsultascluster.wk75m.mongodb.net/?retryWrites=true&w=majority&appName=AppConsultasCluster`
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default dataBase;
