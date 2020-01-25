//const case = ['name', 'format', mapper, input, expect];

const case1 = ['format', '%a, %c %s %z', {"%a": "address","%c": "city","%s": "state","%z": "zip"}, {
  address: "1234 Main St",
  city: "New York",
  state: "NY",
  zip: "00000"
}, '1234 Main St, New York NY 00000'];




const cases = [case1];

export default cases;
