import { type ReactNode } from 'react';
import Skeleton from './Skeleton';

interface Data {
  [index: string]: ReactNode;
}

interface Props {
  data: Data[];
  columns: {
    title: string;
    dataIndex: keyof Data;
  }[];
  className?: string;
  isLoading?: boolean;
  loadingItems?: number;
  summary?: ReactNode;
}

export default function Table({ columns, data, className, isLoading = false, loadingItems = 3, summary }: Props) {
  return (
    <div className={`relative overflow-x-auto rounded ${className}`}>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-light-gray'>
            {columns?.map((col, index) => (
              <th className='border py-3 px-1 font-semibold' key={index}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        {isLoading ? (
          <tbody className='text-center'>
            {Array(loadingItems)
              .fill(null)
              .map((_, i) => (
                <tr key={i} className={`${i % 2 !== 0 && 'bg-gray-100'}`}>
                  {columns?.map((_, k) => (
                    <td key={k} className='border py-3 px-1'>
                      <Skeleton className='mx-auto h-5 w-5/6' />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        ) : (
          <tbody className='text-center'>
            {data?.map((el, index) => (
              <tr key={index} className={`${index % 2 !== 0 && 'bg-gray-100'}`}>
                {columns?.map((col, index) => (
                  <td key={index} className='border py-3 px-1'>
                    {el[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
        {summary && (
          <tfoot>
            <tr>
              <td className='border py-3 px-1' colSpan={columns?.length}>
                {summary}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
