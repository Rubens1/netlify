import team3 from 'assets/img/team/3.jpg';
import PageHeader from 'components/common/PageHeader';
import { React, useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link, createSearchParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import axios from "axios";
import FalconComponentCard from 'components/common/FalconComponentCard';
import { toast } from 'react-toastify';

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState();
  const [links, setLinks] = useState();
  const [currentPage, setCurrentPage] = useState("http://localhost:8000/api/produtos?page=1");
  const [wasDeleteted, setWasDeleted] = useState(false);
  const [preDeleteData, setPreDeleteData] = useState();
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [identifica, setIdentifica] = useState();
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    axios.get(currentPage, {
      headers: {
        "Authorization": localStorage.getItem("tokenUser")
      }
    })
      .then(response => {
        setTotalPages(response.data.total)
        setWasDeleted(false);
        setProdutos(response.data.data);
        setLinks(response.data.links)
      })

  }, [currentPage, wasDeleteted])

  const handleClose = () => {
    setShow(false)
    setDeleteShow(false)
  };

  const handleShow = (e) => {
    setShow(true)
    setIdentifica(e)
  };

  const handleItemDelete = (item) => {
    setPreDeleteData(item)
    setDeleteShow(true);
  }

  const deleteItem = (e) => {
    axios.delete(`${process.env.REACT_APP_API_URL}deletar-produto/${e}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("tokenUser")}`
      }
    })
      .then((response) => {
        setDeleteShow(false)
        setShow(false)
        setWasDeleted(true);

        toast.success('Produto excluído', {
          theme: 'colored',
          position: "top-right"
        });
      })
      .catch((error) => {
        toast.error("Erro ao excluir", {
          theme: 'colored',
          position: "top-right"
        })
      })
  }

  return (
    <>
      <PageHeader title="Lista de Produtos" className="mb-3" ></PageHeader>
      <FalconComponentCard className="mb-0">
        <div className='m-3'>
          <Table responsive striped hover>

            <thead>
              <tr>
                <th scope="col">Produto</th>
                <th scope="col">Categoria</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>
            <tbody>
              {produtos && produtos.map((item, key) =>
                <tr key={key} className="align-middle">
                  <td className="text-nowrap">
                    <div className="d-flex align-items-center">
                      <div className="ms-2">{item.nome}</div>
                    </div>
                  </td>
                  <td className="text-nowrap">Categoria</td>
                  <td className="text-nowrap">{item.qtd}</td>

                  <td>
                    <Button onClick={e => handleShow(item.id)} className='btn btn-success'>
                      <BiEdit />
                    </Button>
                    <Button onClick={e => handleItemDelete(item)} className='btn btn-danger ms-3'>
                      <AiOutlineDelete />
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <div className="flex">
            <nav aria-label="Produtos">
              <ul className="pagination">
                {totalPages > 0 ? links.map((item, key) =>
                  <li value={item.label} key={key} onClick={() => setCurrentPage(item.url)} className="page-item">
                    <Link
                      id="el"
                      alt="anterior"
                      className="page-link"
                      href="#">{item.label.replace(/&laquo;/g, '').replace(/&raquo;/g, '')}
                    </Link>
                  </li>

                ) : <></>}

              </ul>
            </nav>
          </div>
        </div>
        {/**Exlcuir */}
        <Modal show={deleteShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tem certeza que você quer excluir esse produto?</Modal.Title>
          </Modal.Header>
          <Modal.Body>O produto é: {preDeleteData ? preDeleteData.nome : ""} </Modal.Body>
          <Modal.Footer className='d-flex justify-content-center'>
            <Button className="btn-success" variant="primary" onClick={e => deleteItem(preDeleteData ? preDeleteData.id : "")}>
              CONFIRMAR
            </Button>
            <Button className="btn-danger" onClick={handleClose}>
              CANCELAR
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Editar*/}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tem certeza que você quer excluir esse</Modal.Title>
          </Modal.Header>
          <Modal.Body>Id do produto é {identifica} </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </FalconComponentCard>

    </>
  );
};

export default ListaProdutos;
