/**
 * Define db schema rules including collection names and indexes
 */

const collections = {
<<<<<<< HEAD
  FORMS: 'fos-forms',
  USERS: 'fos-users',
=======
  FORMS: 'tfw-forms',
  USERS: 'tfw-users',
>>>>>>> refactored project name and removed migration
};

const schema = [
  {
    collection: collections.USERS,
    indexes: [
      { key: 'username', options: { unique: true } },
    ],
  },
  {
    collection: collections.FORMS,
    indexes: [
      { key: 'id', options: { unique: true } },
      { key: 'lastName', options: {} },
      { key: 'createdAt', options: {} },
      { key: 'serviceResponse.processedAt', options: {} },
    ],
  },
];

module.exports = {
  collections,
  schema,
};
