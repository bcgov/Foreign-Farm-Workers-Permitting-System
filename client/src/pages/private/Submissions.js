import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

import { Routes } from '../../constants';

import { Button, Page, Table } from '../../components/generic';

export default () => {
  const history = useHistory();
  const [lookupError, setLookupError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const columns = ['Date Submitted', 'Business Name', 'Decision', 'Confirmation Number'];

  /**
   * On page load, perform a query to find all submissions.
   */
  useEffect(() => {
    (async () => {
      setLoading(true);
      //TODO: Uncomment once backend work complete
      // const jwt = window.localStorage.getItem('jwt');
      // const response = await fetch(`/api/v1/submissions`, {
      //   headers: { 'Accept': 'application/json', 'Content-type': 'application/json', 'Authorization': `Bearer ${jwt}` },
      //   method: 'GET',
      // });
      // if (response.ok) {
      //   const { submissions } = await response.json();
      //   const rows = submissions.map((submission) => ({
      //     dateSubmitted: submission.dateSubmitted,
      //     businessName: submission.businessName,
      //     decision: submission.decision,
      //     confirmationNumber: submission.id,
      //     viewMore: (
      //       <Button
      //         onClick={() => history.push(Routes.SubmissionDetails.dynamicRoute(submission.id))}
      //         size="small"
      //         text="View"
      //       />
      //     ),
      //   }));
      //   setRows(rows);
      // } else {
      //   setLookupError(response.error || 'No submissions found');
      // }
      // setLoading(false);

      // TODO: Remove once backend work complete
      const rows = [...Array(20)].map(() => ({
        dateSubmitted: '10/10/2020',
        businessName: 'Farm',
        decision: 'Pending',
        confirmationNumber: '123ABC',
        viewMore: (
          <Button
            onClick={() => history.push(Routes.SubmissionDetails.dynamicRoute('123ABC'))}
            size="small"
            text="View"
          />
        ),
      }));
      setRows(rows);
      setLoading(false);
    })();
  }, []);

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
                {!lookupError && (
                  <Table
                    columns={columns}
                    rows={rows}
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
