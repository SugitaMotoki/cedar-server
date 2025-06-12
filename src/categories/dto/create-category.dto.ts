export class CreateCategoryDto {
  /**
   * カテゴリ名
   */
  name: string;

  /**
   * 親カテゴリのID
   */
  parentId?: number;
}
