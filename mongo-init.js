db = db.getSiblingDB("naboo");

db.createUser({
  user: "tedelin",
  pwd: "technicalpassword",
  roles: [{ role: "readWrite", db: "naboo" }],
});
