export enum QueryLogic {
  And = 'and',
  Or = 'or',
}

export enum QueryOperation {
  Equal = '==',
  NotEqual = '!=',
  GreaterThan = '>',
  GreaterOrEqual = '>=',
  LessThan = '<',
  LessOrEqual = '<=',
}

export type QueryCondition = [field: string, op: QueryOperation, value: any];

export interface Query {
  logic: QueryLogic;
  conditions: Array<QueryCondition | Query>;
}
