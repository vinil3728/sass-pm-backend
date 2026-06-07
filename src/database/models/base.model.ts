import {
  Model,
  PrimaryKey,
  Column,
  DataType,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

export abstract class BaseModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  declare updatedAt: Date;

  @DeletedAt
  @Column({
    field: 'deleted_at',
    type: DataType.DATE,
  })
  declare deletedAt: Date | null;
}