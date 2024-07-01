require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const {sequelize} = require("./src/models");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const process = require("process");
const cwd = process.cwd();
const xlsx=require("xlsx")
const cookieParser = require('cookie-parser');
const environment = process.env.NODE_ENV || "development"; 
const app = express();
const PORT = process.env.PORT || 3000;
const {fileUpload}=require("./src/utils/multer")
const routes=require("./src/routes")
const adminRoutes=require("./src/routes/adminRoutes")
const {Category}=require("./src/models")




var corsOptions = {
  origin: [
    "http://localhost:3011",
    "http://localhost:3000",
    "http://localhost:5173",
    "*"

  ],
  credentials: true,
  allowedHeaders: "Content-Type,Authorization,Set-Cookie",
};
app.use(express.static("./uploads"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Backend is running");
});



const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "Documentation of Ecommerce API",
      contact: {
        name: "Interactweb Agency",
        email: "developer@interactweb.agency",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/", // Update with your actual server URL
        description: "Local development server",
      },
      {
        url: "https://api.example.com/api", // Update with your actual server URL
        description: "Production server",
      },
      {
        url: "http://localhost:3000/api/", // Update with your actual server URL
        description: "Local development server for api",
      },
      // Add more servers for different environments if needed
    ],
  },
  // apis: ['server.js'],
  apis: [
    "server.js",
    "src/controllers/*.js",
    "src/routes/*.js",
    "src/routes/admin/*.js",
    'src/controllers/admin/*.js',
  ]
};

const specs = swaggerJsdoc(options);

app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", routes);

app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err.message);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    error: {code: statusCode, message: "Something went wrong!", err},
  });
});



//A method of Inserting bulk amounts of data from excel sheets
// app.post('/file-upload', fileUpload.single('excelFile'), async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(worksheet, { raw: true });

//     for (const row of data) {
//       await Category.create({
//         name: row.name,
//         status: row.status
//       });
      
//     }

//     res.send('Data inserted successfully!');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error processing file.');
//   }
// });







// Sync the database and start the server
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${ PORT }`);
  });
});