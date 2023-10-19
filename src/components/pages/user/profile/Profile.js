import React, { useEffect, useState } from 'react';
import ProfileBanner from '../ProfileBanner';
import coverSrc from 'assets/img/generic/4.jpg';
import avatar from 'assets/img/team/2.jpg';
import { Col, Row } from 'react-bootstrap';
import ProfileSettings from '../settings/ProfileSettings';
import ActivityLog from './ActivityLog';
import activities from 'data/activities';


const Profile = () => {
  const [formData, setFormData] = useState({});


  const profileData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}pessoa-perfil`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('tokenUser')}`
      }
    })

    const data = await res.json()

    setFormData(data)

  }

  useEffect(() => {
    profileData();

  }, [])

  return (
    <>
      <ProfileBanner>
        <ProfileBanner.Header
          coverSrc={coverSrc}
          avatar={avatar}
          className="mb-8"
        />
      </ProfileBanner>
      <Row className="g-3">
        <Col lg={12}>
          <ProfileSettings formData={formData} />
          <ActivityLog colaborador={formData.id} className="mt-3" activities={activities.slice(5, 9)} />
        </Col>
        
      </Row>
    </>
  );
};

export default Profile;