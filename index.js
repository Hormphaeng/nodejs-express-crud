const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exhdb = require('express-handlebars');
const user = require('./users');

const app = express();

// Init Middleware
//app.use(logger);

//Handles Middleware
app.engine('handlebars', exhdb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Home page route
app.get('/', (req, res) => {
    res.render('index', 
    {title: 'User App',
    user
   });
})


//body-paser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/user', require('./routes/api/users'));


//ການເຂົ້າເຖິງ file html ແບບ rout
// app.get('/', (req, res) => {
//     // res.send('Hello...world');

//     //send file html
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Set static folder
//ການເຂົ້າເຖິງ file html ແບບ set public folder
 app.use(express.static(path.join(__dirname, 'public')));

 const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is  running at port ${PORT}`);
});
