import { QueryOperation } from '../utils/query';

export type QueryFieldType = 'text' | 'number';

export interface IQueryField {
  dataField: string;
  dataType: QueryFieldType;
  label?: string;
  operations?: QueryOperation[];
}
