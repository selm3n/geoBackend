const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const passport = require('passport');

// const users = require("./routes/api/users");
const clients = require("./routes/api/clients");
const articles = require("./routes/api/articles");
const commandes = require("./routes/api/commandes");

const indexArticles = require("./routes/index/articles");
const indexHistoriques = require("./routes/index/historiques");
const indexClients = require("./routes/index/clients");
const indexCommandes = require("./routes/index/commandes");
const indexUsers = require("./routes/index/users");

const swaggerUi = require('swagger-ui-express');
var swaggerJsdoc = require("swagger-jsdoc");
///const swaggerDocument = require('./swagger.json');

var cors = require("cors");

const options = {
  swaggerDefinition: {
    //openapi: '3.0.3',
    swagger: '2.0',
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: "API",
      version: "1.0.0",
      description: "Test Express API with autogenerated swagger doc"
    },
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: 'http',
    //       scheme: 'bearer',
    //       bearerFormat: 'JWT',
    //     }
    //   }
    // },
    schemes: [ 
      'http',
      'https'
    ],
   
securityDefinitions:{
  Bearer:{
    type: 'apiKey',
    name: 'Authorization',
    in: 'header'
  }
  }
  },
  
  
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: [
    "./routes/index/*s.js",
    "./routes/api/*.js",
  
  ],
  
};

const specs = swaggerJsdoc(options);


require('dotenv').config();

const app = express();

app.use(cors());
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useUnifiedTopology: true , useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  mongoose.set('useFindAndModify', false);

// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Use api Routes
// users.setup(app);
articles.setup(app);
clients.setup(app);
commandes.setup(app);

// Use api Routes
indexArticles.setup(app);
indexHistoriques.setup(app);
indexClients.setup(app);
indexCommandes.setup(app);
indexUsers.setup(app);

//app.use('/api/users', users);
// app.use('/api/profile', profile);
// app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));


 
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


