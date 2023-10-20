import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import createMarkup from 'helpers/createMarkup';
import Avatar from 'components/common/Avatar';

const Notification = ({
  avatar,
  created_at,
  className,
  unread,
  obs,
  flush,
  emoji,
  children
}) => {
  const option = {
    year: 'numeric',
    month: ('long' || 'short' || 'numeric'),
    weekday: ('long' || 'short'),
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  const locale = "pt-BR";

  const date = new Date(created_at).toLocaleDateString(locale, option);
  

  return (
    <Link
      className={classNames(
        'notification',
        { 'notification-unread': unread, 'notification-flush': flush },
        className
      )}
      to="#!"
    >
      
      <div className="notification-body">
        <p className="mb-1" >{obs}</p>
        <span className="notification-time">
          {date}
        </span>
      </div>
    </Link>
  );

  Notification.propTypes = {
    avatar: PropTypes.shape(Avatar.propTypes),
    time: PropTypes.string.isRequired,
    className: PropTypes.string,
    unread: PropTypes.bool,
    flush: PropTypes.bool,
    emoji: PropTypes.string,
    children: PropTypes.node
  }
}
  ;

Notification.defaultProps = { unread: false, flush: false };

export default Notification;
