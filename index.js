const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const employees = require('./routes/employees');
global.XMLHttpRequest = require('xhr2');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.use(morgan('dev'));

app.use(express.json());
app.use(fileUpload());

//routers
app.use('/api/v1/employees', employees);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running  on port ${PORT}`));
