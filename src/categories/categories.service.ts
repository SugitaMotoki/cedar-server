import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { TreeRepository } from "typeorm";

/**
 * カテゴリに関するサービス
 */
@Injectable()
export class CategoriesService {
  /**
   * コンストラクタ
   * @param categoryRepository カテゴリのリポジトリ（木構造）
   */
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>,
  ) {}

  /**
   * カテゴリを作成する関数
   * @param createCategoryDto カテゴリ作成用DTO
   * @returns 作成したカテゴリ（失敗したらnull）
   */
  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Readonly<Category | null>> {
    const parent = createCategoryDto.parentId
      ? await this.categoryRepository.findOneBy({
          categoryId: createCategoryDto.parentId,
        })
      : undefined;
    if (parent === null) {
      return null;
    }
    const category = new Category({
      name: createCategoryDto.name,
      parent,
    });
    try {
      await this.categoryRepository.save(category);
      console.log(`category ${category.categoryId} added`);
    } catch (error: unknown) {
      console.warn(error);
      return null;
    }
    return category;
  }

  /**
   * 全てのカテゴリを返す関数
   * @returns 全てのカテゴリ
   */
  findAll(): Promise<Readonly<Category[]>> {
    // const categories = this.categoryRepository.find();
    const categories = this.categoryRepository.findTrees();
    return categories;
  }

  /**
   * IDに対応するカテゴリを返す関数
   * @param id ID
   * @returns IDに対応するカテゴリ（見つからなければnull）
   */
  findByIdOrNull(id: number): Promise<Readonly<Category | null>> {
    const category = this.categoryRepository.findOne({
      where: {
        categoryId: id,
      },
    });
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
