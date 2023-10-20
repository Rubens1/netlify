import React, { useEffect, useState, useContext, createContext } from 'react';
import ProfileBanner from '../ProfileBanner';
import coverSrc from 'assets/img/generic/4.jpg';
import avatar from 'assets/img/team/2.jpg';
import { Col, Row } from 'react-bootstrap';
import ProfileSettings from '../settings/ProfileSettings';
import ExperiencesSettings from '../settings/ExperiencesSettings';
import EducationSettings from '../settings/EducationSettings';
import AccountSettings from '../settings/AccountSettings';
import BillingSettings from '../settings/BillingSettings';
import ChangePassword from '../settings/ChangePassword';
import DangerZone from '../settings/DangerZone';
import ActivityLog from './ActivityLog';
import activities from 'data/activities';
import { api } from 'api/api';


export const ProfileContext = createContext({
  setFormData: () => { }
});


const Profile = () => {
  const [formData, setFormData] = useState({});

  const profileData = async () => {
    api.get("pessoa-perfil")
      .then((response) => {
        setFormData(response.data)
      })
  }

  useEffect(() => {
    profileData();

  }, [])

  return (
    <>
      <ProfileContext.Provider value={{ formData, setFormData }} >
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
          {/* <Col lg={4}>
          <div className="sticky-sidebar">
            <AccountSettings />
            <BillingSettings />
            <ChangePassword />
            <DangerZone />
          </div>
        </Col> */}
        </Row>
      </ProfileContext.Provider>
    </>
  );
};

export default Profile;