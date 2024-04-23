interface PaginationParams {
  [key: string]: string | string[] | undefined;
}

const pagination = async (
  params: any,
  DB_NAME: string,
  pool: any,
): Promise<{ meta: MetaData; data: any[] }> => {
  // get only data inside head of table
  const fields = await pool.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);

  let get_only_data_inside_head_of_table = Object.fromEntries(
    Object.entries(params).filter(([key]) =>
      fields.fields
        .map(({ name }: { name: string }) => name)
        .includes(key.split('_').slice(0, -1).join('_')),
    ),
  ) as PaginationParams;

  get_only_data_inside_head_of_table = Object.entries(
    get_only_data_inside_head_of_table,
  ).reduce((acc: { [key: string]: string[] }, [key, value]) => {
    acc[key] = Array.isArray(value) ? value : [value!];
    return acc;
  }, {});

  // custom setup
  const keys_of_get_only_data_inside_head_of_table = Object.keys(
    get_only_data_inside_head_of_table,
  );

  let conditions: string[] = [];
  let values: any[] = [];
  let query = '';
  let query_count = '';

  // # Its for ordenary filter
  for (
    let index_of_keys_response = 0;
    index_of_keys_response < keys_of_get_only_data_inside_head_of_table.length;
    index_of_keys_response++
  ) {
    const params_of_get_only_data_inside_head_of_table =
      keys_of_get_only_data_inside_head_of_table[index_of_keys_response];
    // the values
    switch (params_of_get_only_data_inside_head_of_table.replace(/.*_/, '')) {
      case 'exact':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(item);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} = $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} = $${values.length} ) AND `,
            );
          }
        }
        break;
      case 'except':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(item);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} != $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} != $${values.length} ) AND `,
            );
          }
        }
        break;
      case 'like':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(`%${item}%`);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} like $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} like $${values.length} ) AND `,
            );
          }
        }
        break;
      case 'ilike':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(`%${item}%`);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} ilike $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} ilike $${values.length} ) AND `,
            );
          }
        }
        break;
      case 'startswith':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(`${item}%`);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} like $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} like $${values.length} ) AND `,
            );
          }
        }
        break;
      case 'istartswith':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(`${item}%`);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} ilike $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} ilike $${values.length} ) AND `,
            );
          }
        }
        break;
      case 'endswith':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(`%${item}`);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} like $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} like $${values.length} ) AND `,
            );
          }
        }
        break;
      case 'iendswith':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(`%${item}`);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} ilike $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} ilike $${values.length} ) AND `,
            );
          }
        }
        break;
      // # its for filter date
      // # Get columns type timestamp from the stored procedure to dynamic filter greater than, greater than equals, less than & less than equals
      case 'gt':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(item);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} > $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} > $${values.length} ) AND `,
            );
          }
        }
        break;
      case 'gte':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(item);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} >= $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} >= $${values.length} ) AND `,
            );
          }
        }
        break;
      case 'lt':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(item);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} < $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} < $${values.length} ) AND `,
            );
          }
        }
        break;
      case 'lte':
        conditions.push('(');
        for (let item of get_only_data_inside_head_of_table[
          params_of_get_only_data_inside_head_of_table
        ] as string[]) {
          values.push(item);
          conditions.push(
            `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} <= $${values.length} OR `,
          );
          if (
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.indexOf(item) ?? -1) ===
            (get_only_data_inside_head_of_table[
              params_of_get_only_data_inside_head_of_table
            ]?.length ?? 0) - 1
          ) {
            conditions.pop();
            conditions.push(
              `${params_of_get_only_data_inside_head_of_table.split('_').slice(0, -1).join('_')} <= $${values.length} ) AND `,
            );
          }
        }
        break;
      default:
        break;
    }
  }

  // combine & remove last AND or OR or WHERE
  query = `SELECT * FROM ${DB_NAME} WHERE ${conditions.join('')}`
    .trim()
    .replace(/(AND|OR|WHERE)\s*$/, '');
  query_count = `SELECT COUNT(*) FROM ${DB_NAME} WHERE ${conditions.join('')}`
    .trim()
    .replace(/(AND|OR|WHERE)\s*$/, '');

  let { order_by_asc, order_by_desc } = params;
  if (order_by_asc || order_by_desc) {
    query += ' ORDER BY ';
    if (order_by_asc) {
      order_by_asc = Array.isArray(order_by_asc) ? order_by_asc : [order_by_asc];
      for (let item of order_by_asc as string[]) {
        if (
          !fields.fields
            .map(({ name }: { name: string }) => name)
            .includes(item as string)
        ) {
          throw new Error(`Invalid order_by parameter: ${item}`);
          // return response.bad(
          //   "Invalid order_by parameter",
          //   { order_by: `Invalid order_by parameter: ${item}` },
          //   res
          // );
        } else {
          query += `${item} ASC, `;
        }
      }
    }
    if (order_by_desc) {
      order_by_desc = Array.isArray(order_by_desc) ? order_by_desc : [order_by_desc];
      for (let item of order_by_desc as string[]) {
        if (
          !fields.fields
            .map(({ name }: { name: string }) => name)
            .includes(item as string)
        ) {
          throw new Error(`Invalid order_by parameter: ${item}`);
          // return response.bad(
          //   "Invalid order_by parameter",
          //   { order_by: `Invalid order_by parameter: ${item}` },
          //   res
          // );
        } else {
          query += `${item} DESC, `;
        }
      }
    }
    query = query.slice(0, -2);
  }

  const { page = 1, per_page = 10 } = params;
  if (page && per_page) {
    query += ` LIMIT ${per_page} OFFSET ${
      (Number(page) - 1) * Number(per_page)
    }`;
  }

  const data = await pool.query(query, values);
  const data_count = await pool.query(query_count, values);

  return {
    meta: {
      page: page as number,
      per_page: per_page as number,
      total: Number(data_count.rows[0].count) as number,
      total_pages: Math.ceil(data_count.rows[0].count / (per_page as number)),
    },
    data: data.rows,
  };
};

export default pagination;

interface MetaData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
