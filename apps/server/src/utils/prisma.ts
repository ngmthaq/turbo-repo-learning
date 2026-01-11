// Prisma Query Builder Utility

/**
 * Sort order enum for query builder
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Pagination options interface
 */
export interface PaginationOptions {
  page: number;
  limit: number;
}

/**
 * Sort options interface
 */
export interface SortOptions<T = string> {
  field: T;
  order: SortOrder;
}

/**
 * Where condition type - supports any Prisma-compatible where clause
 */
export type WhereCondition<T = Record<string, unknown>> = Partial<T>;

/**
 * Query result interface containing the built query options
 */
export interface QueryResult<TWhereInput, TOrderByInput> {
  where: TWhereInput;
  orderBy: TOrderByInput[];
  skip?: number;
  take?: number;
}

/**
 * PrismaQueryBuilder - A fluent query builder for Prisma
 *
 * @example
 * ```typescript
 * const query = new PrismaQueryBuilder<Prisma.UserWhereInput, Prisma.UserOrderByWithRelationInput>()
 *   .where({ email: { contains: '@gmail.com' } })
 *   .andWhere({ status: 'active' })
 *   .orWhere({ role: 'admin' })
 *   .orderBy('createdAt', SortOrder.DESC)
 *   .paginate({ page: 1, limit: 10 })
 *   .build();
 *
 * const users = await prisma.user.findMany(query);
 * ```
 */
export class PrismaQueryBuilder<
  TWhereInput extends Record<string, unknown> = Record<string, unknown>,
  TOrderByInput extends Record<string, unknown> = Record<string, unknown>,
