// CRUD - Create, Read, Update, Delete

const mongodb = require('mongodb');
const { MongoClient, ObjectID } = mongodb;

// Typing localhost instead of 127.0.0.1 seems to have some jankiness
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// Generate a new ID for us
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

// Raw binary information of the ID
console.log(id.id);
console.log(id.id.length); // 12 (12-bytes)
console.log(id.toHexString().length); // 24-bytes! So MongoDB uses binary to save double the space

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log('Error connecting to the MongoDB database!');

    console.log('Connected to the MongoDB database!');

    const db = client.db(databaseName);

    // db.collection('users').insertOne(
    //   {
    //     name: 'Matthew',
    //     age: 35,
    //   },
    //   (error, result) => {
    //     if (error) return console.log('Unable to insert User');

    //     console.log(result);
    //   }
    // );

    // db.collection('users').insertMany(
    //   [
    //     {
    //       name: 'Caitlin',
    //       age: 31,
    //     },
    //     {
    //       name: 'Daniel',
    //       age: 35,
    //     },
    //   ],
    //   (error, result) => {
    //     //   Returns { acknowledge: true or false, insertedCount: 2, insertedIds: { '0': new ObjectID('lkajeklje'), '1': new ObjectId('eljkkje')}}
    //     console.log(result);
    //   }
    // );

    // db.collection('tasks').insertMany(
    //   [
    //     { description: 'Get groceries', isCompleted: true },
    //     { description: 'Get gas', isCompleted: false },
    //     { description: 'File for bankruptcy', isCompleted: false },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert tasks!');
    //     }

    //     console.log(result);
    //   }
    // );

    // db.collection('users').insertOne(
    //   {
    //     _id: id,
    //     name: 'Matthew',
    //     age: 35,
    //   },
    //   (error, result) => {
    //     if (error) return console.log('Unable to insert User');

    //     console.log(result);
    //   }
    // );

    // db.collection('users').findOne({ name: 'Matthew' }, (error, user) => {
    //   console.log(user);
    // });

    // db.collection('users').findOne(
    //   { _id: new ObjectID('62422eec0817e58ed40d4a3e') },
    //   (error, user) => {
    //     console.log(user);
    //   }
    // );

    // db.collection('users')
    //   .find({ age: 35 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    //     const updatePromise = db.collection('users').updateOne(
    //       {
    //         _id: new ObjectID('62422c08a8e8f719af9157e0'),
    //       },
    //       {
    //         // $set: {
    //         //   name: 'Matt',
    //         // },
    //         $inc: {
    //           age: 1, // -1 if we want to decrement
    //         },
    //       }
    //     );

    //     updatePromise
    //       .then((result) => {
    //         console.log(result);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });

    //     db.collection('tasks')
    //       .updateMany(
    //         {
    //           isCompleted: false,
    //         },
    //         { $set: { isCompleted: true } }
    //       )
    //       .then((result) => {
    //         console.log(result);
    //       })
    //       .catch((error) => console.log(error));

    db.collection('users')
      .deleteMany({ age: 37 })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }
);
