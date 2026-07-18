import { Model, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findOne({ id } as any).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    return entity.save() as unknown as Promise<T>;
  }

  async update(id: string, updateData: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate({ id } as any, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ id } as any).exec();
  }

  async deleteMany(filter: any): Promise<any> {
    return this.model.deleteMany(filter).exec();
  }

  async insertMany(entities: Partial<T>[]): Promise<T[]> {
    return this.model.insertMany(entities) as unknown as Promise<T[]>;
  }
}
