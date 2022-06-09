
import { CategoriesRepository } from "../../repositories/categories.repository";
import { ListCategoriesUseCase } from "./listCategories.useCase";
import { ListCategoriesController } from "./listCategories.controller";

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController };