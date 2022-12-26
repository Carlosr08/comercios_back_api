import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Parishe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public municipalityId: number

  @column()
  public name: string
}
