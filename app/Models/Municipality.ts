import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import State from './State'

export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public stateId: number

  @column()
  public name: string

  @belongsTo(() => State)
  public states: BelongsTo<typeof State>
}
