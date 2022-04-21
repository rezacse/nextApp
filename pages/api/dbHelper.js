import { MongoClient, ServerApiVersion } from 'mongodb';

const getClient = async () => {
  const username = 'rezacse08';
  const password = 'Admin123';
  const dbName = 'nextApp';
  const dbUrl = `mongodb+srv://${username}:${password}@nextapp.tkid3.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  // client.connect((err) => {
  //   const collection = client.db('test').collection('devices');
  //   // perform actions on the collection object
  //   client.close();
  // });

  try {
    const client = await MongoClient.connect(dbUrl);
    return client;
    // return await MongoClient.connect(dbUrl);
  } catch (error) {
    console.log(error);
    throw Error('Unable to connect DB!');
  }
};

const add = async (collection, document) => {
  const client = await getClient();
  try {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    client.close();
    return result;
  } catch (error) {
    client.close();
    console.log(error);
    throw Error('Insert failed!');
  }
};

const gets = async (collection, sort) => {
  const client = await getClient();
  try {
    const db = client.db();
    const documents = await db
      .collection(collection)
      .find()
      .sort(sort)
      .toArray();
    client.close();
    return documents;
  } catch (error) {
    client.close();
    console.log(error);
    throw Error('Insert failed!');
  }
};

export default {
  add,
  gets
};
