import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    ensureCategoriesLoaded(): Promise<void>;
    onModuleInit(): Promise<void>;
    addCategories(): Promise<string>;
    getCategories(): Promise<Categories[]>;
}
