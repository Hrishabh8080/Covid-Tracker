import React from 'react'
import './DailyCases.css';
export const DailyCases = ({ dailyData }) => {
    // fetchData();
    return (
        <div className='table1' >

            {/* {console.log(dailyData)} */}
            
            <tr>
                <th>Date</th>    
                <th>Total Cases</th>    
                <th>Total Recover</th>    
                <th>Total Death</th>    
            </tr>
            {
                dailyData.map((dataa, i) => (
                    <tr key={i}>
                        <td>{dataa.adate}</td>
                        <td><strong>{dataa.cases}</strong></td>
                        <td><strong>{dataa.recovered}</strong></td>
                        <td><strong>{dataa.deaths}</strong></td>
                    </tr>
                )).reverse()
            }

        </div>
    )
}




