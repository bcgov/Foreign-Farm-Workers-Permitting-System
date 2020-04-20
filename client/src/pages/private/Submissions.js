import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { dateToString, mapDetermination } from '../../utils';
import { Routes } from '../../constants';
import { dateToString, mapDetermination } from '../../utils';

import { Button, Page, Table } from '../../components/generic';

export default () => {
  const history = useHistory();

  const [lookupError, setLookupError] = useState(null);
  const [order, setOrder] = useState('asc');
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const columns = [
    { id: 'createdAt', name: 'Date Submitted' },
    { id: 'registeredBusinessName', name: 'Business Name' },
    { id: 'determination', name: 'Decision' },
    { id: 'id', name: 'Confirmation Number' },
  ];
  const [orderBy, setOrderBy] = useState(columns[0].id);

  /**
   * On page load, perform a query to find all submissions.
   */
  useEffect(() => {
    (async () => {
      setLoading(true);
      const jwt = window.localStorage.getItem('jwt');
      const response = await fetch(`/api/v1/forms`, {
        headers: { 'Accept': 'application/json', 'Content-type': 'application/json', 'Authorization': `Bearer ${jwt}` },
        method: 'GET',
      });
      if (response.ok) {
        const submissions = await response.json();
        const rows = submissions.map((submission) => ({
          createdAt: dateToString(submission.createdAt),
          registeredBusinessName: submission.registeredBusinessName,
          determination: mapDetermination(submission.determination),
          id: submission.id,
          viewMore: (
            <Button
              onClick={() => history.push(Routes.SubmissionDetails.dynamicRoute(submission.id))}
              size="small"
              text="View"
            />
          ),
        }));
        setLookupError(null);
        setRows(rows);
      } else {
        setLookupError(response.error || 'No submissions found');
      }
      setLoading(false);
    })();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sort = (array) => _.orderBy(array, [orderBy, 'createdAt'], [order]);

  return (
    <Page>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
          <Box m={4}>
            <Grid container spacing={3}>

              {/** Title */}
              <Grid item xs={12}>
                <Typography color="primary" variant="h2" gutterBottom noWrap>
                  Submissions
               </Typography>
              </Grid>

              {/** Table */}
              <Grid item xs={12}>
                {lookupError && (
                  <Typography variant="subtitle2" gutterBottom noWrap>
                    {lookupError.message || lookupError}
                  </Typography>
                )}
                {!lookupError && (
                  <Table
                    columns={columns}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rows={sort(rows)}
                    isLoading={isLoading}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};
