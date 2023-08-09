import { ReactNode } from 'react';
import classes from './table.module.scss';
import clsx from 'clsx';
import { Spinner } from '../../atoms/Spinner';

export type TableProps = {
  header: { key: string; node: ReactNode }[];
  data: { key: string; cols: ReactNode[] }[];
  isLoading?: boolean;
  className?: string;
  emptyComponent?: ReactNode;
};

export const Table = (props: TableProps) => {
  return (
    <div className={clsx(classes.TableWrapper, props.className)}>
      <table className={clsx(classes.Table)}>
        <thead>
          <tr className={clsx(classes.HeaderRow)}>
            {props.header.map((h) => (
              <th key={h.key} className={clsx(classes.HeaderCell)}>
                {h.node}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {props.data.map((row) => (
            <tr key={row.key} className={clsx(classes.Row)}>
              {row.cols.map((col, colIdx) => (
                <td
                  key={props.header[colIdx]?.key}
                  className={clsx(classes.Cell)}
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {props.emptyComponent && props.data.length === 0 && !props.isLoading ? (
        <div>{props.emptyComponent}</div>
      ) : null}

      <div className={classes.Preloader} data-is-visible={props.isLoading}>
        <Spinner />
      </div>
    </div>
  );
};
