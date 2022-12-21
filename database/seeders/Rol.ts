import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Rol from 'App/Models/Rol'

export default class extends BaseSeeder {
  public async run () {
    await Rol.updateOrCreateMany('id',[
      {
        id: 1,
        name: 'Admin'
      },
      {
        id: 2,
        name: 'Shops'
      },
    ])
  }
}
