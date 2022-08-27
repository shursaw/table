import Table from 'react-bootstrap/Table';

const ShowTable =({data, sort, sortColumn, sortDirection, filter, numPerPage, currentPage, setCurrentPage}) => { 

    const showName=(col, name) => {
        if (col==sortColumn) {
            if (sortDirection=='asc') {
                return `${name} (z-a)`;
            } else if (sortDirection=='desc') {
                return `${name} (a-z)`;
            }
        } else {
            return name;
        }
    }

    const filteredData = data
    .filter(item => {
      return item.firstName.toLowerCase().includes(filter.toLowerCase())
       || item.lastName.toLowerCase().includes(filter.toLowerCase())
       || item.city.toLowerCase().includes(filter.toLowerCase())
    });

    const toArray=(numP) => {
        const arOfPages=[];
        for(let i=1; i<=numP; i++) {
            arOfPages.push(i);
        }
        return arOfPages;
      }

    const pageClick=(e)=>{
        setCurrentPage(+e.target.textContent);
      }
      
    const totalPages=Math.ceil(filteredData.length/numPerPage);
   
    const arrayOfPages = toArray(totalPages);

    return (
        <>
            <Table striped bordered>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th className="forSort" onClick={() => sort('firstName')}>{showName('firstName', "First Name")}</th>
                    <th className="forSort" onClick={() => sort('lastName')}>{showName('lastName', "Last Name")}</th>
                    <th className="forSort" onClick={() => sort('city')}>{showName('city', "City")}</th>
                  </tr>
                </thead>
                
                <tbody>
                  {    
                    filteredData.
                    slice((currentPage-1)*(+numPerPage),(currentPage-1)*(+numPerPage) + (+numPerPage))
                    .map(item =>                  
                        <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.city}</td>
                        </tr>
                    )
                  }
                  
                  
                </tbody>
                        
            </Table>
              
        {
            arrayOfPages.map(el => <span key={el} className={el===currentPage ? "curPage": "forSort"} onClick={pageClick}>{el}  </span>)
        }
      </>          
    )
}

export default ShowTable;