import { openDB } from 'idb';

const initdb = async () =>
  openDB('aste', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('aste')) {
        console.log('aste database already exists');
        return;
      }
      db.createObjectStore('aste', { keyPath: 'id', autoIncrement: true });
      console.log('aste database created');
    },
  });

// GET function
export const getDb = async (value) => {
  console.log('Getting data from the asteDB');
  // connect to DB and version we want to use
  const asteDb = await openDB('aste', 1);
  // make new transaction...need to specify the DB we are posting to and the data privileges. 
  const tx = asteDb.transaction('aste', 'readwrite');
  // open the object store
  const objStore = tx.objectStore('aste');
  // use the .getAll() method to grab all the content in the DB
  const req = objStore.getAll()
  // confirm the data was fetched
  const res = await req;
  console.log('data saved to the asteDb', res);
};

// PUT function
export const putDb = async (id, value) => {
  console.log('PUT request to update the asteDb');
  // connect to DB and version we want to use
  const asteDb = await openDB('aste', 1);
  // make new transaction...need to specify the DB we are posting to and the data privileges. 
  const tx = asteDb.transaction('aste', 'readwrite');
  // open the object store
  const objStore = tx.objectStore('aste');
  // use the .add() method to pass in content
  const req = objStore.put({ id: id, value: value })
  // confirm the data was added
  const res = await req;
  console.log('data saved to the asteDb', res);
};


initdb();
