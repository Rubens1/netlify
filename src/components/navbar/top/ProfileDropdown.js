import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import avatar from 'assets/img/team/avatar.png';
import { toast } from 'react-toastify';
import Avatar from 'components/common/Avatar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {

  const navigate = useNavigate();

  const logout = async (e) => {
    let token = localStorage.getItem('tokenUser');

    axios.post(`${process.env.REACT_APP_API_URL}pessoa-sair`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 1000
    }).then((response) => {
      localStorage.removeItem("tokenUser");
      toast.success(`Usuário desconectado com sucesso`, {
        theme: 'colored',
        position: "top-right"
      });
      navigate("/login")
    }).catch(error => {
      localStorage.removeItem("tokenUser");
      navigate("/login")
    });
  }

  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <Avatar src={avatar} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">

          <Dropdown.Item href="">Meu perfil</Dropdown.Item>

          <Dropdown.Item >
            <div className='logout' onClick={e => logout(e)}>Sair</div>
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
