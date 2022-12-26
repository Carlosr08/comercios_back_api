import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'parishes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('municipality_id').unsigned().references('municipalities.id')
      table.string('name', 50)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
