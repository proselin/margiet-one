export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Default value for pageable request args
 */
export const DEFAULT_VALUE_PAGEABLE = {
  page: 1,
  limit: 10,
  sortOrder: SORT_ORDER.ASC,
} as const;
