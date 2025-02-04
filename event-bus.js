// HTML
document.body.innerHTML = `<div class="c-sender" data-cname="Sender 1">
  <h1>Sender 1</h1>
</div>
<div class="c-sender" data-cname="Sender 2">
  <h1>Sender 2</h1>
</div>

<div class="c-receiver" data-cname="Receiver 1">
  <h1>Receiver 1</h1>
</div>`;



/* Storage */
const createStorage = (dbName) => {
  const db = window.sessionStorage;
  const getDB = () => JSON.parse(db.getItem(dbName) || "{}");
  const setDB = (value) => db.setItem(dbName, JSON.stringify(value));

  const get = (field) => getDB() ?? [field];

  const set = (field, value) => {
    const data = getDB();
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

  return { get, set, remove, has };
};

/* Observable Event */
const { addEventListener, dispatchEvent, removeEventListener } = document;
const eventDb = createStorage("oservable-event");

const on = (eventName, callback) => {
  if (eventDb.has(eventName)) {
    const data = eventDb.get(eventName);
    callback(new CustomEvent(eventName, { detail: data }));
  }
  addEventListener(eventName, callback);  
  return () => eventbus.remove(eventName, callback);
};
const dispatch = (eventName, data) => {
  eventDb.set(eventName, data);
  dispatchEvent(new CustomEvent(eventName, { detail: data }));
};
const remove = (eventName, callback) => {
  removeEventListener(eventName, callback);
};

const eventbus = { on, dispatch, remove };

/* --------------------- */
const withEventObserable = (component) => {
  Object.defineProperty(component, "eventbus", { value: eventbus });
  //{ value: {on, disptach, remove}, writable: false, enumerable: false, configurable: false}
  return component;
};

const senderComp = withEventObserable({
  init: () => {
    document.querySelectorAll(".c-sender").forEach((elem, idx) => {
      const cname = elem.dataset.cname;
      console.log("sender ", cname);
      //senderComp.eventbus.on('event1::update', (e) => {console.log(`Sender ${cname}::`, e, e.detail)});
      setTimeout(() => {
        senderComp.eventbus.dispatch("event1::update", {
          a: 1,
          b: new Date().toString()
        });

        //elem.dispatchEvent(new CustomEvent('event1::update', {bubbles: true, detail: {a: 1, b: new Date().toString()} }));
      }, 3000 * (idx + 1));
    });
  }
});

const receiverComp = withEventObserable({
  onUpdate: (event) => {
    console.log("Receiver::", event.detail);
  },
  init: () => {
    document.querySelectorAll(".c-receiver").forEach((elem) => {
      const cname = elem.dataset.cname;
      console.log("receiver");
      receiverComp.eventbus.on("event1::update", receiverComp.onUpdate);
    });
  }
});

console.clear();
senderComp.init();
receiverComp.init();
//setTimeout(() => {receiverComp.init();}, 100);
