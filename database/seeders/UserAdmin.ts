import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.updateOrCreate({
      id: 1
    },{
      rol_id: 1,
      email: 'admin@admin.com',
      password: 'admin'
    })
  }
}
