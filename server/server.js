const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { randomBytes } = require('crypto');
const { passport } = require('./auth.js');
const requireHttps = require('./require-https.js');
const { validate, FormSchema, DeterminationSchema } = require('./validation.js');
const { dbClient, collections } = require('./db');
const { errorHandler, asyncMiddleware } = require('./error-handler.js');

const apiBaseUrl = '/api/v1';
const app = express();

app.use(requireHttps);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Login using username and password, receive JWT
app.post(`${apiBaseUrl}/login`,
  passport.authenticate('login', { session: false }),
  (req, res) => res.json({ token: req.user.token }));

// Create new form, not secured
app.post(`${apiBaseUrl}/form`,
  asyncMiddleware(async (req, res) => {
    await validate(FormSchema, req.body); // Validate submitted form against schema
    const formsCollection = dbClient.db.collection(collections.FORMS);

    // Generate unique random hex id
    async function generateRandomHexId() {
      const randomHexId = randomBytes(4).toString('hex').toUpperCase();

      // Query database do make sure id does not exist, avoiding collision
      if (await formsCollection.countDocuments({ id: randomHexId }, { limit: 1 }) > 0) {
        return generateRandomHexId();
      }
      return randomHexId;
    }

    // Form ID
    const id = await generateRandomHexId();
    const decision = 'Pending Review';

    const currentISODate = new Date().toISOString();
    const formItem = {
      id,
      decision,
      notes: null,
      ...req.body,
      createdAt: currentISODate,
      updatedAt: currentISODate,
    };

    await formsCollection.insertOne(formItem);

    return res.json({ id, decision });
  }));

// Edit existing form
app.patch(`${apiBaseUrl}/form/:id`,
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    await validate(DeterminationSchema, req.body);
    const { id } = req.params;
    const formsCollection = dbClient.db.collection(collections.FORMS);

    await formsCollection.updateOne(
      { id }, // Query
      { // UpdateQuery
        $set: {
          notes: req.body.notes,
          determination: req.body.determination,
          updatedAt: new Date().toISOString(),
        },
      },
    );
    return res.json({ id });
  }));

// Get existing form by ID
app.get(`${apiBaseUrl}/form/:id`,
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const formsCollection = dbClient.db.collection(collections.FORMS);
    const formItem = await formsCollection.findOne({ id });

    if (!formItem) return res.status(404).json({ error: `No submission with ID ${id}` });

    return res.json(formItem);
  }));

// get travellers by last name (partial match)
app.get(`${apiBaseUrl}/last-name/:lname`,
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const { lname } = req.params;
    const formsCollection = dbClient.db.collection(collections.FORMS);

    const forms = await formsCollection.find({
      // i: for substring search, case insensitive
      // ^: match results that starts with
      lastName: { $regex: new RegExp(`^${lname}`, 'i') },
    }).toArray();

    if (forms.length === 0) return res.status(404).json({ error: `No traveller found with last name ${lname}` });

    const travellers = forms.map((form) => {
      // Remove serviceTransactions from return query
      const { serviceTransactions, ...formData } = form;
      return formData;
    });

    return res.json({ travellers });
  }));

// Validate JWT
app.get(`${apiBaseUrl}/validate`,
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.json({}));

// Client app
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));
}

app.use(errorHandler);

module.exports = app;
