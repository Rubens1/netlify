import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Notification from 'components/notification/Notification';
import classNames from 'classnames';
import Flex from 'components/common/Flex';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ActivityLog = ({ activities, colaborador, ...rest }) => {
  const [logs, setLogs] = useState()

  useEffect(() => {
    if (colaborador) {
      axios.get(`${process.env.REACT_APP_API_URL}logs/${colaborador}`)
        .then((response) => {
          setLogs(response.data)
        })
        .catch((error) => {

        })
    }
  }, [colaborador])


  const option = {
    year: 'numeric',
    month: ('long' || 'short' || 'numeric'),
    weekday: ('long' || 'short'),
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  const locale = "pt-BR";


  return (
    <Card {...rest}>
      <Card.Header className="bg-light">
        <Flex justifyContent="between">
          <h5 className="mb-1 mb-md-0">Minhas atividades recentes</h5>
          <Link to="/social/activity-log" className="font-sans-serif">
            All logs
          </Link>
        </Flex>
      </Card.Header>
      <Card.Body className="p-0">
        {logs && logs.map((activity, index) => (
          <Notification
            {...activity}
            key={activity.id}
            className={classNames(
              'border-x-0 border-bottom-0 border-300',
              index + 1 === activities.length ? 'rounded-top-0' : 'rounded-0'
            )}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

ActivityLog.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape(Notification.propTypes))
    .isRequired
};

export default ActivityLog;
