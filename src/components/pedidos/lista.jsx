import team3 from 'assets/img/team/3.jpg';
import PageHeader from 'components/common/PageHeader';
import React from 'react';
import { Button, Table } from 'react-bootstrap';import { AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import {Image} from 'react-bootstrap';
import FalconComponentCard from 'components/common/FalconComponentCard';

const PedidosInfo = () => {
    return(
        <>
            <PageHeader title="Lista de Pedido" className="mb-3" ></PageHeader>
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
                  <tr className="align-middle">
                    <td className="text-nowrap">
                      <div className="d-flex align-items-center">
                        <Image src={team3} rounded className="me-3 d-none d-md-block" width="80" alt="product image"/>
                        <div className="ms-2">Produto</div>
                      </div>
                    </td>
                    <td className="text-nowrap">Categoria</td>
                    <td className="text-nowrap">12</td>
                    
                    <td><Link hrf="#" alt="Editar" className='btn btn-success'><BiEdit /></Link><Button className='btn btn-danger ms-3'><AiOutlineDelete /></Button></td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-nowrap">
                      <div className="d-flex align-items-center">
                        <Image src={team3} rounded className="me-3 d-none d-md-block" width="80" alt="product image"/>
                        <div className="ms-2">Produto</div>
                      </div>
                    </td>
                    <td className="text-nowrap">Categoria</td>
                    <td className="text-nowrap">12</td>
                    
                    <td><Link hrf="#" alt="Editar" className='btn btn-success'><BiEdit /></Link><Button className='btn btn-danger ms-3'><AiOutlineDelete /></Button></td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-nowrap">
                      <div className="d-flex align-items-center">
                        <Image src={team3} rounded className="me-3 d-none d-md-block" width="80" alt="product image"/>
                        <div className="ms-2">Produto</div>
                      </div>
                    </td>
                    <td className="text-nowrap">Categoria</td>
                    <td className="text-nowrap">12</td>
                    
                    <td><Link hrf="#" alt="Editar" className='btn btn-success'><BiEdit /></Link><Button className='btn btn-danger ms-3'><AiOutlineDelete /></Button></td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-nowrap">
                      <div className="d-flex align-items-center">
                        <Image src={team3} rounded className="me-3 d-none d-md-block" width="80" alt="product image"/>
                        <div className="ms-2">Produto</div>
                      </div>
                    </td>
                    <td className="text-nowrap">Categoria</td>
                    <td className="text-nowrap">12</td>
                    
                    <td><Link hrf="#" alt="Editar" className='btn btn-success'><BiEdit /></Link><Button className='btn btn-danger ms-3'><AiOutlineDelete /></Button></td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-nowrap">
                      <div className="d-flex align-items-center">
                        <Image src={team3} rounded className="me-3 d-none d-md-block" width="80" alt="product image"/>
                        <div className="ms-2">Produto</div>
                      </div>
                    </td>
                    <td className="text-nowrap">Categoria</td>
                    <td className="text-nowrap">12</td>
                    
                    <td><Link hrf="#" alt="Editar" className='btn btn-success'><BiEdit /></Link><Button className='btn btn-danger ms-3'><AiOutlineDelete /></Button></td>
                  </tr>
                  <tr className="align-middle">
                    <td className="text-nowrap">
                      <div className="d-flex align-items-center">
                        <Image src={team3} rounded className="me-3 d-none d-md-block" width="80" alt="product image"/>
                        <div className="ms-2">Produto</div>
                      </div>
                    </td>
                    <td className="text-nowrap">Categoria</td>
                    <td className="text-nowrap">12</td>
                    
                    <td><Link hrf="#" alt="Editar" className='btn btn-success'><BiEdit /></Link><Button className='btn btn-danger ms-3'><AiOutlineDelete /></Button></td>
                  </tr>
                  
                </tbody>
          </Table>
          <div className="flex">
              <nav aria-label="Produtos">
                  <ul className="pagination">
                      <li className="page-item"><Link alt="anterior" className="page-link" href="#">Anterior</Link></li>
                      <li className="page-item"><Link alt="1" className="page-link" href="#">1</Link></li>
                      <li className="page-item"><Link alt="2" className="page-link" href="#">2</Link></li>
                      <li className="page-item"><Link alt="3" className="page-link" href="#">3</Link></li>
                      <li className="page-item"><Link alt="proximo" className="page-link" href="#">Próximo</Link></li>
                  </ul>
              </nav>
          </div>
      </div>
    </FalconComponentCard>
        </>
    )
}

export default PedidosInfo;