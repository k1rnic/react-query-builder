import { IQueryField } from '../../interfaces/query-field';

const FIELDS: IQueryField[] = [
  {
    dataField: 'gender',
    dataType: 'text',
    label: 'пол',
  },
  {
    dataField: 'age',
    dataType: 'number',
    label: 'возраст',
  },
];

export default FIELDS;
