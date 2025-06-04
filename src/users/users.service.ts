import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  /**
   * コンストラクタ
   * @param userRepository ユーザのリポジトリ
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * ユーザを作成する関数
   * @param createUserDto ユーザ作成用DTO
   * @returns 作成したユーザ（失敗したらnull）
   */
  async create(createUserDto: CreateUserDto): Promise<Readonly<User | null>> {
    const user = new User(createUserDto);
    try {
      await this.userRepository.save(user);
      console.log(`user ${user.userId}, ${user.name} added`);
    } catch (error: unknown) {
      console.warn(`user ${user.userId}, ${user.name} couldn't add`);
      console.warn(error);
      return null;
    }
    return user;
  }

  /**
   * 全てのユーザを返す関数
   * @returns 全てのユーザ（失敗したらnull）
   */
  findAll(): Promise<Readonly<User[]>> {
    const users = this.userRepository.find({
      order: {
        createdAt: "ASC",
      },
    });
    return users;
  }

  /**
   * IDに対応するユーザを返す関数
   * @param id ID
   * @returns IDに対応するユーザ（見つからなければnull）
   */
  findByIdOrNull(id: number): Promise<Readonly<User | null>> {
    const user = this.userRepository.findOne({
      where: {
        userId: id,
      },
    });
    return user;
  }

  /**
   * IDに対応するユーザを更新する関数
   * @param id ID
   * @param updateUserDto 更新内容
   * @returns 更新結果
   */
  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const result = this.userRepository.update(id, updateUserDto);
    return result;
  }

  /**
   * IDに対応するユーザを削除する関数
   * @param id ID
   * @returns 削除結果
   */
  remove(id: number): Promise<DeleteResult> {
    const result = this.userRepository.delete(id);
    return result;
  }
}
