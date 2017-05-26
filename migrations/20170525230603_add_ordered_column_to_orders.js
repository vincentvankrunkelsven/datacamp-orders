
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(table) {
    table.boolean('ordered');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', function(table) {
    table.dropColumn('ordered');
  });
};
