import fs from 'fs';
import { parse } from 'csv-parse';
import { Multer } from 'multer';
import { CategoriesRepository } from '../../repositories/categories.repository';
import { response } from 'express';
import { Category } from '../../models/category';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {

  constructor(private readonly categoriesRepository: CategoriesRepository) {}

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
      const alreadyExists = this.categoriesRepository.findByName(name);
      if (!alreadyExists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };