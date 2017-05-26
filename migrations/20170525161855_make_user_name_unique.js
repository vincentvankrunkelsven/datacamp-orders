
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.unique('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropUnique('name');
  });
};
