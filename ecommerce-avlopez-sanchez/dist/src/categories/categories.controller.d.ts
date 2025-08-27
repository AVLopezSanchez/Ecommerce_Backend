import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    addCategory(): Promise<string>;
    findAll(): Promise<import("./entities/category.entity").Categories[]>;
}
