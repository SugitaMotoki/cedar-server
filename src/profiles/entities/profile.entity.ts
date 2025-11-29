import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * プロフィールを表すエンティティ
 */
@Entity()
export class Profile {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  profileId: number;

  /**
   * 誕生日
   */
  @Column({
    type: "date",
  })
  birthday: Date;
}
