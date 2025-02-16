const mongoose = require("mongoose");

const dataBase = async () => {
  try {
    await mongoose
      .connect(`mongodb+srv://${process.env.AUTH}@appconsultascluster.wk75m.mongodb.net/?retryWrites=true&w=majority&appName=AppConsultasCluster`)
      .then(() => console.log("Connected!"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = dataBase;
