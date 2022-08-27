import { useEffect, useState } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowTable from './ShowTable/showTable';
import Loader from './Loader/Loader';


function App() {

  const [table, setTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [find, setFind] = useState('');
  const [numRecords, setNumRecords] = useState(100);
  const [numPerPage, setNumPerPage] = useState(10000);
  const [currentPage, setCurrentPage] = useState(1);

  const loadData =(q) => {
    fetch(`http://www.filltext.com/?rows=${q}&id={index}&firstName={firstName}&lastName={lastName}&city={city}&pretty=true`)
        .then((response)=>response.json())
        .then(data=>setTable(data))
        .catch((err) =>console.warn(err))
        .finally(setIsLoading(false));
  }

  

  useEffect(() => {
    loadData(numRecords);
   
  },[numRecords])

  const toFind =(e) =>{
    setFind(e.target.value);
    setCurrentPage(1);
  }

  const toNumRecords =(e) =>{
    if(e.target.value > 200) {
      setNumRecords(200);
    } else {
    setNumRecords(e.target.value);
    }
    setCurrentPage(1);
  }

  const toNumPerPage =(e) =>{
    setNumPerPage(e.target.value);
    setCurrentPage(1);
  }



  const toSort=(field) => {
    
    if (sortDirection==='desc') {
      setSortDirection('asc');
      setTable(table.sort((a, b) => {
        if (a[field] < b[field])
          return 1;
        if (a[field] > b[field])
        return -1;  
      }))} else {
        setSortDirection('desc');
        setTable(table.sort((a, b) => {
          if (a[field] < b[field])
            return -1;
          if (a[field] > b[field])
          return 1;  
      }))};

    setSortColumn(field);
  }

  return (
    <div className="App">   
        <Container className='tabl'>
           <Row>
            <Col>
              {isLoading ?
                <Loader/> : 
                <>
                Filter
                <input onChange={(e)=>toFind(e)} type="text" value={find} style={{margin: '15px'}}/> 
                Number of records
                <input onChange={(e)=>toNumRecords(e)} type="text" value={numRecords} style={{margin: '15px'}}/>
                Number per page
                <select onChange={(e)=>toNumPerPage(e)}name="perPage" style={{margin: '15px'}}>
                  <option value="10000">All</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <ShowTable data={table} sort={toSort} sortColumn={sortColumn} sortDirection={sortDirection} filter={find}
                 numPerPage={numPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                
                </>
              }  
            </Col>
           </Row>
        </Container>
    </div>
  );
}

export default App;
