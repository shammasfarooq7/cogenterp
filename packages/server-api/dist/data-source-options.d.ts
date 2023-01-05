import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
declare let dataSourceOptions: DataSourceOptions & SeederOptions;
export { dataSourceOptions };
