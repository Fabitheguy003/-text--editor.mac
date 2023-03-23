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

// Method to add content to the database
export const putDb = async (content) => {
  const textDb = await openDB('jate', 1);
  const tx = textDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.add({ value: content });
  await tx.done;
};

// Method to get all the content from the database
export const getDb = async () => {
  const textDb = await openDB('jate', 1);
  const tx = textDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  return result;
};

initdb();