> {
  private andConditions: WhereCondition<TWhereInput>[] = [];
  private orConditions: WhereCondition<TWhereInput>[] = [];
  private notConditions: WhereCondition<TWhereInput>[] = [];
  private sortOptions: TOrderByInput[] = [];
  private paginationOptions: PaginationOptions | null = null;
  private skipValue: number | null = null;
  private takeValue: number | null = null;

  /**
   * Add a WHERE condition (AND logic by default)
   * @param condition - The where condition to add
   * @returns this - For method chaining
   */
  where(condition: WhereCondition<TWhereInput>): this {
    this.andConditions.push(condition);
    return this;
  }

  /**
   * Alias for where() - Add an AND WHERE condition
   * @param condition - The where condition to add with AND logic
   * @returns this - For method chaining
   */
  andWhere = this.where;

  /**
   * Add an OR WHERE condition
   * @param condition - The where condition to add with OR logic
   * @returns this - For method chaining
   */
  orWhere(condition: WhereCondition<TWhereInput>): this {
    this.orConditions.push(condition);
    return this;
  }

  /**
   * Add a NOT WHERE condition
   * @param condition - The where condition to negate
   * @returns this - For method chaining
   */
  notWhere(condition: WhereCondition<TWhereInput>): this {
    this.notConditions.push(condition);
    return this;
  }

  /**
   * Add conditional where clause (only applies if the condition is truthy)
   * @param shouldApply - Boolean or function that returns boolean
   * @param condition - The where condition to add if shouldApply is true
   * @returns this - For method chaining
   */
  whereIf(
    shouldApply: boolean | (() => boolean),
    condition: WhereCondition<TWhereInput>,
  ): this {
    const apply =
      typeof shouldApply === 'function' ? shouldApply() : shouldApply;
    if (apply) {
      this.andConditions.push(condition);
    }
    return this;
  }

  /**
   * Alias for whereIf() - Add conditional AND where clause
   * @param shouldApply - Boolean or function that returns boolean
   * @param condition - The where condition to add if shouldApply is true
   * @returns this - For method chaining
   */
  andWhereIf = this.whereIf;

  /**
   * Add conditional OR where clause
   * @param shouldApply - Boolean or function that returns boolean
   * @param condition - The where condition to add if shouldApply is true
   * @returns this - For method chaining
   */
  orWhereIf(
    shouldApply: boolean | (() => boolean),
    condition: WhereCondition<TWhereInput>,
  ): this {
    const apply =
      typeof shouldApply === 'function' ? shouldApply() : shouldApply;
    if (apply) {
      this.orConditions.push(condition);
    }
    return this;
  }

  /**
   * Add an ORDER BY clause
   * @param field - The field to sort by (can be a string key or nested object)
   * @param order - The sort order (ASC or DESC)
   * @returns this - For method chaining
   */
  orderBy(field: keyof TOrderByInput | string, order: SortOrder): this {
    this.sortOptions.push({ [field]: order } as unknown as TOrderByInput);
    return this;
  }

  /**
   * Add multiple ORDER BY clauses
   * @param sorts - Array of sort options
   * @returns this - For method chaining
   */
  orderByMultiple(
    sorts: Array<{ field: keyof TOrderByInput | string; order: SortOrder }>,
  ): this {
    sorts.forEach((sort) => {
      this.sortOptions.push({
        [sort.field]: sort.order,
      } as unknown as TOrderByInput);
    });
    return this;
  }

  /**
   * Add raw order by object (for complex nested sorting)
   * @param orderByObj - The raw order by object
   * @returns this - For method chaining
   */
  orderByRaw(orderByObj: TOrderByInput): this {
    this.sortOptions.push(orderByObj);
    return this;
  }

  /**
   * Set pagination using page number and limit
   * @param options - Pagination options with page (1-based) and limit
   * @returns this - For method chaining
   */
  paginate(options: PaginationOptions): this {
    this.paginationOptions = options;
    return this;
  }

  /**
   * Set the number of records to skip
   * @param count - Number of records to skip
   * @returns this - For method chaining
   */
  skip(count: number): this {
    this.skipValue = count;
    return this;
  }

  /**
   * Set the number of records to take (limit)
   * @param count - Number of records to take
   * @returns this - For method chaining
   */
  take(count: number): this {
    this.takeValue = count;
    return this;
  }

  /**
   * Set limit (alias for take)
   * @param count - Number of records to limit
   * @returns this - For method chaining
   */
  limit(count: number): this {
    return this.take(count);
  }

  /**
   * Set offset (alias for skip)
   * @param count - Number of records to offset
   * @returns this - For method chaining
   */
  offset(count: number): this {
    return this.skip(count);
  }

  /**
   * Build the WHERE clause object
   * @returns The combined where clause
   */
  private buildWhereClause(): TWhereInput {
    const whereClause: Record<string, unknown> = {};
    const andArray: WhereCondition<TWhereInput>[] = [];

    // Add AND conditions
    if (this.andConditions.length > 0) {
      andArray.push(...this.andConditions);
    }

    // Add NOT conditions
    if (this.notConditions.length > 0) {
      this.notConditions.forEach((condition) => {
        andArray.push({
          NOT: condition,
        } as unknown as WhereCondition<TWhereInput>);
      });
    }

    // Build the final where clause
    if (andArray.length > 0 && this.orConditions.length > 0) {
      // Both AND and OR conditions exist
      whereClause.AND = andArray;
      whereClause.OR = this.orConditions;
    } else if (andArray.length > 1) {
      // Multiple AND conditions
      whereClause.AND = andArray;
    } else if (andArray.length === 1) {
      // Single AND condition - spread it directly
      Object.assign(whereClause, andArray[0]);
    }

    // Handle OR conditions when there are no AND conditions
    if (this.orConditions.length > 0 && andArray.length === 0) {
      whereClause.OR = this.orConditions;
    } else if (this.orConditions.length > 0 && andArray.length > 0) {
      // When we have both, wrap in AND to combine properly
      if (!whereClause.AND) {
        whereClause.AND = andArray;
      }
      whereClause.OR = this.orConditions;
    }

    return whereClause as TWhereInput;
  }

  /**
   * Calculate skip and take values from pagination
   */
  private calculatePagination(): { skip?: number; take?: number } {
    if (this.paginationOptions) {
      const { page, limit } = this.paginationOptions;
      return {
        skip: (page - 1) * limit,
        take: limit,
      };
    }

    const result: { skip?: number; take?: number } = {};
    if (this.skipValue !== null) {
      result.skip = this.skipValue;
    }
    if (this.takeValue !== null) {
      result.take = this.takeValue;
    }
    return result;
  }

  /**
   * Build the complete query object
   * @returns The query object ready to use with Prisma
   */
  build(): QueryResult<TWhereInput, TOrderByInput> {
    const { skip, take } = this.calculatePagination();

    const result: QueryResult<TWhereInput, TOrderByInput> = {
      where: this.buildWhereClause(),
      orderBy: this.sortOptions,
    };

    if (skip !== undefined) {
      result.skip = skip;
    }
    if (take !== undefined) {
      result.take = take;
    }

    return result;
  }

  /**
   * Build only the WHERE clause
   * @returns The where clause object
   */
  buildWhere(): TWhereInput {
    return this.buildWhereClause();
  }

  /**
   * Build only the ORDER BY clause
   * @returns The order by array
   */
  buildOrderBy(): TOrderByInput[] {
    return this.sortOptions;
  }

  /**
   * Build only pagination (skip/take)
   * @returns Object with skip and take values
   */
  buildPagination(): { skip?: number; take?: number } {
    return this.calculatePagination();
  }

  /**
   * Reset the builder to initial state
   * @returns this - For method chaining
   */
  reset(): this {
    this.andConditions = [];
    this.orConditions = [];
    this.notConditions = [];
    this.sortOptions = [];
    this.paginationOptions = null;
    this.skipValue = null;
    this.takeValue = null;
    return this;
  }

  /**
   * Clone the current builder state
   * @returns A new builder instance with the same state
   */
  clone(): PrismaQueryBuilder<TWhereInput, TOrderByInput> {
    const cloned = new PrismaQueryBuilder<TWhereInput, TOrderByInput>();
    cloned.andConditions = [...this.andConditions];
    cloned.orConditions = [...this.orConditions];
    cloned.notConditions = [...this.notConditions];
    cloned.sortOptions = [...this.sortOptions];
    cloned.paginationOptions = this.paginationOptions
      ? { ...this.paginationOptions }
      : null;
    cloned.skipValue = this.skipValue;
    cloned.takeValue = this.takeValue;
    return cloned;
  }

  /**
   * Get pagination metadata for response
   * @param totalCount - Total number of records
   * @returns Pagination metadata object
   */
  getPaginationMeta(totalCount: number): {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null {
    if (!this.paginationOptions) {
      return null;
    }

    const { page, limit } = this.paginationOptions;
    const totalPages = Math.ceil(totalCount / limit);

    return {
      page,
      limit,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }
}

/**
 * Factory function to create a new PrismaQueryBuilder instance
 * @returns A new PrismaQueryBuilder instance
 *
 * @example
 * ```typescript
 * const query = createQueryBuilder<Prisma.UserWhereInput, Prisma.UserOrderByWithRelationInput>()
 *   .where({ email: { contains: '@gmail.com' } })
 *   .orderBy('createdAt', SortOrder.DESC)
 *   .paginate({ page: 1, limit: 10 })
 *   .build();
 * ```
 */
export function createQueryBuilder<
  TWhereInput extends Record<string, unknown> = Record<string, unknown>,
  TOrderByInput extends Record<string, unknown> = Record<string, unknown>,
>(): PrismaQueryBuilder<TWhereInput, TOrderByInput> {
  return new PrismaQueryBuilder<TWhereInput, TOrderByInput>();
}
