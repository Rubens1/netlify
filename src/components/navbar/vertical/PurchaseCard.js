import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image from 'assets/img/icons/spot-illustrations/navbar-vertical.png';
import FalconCloseButton from 'components/common/FalconCloseButton';

const PurchaseCard = () => {
  const [show, setShow] = useState(true);
  return (
    show && (
      <div className="settings my-3">
        <Card className="p-0 rounded-2 position-relative">
          <div
            className="position-absolute"
            style={{ right: '6px', top: '3px' }}
          >
            <FalconCloseButton
              size="sm"
              className="fs--2"
              noOutline
              onClick={() => setShow(false)}
            />
          </div>
        </Card>
      </div>
    )
  );
};

export default PurchaseCard;
