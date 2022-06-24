import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./uploadCarImages.useCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];
    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);
    const image_names = images.map((file) => file.filename);
    await uploadCarImagesUseCase.execute({
      car_id: id,
      image_names,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };