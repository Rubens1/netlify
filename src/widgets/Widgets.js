import React from 'react';
import ErrorsWidgets from './Errors';
import Forms from './Forms';
import NumberStatsAndChart from './NumberStatsAndChart';
import OthersWidgets from './OthersWidgets';
import TableWidgets from './TableWidgets';
import UsersWidgets from './UsersWidgets';

const Widgets = () => {
  return (
    <>
      <NumberStatsAndChart />
      <TableWidgets />
      <UsersWidgets />
      <ErrorsWidgets />
      <Forms />
      <OthersWidgets />
    </>
  );
};

export default Widgets;
