import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'municipalities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('state_id').unsigned().references('states.id')
      table.string('name', 50)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
