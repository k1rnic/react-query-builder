import { Query, QueryLogic, QueryOperation } from '../../utils/query';

const QUERY: Query = {
  logic: QueryLogic.Or,
  conditions: [
    {
      logic: QueryLogic.And,
      conditions: [
        ['gender', QueryOperation.Equal, 'm'],
        {
          logic: QueryLogic.Or,
          conditions: [
            ['age', QueryOperation.GreaterThan, '21'],
            ['age', QueryOperation.LessThan, '27'],
          ],
        },
      ],
    },
    {
      logic: QueryLogic.And,
      conditions: [
        ['gender', QueryOperation.Equal, 'f'],
        {
          logic: QueryLogic.Or,
          conditions: [
            ['age', QueryOperation.GreaterThan, '15'],
            ['age', QueryOperation.LessThan, '18'],
          ],
        },
      ],
    },
  ],
};

export default QUERY;
