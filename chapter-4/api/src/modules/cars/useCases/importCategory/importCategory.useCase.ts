import fs from 'fs';
import { parse } from 'csv-parse';
import { Multer } from 'multer';
import { inject, injectable } from 'tsyringe'
import { ICategoriesRepository } from '@modules/cars/repositories/iCategories.repository';
import { response } from 'express';
import { Category } from '../../infra/typeorm/entities/category';

interface IImportCategory {
  name: string;
  description: string;
}
@injectable()
class ImportCategoryUseCase {

  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
    ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parser = parse();
      stream.pipe(parser);
      parser.on('data', async (line) => {
        const [ name, description ] = line;
        categories.push({ name, description });
      })
      .on('end', () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      })
      .on('error', (err) => {
        reject(err);
      });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const alreadyExists = await this.categoriesRepository.findByName(name);
      if (!alreadyExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };