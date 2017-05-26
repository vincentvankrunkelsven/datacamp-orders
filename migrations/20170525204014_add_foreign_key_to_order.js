
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(table) {
    table.integer('user_id').unsigned().index().references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', function(table) {
    table.dropColumn('user_id');
  });
};
