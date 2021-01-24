import React, { useEffect, useState } from 'react'
import { useTable } from 'react-table'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const axios = require('axios').default;

const url = 'https://jsonplaceholder.typicode.com';



function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <table class="table" {...getTableProps()}>
      <thead class="thead-dark">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th scope="col" {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}



function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Personal Info',
        columns: [
          {
            Header: 'id',
            accessor: 'id',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'User Name',
            accessor: 'username',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Phone',
            accessor: 'phone',
          },
          {
            Header: 'Website',
            accessor: 'website',
          },
        ],
      },
      {
        Header: 'Address',
        columns: [
          {
            Header: 'Street',
            accessor: 'address.street',
          },
          {
            Header: 'Suite',
            accessor: 'address.suite',
          },
          {
            Header: 'City',
            accessor: 'address.city',
          },
          {
            Header: 'ZipCode',
            accessor: 'address.zipcode',
          },
          {
            Header: 'Geo.Lat',
            accessor: 'address.geo.lat',
          },
          {
            Header: 'Geo.Lng',
            accessor: 'address.geo.lng',
          }
        ],
      },
      {
        Header: 'Company',
        columns: [
          {
            Header: 'Name',
            accessor: 'company.name',
          },
          {
            Header: 'Catch Phrase',
            accessor: 'company.catchPhrase',
          },
          {
            Header: 'Bs',
            accessor: 'company.bs',
          }
        ],
      }
    ],
    []
  )

  const [data, setData] = useState([]);

  useEffect(() => {
    getInitialData();
  }, []);


  const getInitialData = () => {
    axios.get( url + '/users')
    .then((data) => {
      // handling success
      setData(data.data) //consume data from endpoint
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  
  const getUserById = (id = 1) => { //if id not provided, will retrieve the first user
    axios.get(url + '/users/' + id)
    .then((data) => {
      // handling success
      console.log("Retrieved user: ");
      console.log(data.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  
  const insertData = () => {
    const userToInsert = {
        id: 11,
        name: "Clementina DuBuque",
        username: "Moriah.Stanton",
        email: "Rey.Padberg@karina.biz",
        address: {
          street: "Kattie Turnpike",
          suite: "Suite 198",
          city: "Lebsackbury",
          zipcode: "31428-2261",
          geo: {
            lat: "-38.2386",
            lng: "57.2232"
          }
        },
        phone: "024-648-3804",
        website: "ambrose.net",
        company: {
          name: "Hoeger LLC",
          catchPhrase: "Centralized empowering task-force",
          bs: "target end-to-end models"
        }
    };
  
    axios.post(url + '/users', userToInsert )
    .then((created) => {
      // handle error
      console.log("Sucessful insertion:");
      console.log(created.data);
      data.push(created.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  
  const modifyData = (id = 1) => {
    const modifiedData = {
      name: "Pepito"
    };
    axios.patch(url + '/users/' + id, modifiedData)
    .then((response) => {
      // handling success
      console.log("Modified user: ");
      console.log(response.data)
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  
  const deleteData = (id = 2) => {
    axios.delete(url + '/users/' + id)
    .then((response) => {
      // handling success
      console.log ("Item deleted id:" + id)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  return (
    
  <div>
    <Table columns={columns} data={data} />
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <Button style={{marginRight: '10px', marginLeft: '10px'}} className="col-lg-2 col-md-2 col-sm-2 col-xs-2"  onClick={() => insertData()}> Add User </Button>
      <Button style={{marginRight: '10px', marginLeft: '10px'}} className="col-lg-2 col-md-2 col-sm-2 col-xs-2"  onClick={() => deleteData()}> Delete User </Button>
      <Button style={{marginRight: '10px', marginLeft: '10px'}} className="col-lg-2 col-md-2 col-sm-2 col-xs-2"  onClick={() => modifyData()}> Modify User </Button>
      <Button style={{marginRight: '10px', marginLeft: '10px'}} className="col-lg-2 col-md-2 col-sm-2 col-xs-2"  onClick={() => getUserById()}> Get first User </Button>
    </div>
    
  </div>
  )
}

export default App
