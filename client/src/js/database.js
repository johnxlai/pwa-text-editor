import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('PUT to the database');
    const jadeDb = await openDB('jade', 1);
    const tx = jadeDb.transaction('jade', 'readwrite');
    const store = tx.objectStore('jade');
    const request = store.put({ todo: content });
    // const request = store.put({ id: id, todo: content });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  } catch (error) {
    console.error('putDb not implemented');
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    // Create a connection to the database database and version we want to use.
    const jadeDb = await openDB('jate', 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = jadeDb.transaction('jate', 'readonly');

    // Open up the desired object store.
    const store = tx.objectStore('jate');

    // Use the .getAll() method to get all data in the database.
    const request = store.getAll();

    // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result;
  } catch (err) {
    console.error('getDb not implemented');
  }
};

initdb();
