import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './importCategory.useCase';


class ImportCategoryController {

  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;
    this.importCategoryUseCase.execute(file);
    return response.status(200).send();
  }
}


export { ImportCategoryController };