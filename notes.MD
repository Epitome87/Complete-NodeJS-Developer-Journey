## SQL vs. NoSQL

| Structured Query Language | Not Only SQL              |
| ------------------------- | ------------------------- |
| Database                  | Database                  |
| Data stored in Table      | Data stored in Collection |
| Row/Record                | Document                  |

### Table example:

| id  | name    | email             | password     |
| --- | ------- | ----------------- | ------------ |
| 1   | Matthew | matthew@gmail.com | fakepassword |
| 2   | Caitlin | cait@gmail.com    | fake         |

Each row in the Table is called...well, a Row! Or a Record
Each individual thing stored in a Row/Record is a Column

### Collection example:

```js
// This array is a Collection
[
  // Each object is a Document
  {
    id: '1lkja3ab', // This is a Field
    name: 'Matthew',
    email: 'matthew@gmail.com', // This is also a Field
    password: 'fakepassword',
  },
  // Another Document
  {
    id: '4ad;lkje4',
    name: 'Caitlin', // This is a Field as well!
    email: 'cait@gmail.com',
    password: 'fake',
  },
];
```

MongoDB uses GUID instead of auto-incrementing integer IDs. This helps allow it to scale well in a distrubted system. Doesn't need to consult the server to consult what the next ID should be. No chance of ID collisions across database servers. Can generate IDs for our Documents before we insert them -- we don't have to let MongoDB do it!

### ObjectID

- 12-byte value
- Consists of a 4-byte value representing the seconds since the Unix epoch (Midnight, January 1st, 1970)
- Consists of a 5-byte random value, and
- Consists of a 3-byte counter, starting with a random value
- We see it in its HEX form (24-bytes) just to be more human-readable. It is actually this 12-byte binary
- So when viewed in a visualizer or something, we see `ObjectID("624233d27219e3fcc5485c2a")` letting us know the ID is the _result_ of this method call!

## Mongoose

- ODM: Object Document Mapper
- Mongoose is an ODM
- Allows you to map your objects over to Documents inside MongoDB database

- Mongo takes the Model name you provide, lowercases it, and pluralizes it, and that's the name of the Collection
  - i.e `mongoose.model('task', ...)` creates a 'Tasks' collection in the database

## Data validation & Sanitization

- Validation: Enforce the data coforms to some rule
- Sanitization: Alter the data before saving it, i.e removing empty spaces around a name

Mongoose provides some built-in validators

- All types: `required` validator
- Numbers: `min` and `max` validators
- Strings: `enum`, `match`, `minlength`, and `maxlength` validators
- Provides us with a way to create more validators with custom validation
  Example custom validator:

```js
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    },
  },
});
```

For more complex validations, use a package such as `validator` on npm!

- Install with `npm validator`
- Validators for isEmail, isCreditcard, isNumber, etc

## Structuring a REST API

Representational State Transfar - Application Programing Interface (REST API or RESTful API)

- Allows clients such as a web application to access and manipulate resources using a set of predefined operations
- Resource? Something like a User or a Task
- Operation? Create a new Task, mark one as IsComplete. Or upload profile picture for user account, etc
- Server is stateless. The state has been transferred from the server to the client so each request from the client such as a request from a web app contains everything needed for the server to complete that request
- Request made via HTTP requests
- Response (200 status code, data we asked for as a JSON response)

### Our Task Resource

- Create: POST / tasks
- Read: GET / tasks and GET / task/:id
- Update: PATCH / tasks/:id
- Delete: DELETE /tasks/:id

### What Makes Up An HTTP Request

- Structure is text-based
- 3 main pieces:
  - Request line: HTTP method, path, HTTP protocol
  - Example: `POST /tasks HTTP/1.1`
- Request Headers:
  - Key/value pairs
  - Allow you to attach meta-data to the request
  - Example: `Accept: application/json Connection: Keep-Alive Authorization: Bearer ejalekjfelkj`
- Empty line, and then
- Request body:
  - JSON
  - Example: `{ "description": "Buy milk" }`

### What Makes Up An HTTP Response

- Similar looking to a Request
- Status line
  - Protocol, Status Code, text representation of status code: `HTTP/1.1 201 Created`
- Response Headers: Such as date, server, and content type
  - Date: Time
  - Server: Express, in our case
  - Content Type: Meta-data about what's below
- Response Body:
  - In our case: `{ "_id: "44443", "description": "Buy Milk" }`

// Quick Multer practice
const multer = require('multer');
// Pass in options. In our case, we do a 'dest' field, for the destination of our files
const upload = multer({
dest: 'images',
limits: { fileSize: 1000000 },
fileFilter(req, file, cb) {
// if (!file.originalname.endsWith('.pdf')) {
// return cb(new Error('Please upload a PDF'));
// }
if (!file.originalname.match(/\.(doc|docx)$/)) {
return cb(new Error('Please upload a Word document'));
}

    cb(undefined, true);
    // cb(new Error('File must be a PDF')); // Error
    // cb(undefined, true); // Sucess
    // cb(undefined, false) // Silently reject

},
});

// upload.single requires a string to name our upload
app.post('/upload', upload.single('upload'), (req, res) => {
res.send();
});

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
