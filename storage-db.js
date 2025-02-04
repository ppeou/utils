const defaultDbVersion = '0.0.1';
const createStorage = (dbName, version) => {
  const dbVersion = version || defaultDbVersion;
  const db = window.sessionStorage;
  const getDB = () => JSON.parse(db.getItem(dbName) || '{}');
  const setDB = (value) => db.setItem(dbName, JSON.stringify(value));

  const get = (field) => {
    const data = getDB();
    const version = data.version;
    delete data.version;

    return version !== dbVersion ? undefined : data[field];
  };

  const set = (field, value) => {
    const data = getDB();
    data.version = dbVersion;
    data[field] = value;
    setDB(data);
  };

  const remove = (field) => {
    const data = getDB();
    delete data[field];
    setDB(data);
  };
  
  const has = (field) => {
    const data = getDB();
    return Object.hasOwnProperty.call(data, field);
  };

  return {get, set, remove, has};
};

export default createStorage;
/* usage
var db = createStorage('user', '0.3.0');
db.set('james', {phone: '123', email: 'abc@email.com'});

*/
