
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
            "username": "dontBeJelly",
            "password": "jellybelly1"
        },
        {
            "username": "jammyDodgers",
            "password": "elev3nsFave"
        },
        {
            "username": "slytherinslaps",
            "password": "wh@tWh@+"
        },
      ])
    })
};
