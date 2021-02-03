const express = require('express');

const router = express.Router();
router.use('*', require('.... middleware'));

/*
require('./users.js')(router);
require('./projects.js')(router);
require('./stakeholders.js')(router);

app.use('/api/v1/organizations', organizations);
require('./)(router);
app.use('/api/v1/activities', activities);
require('./)(router);
app.use('/api/v1/commitments', commitments);
require('./)(router);
app.use('/api/v1/comments', comments);
require('./)(router);
app.use('/api/v1/uploads', uploads);
require('./)(router);
 */

require('./person.js')(router);

module.exports = router;
