const express = require("express");
const config = require("./shared/config");
const usersRoutes = require("./routes/users");
const modelRoutes = require("./routes/models");
const categoryRoutes = require("./routes/categories");
const brandsRoutes = require("./routes/brands");
const productRoutes = require("./routes/products");

const app = express();

app.use(express.json());
app.use(usersRoutes);
app.use(modelRoutes);
app.use(categoryRoutes);
app.use(brandsRoutes);
app.use(productRoutes);

app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti`);
});
