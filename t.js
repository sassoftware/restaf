import * as React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import {
  useDemoData,
  getRealGridData,
  getCommodityColumns,
} from '@mui/x-data-grid-generator';
import LinearProgress from '@mui/material/LinearProgress';

const MAX_ROW_LENGTH = 500;

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function InfiniteLoadingGrid() {
  const [loading, setLoading] = React.useState(false);
  const [loadedRows, setLoadedRows] = React.useState([]);
  const mounted = React.useRef(true);
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 20,
    maxColumns: 6,
  });

  const loadServerRows = async (newRowLength) => {
    setLoading(true);
    const newData = await getRealGridData(newRowLength, getCommodityColumns());
    // Simulate network throttle
    await sleep(Math.random() * 500 + 100);

    if (mounted.current) {
      setLoading(false);
      setLoadedRows(loadedRows.concat(newData.rows));
    }
  };

  const handleOnRowsScrollEnd = (params) => {
    if (loadedRows.length <= MAX_ROW_LENGTH) {
      loadServerRows(params.viewportPageSize);
    }
  };

  React.useEffect(() => {
    return () => {
      mounted.current = true;
    };
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridPro
        {...data}
        rows={data.rows.concat(loadedRows)}
        loading={loading}
        hideFooterPagination
        onRowsScrollEnd={handleOnRowsScrollEnd}
        components={{
          LoadingOverlay: LinearProgress,
        }}
      />
    </div>
  );
}
