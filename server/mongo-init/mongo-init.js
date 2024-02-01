db.createUser({
  user: "user",
  pwd: "pass",
  roles: [
    {
      role: "dbOwner",
      db: "main-db",
    },
  ],
});
