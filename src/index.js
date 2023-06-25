const express = require("express");
const config = require("./shared/config");
const usersRoutes = require("./routes/users");

const app = express();

app.use(express.json());
app.use(usersRoutes);

app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti`);
});
