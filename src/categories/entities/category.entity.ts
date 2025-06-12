import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from "typeorm";

/**
 * カテゴリを表すエンティティ
 */
@Entity()
@Tree("closure-table")
export class Category {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  categoryId: number;

  /**
   * カテゴリ名
   */
  @Column()
  name: string;

  /**
   * 子カテゴリ
   */
  @TreeChildren()
  children: Category[];

  /**
   * 親カテゴリ
   */
  @TreeParent()
  parent: Category;

  /**
   * 作成日（ORMが自動生成）
   */
  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  /**
   * 更新日（ORMが自動生成）
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<Category>) {
    Object.assign(this, partial);
  }
}
