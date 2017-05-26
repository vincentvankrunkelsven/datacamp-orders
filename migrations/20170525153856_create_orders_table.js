
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function(table) {
    table.increments();
    table.string('order');
    table.date('order_on');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
