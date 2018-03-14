const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

try {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())

    app.use('/api', router);

    // TODO: put this into a config file
    const port = 4200;
    app.listen(port);
    console.log(`Listening on port ${port}`);
} catch (err) {
    console.error(`!!!! UNABLE TO START APP !!!!: ${err}`);
}
