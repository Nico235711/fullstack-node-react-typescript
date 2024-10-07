import { Column, Table, Model, DataType, Default } from 'sequelize-typescript'

@Table({
  tableName: "products"
})

class Product extends Model {
  @Column(DataType.STRING)
  name: string

  @Column(DataType.FLOAT)
  price: number

  @Default(true)
  @Column(DataType.BOOLEAN)
  availability: boolean
}

export default Product