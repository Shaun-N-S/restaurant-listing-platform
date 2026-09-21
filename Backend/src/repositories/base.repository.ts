export interface IGenericRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: number): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

/**
 * Holds only CRUD operations that are identical for every Sequelize-backed
 * entity. Entity-specific concerns (pagination, search/filtering, partial
 * updates with custom merge logic) stay in the concrete repository — see
 * RestaurantRepository.findAll/update.
 *
 * The Sequelize model is typed `any` here because the project's own model
 * exports (src/models/index.ts -> models/index.js) are already untyped
 * (see src/types/models.d.ts); this keeps the same effective typing rather
 * than introducing new inconsistency at the ORM boundary.
 */
export abstract class BaseRepository<T> implements IGenericRepository<T> {
  protected constructor(protected readonly model: any) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.model.destroy({
      where: { id },
    });

    return deletedCount > 0;
  }
}
