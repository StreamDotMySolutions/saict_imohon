import React from 'react';
import { Badge, Table } from 'react-bootstrap';
import InventoryDashboard from './InventoryDashboard';

const InventoryList = () => {

    const data = {
        1 : {
            'id': 1,
            'item': 'pc',
            'vendor': 'xyz sdn bhd',
            'total': 20,
            'contract_duration': '1/11/23 - 1/11/24',
            'received_date': '11/7/23',
            'user_id': 'En Zikri Yahya'
        },
        2 : {
            'id': 2,
            'item': 'pbwm',
            'vendor': 'abc sdn bhd',
            'total': 10,
                 'contract_duration': '1/11/23 - 1/11/24',
            'received_date': '15/7/23',
            'user_id': 'Pn Siti'
        },
        3 : {
            'id': 3,
            'item': 'pcn',
            'vendor': 'abc sdn bhd',
            'total': 10,
                 'contract_duration': '1/11/23 - 1/11/24',
            'received_date': '15/7/23',
            'user_id': 'Ms Chong'
        },
        4 : {
            'id': 4,
            'item': 'pc',
            'vendor': 'abc sdn bhd',
            'total': 10,
                 'contract_duration': '1/11/23 - 1/11/24',
            'received_date': '15/7/23',
            'user_id': 'En Amir'
        },
        5 : {
            'id': 5,
            'item': 'pcn',
            'vendor': 'abc sdn bhd',
            'total': 10,
                 'contract_duration': '1/11/23 - 1/11/24',
            'received_date': '15/7/23',
            'user_id': 'Pn Zulaikha'
        }
    }

    function InventoryItems() {
        return (
          <>
            {Object.values(data).map((item) => (
              <tr key={item.id}>
                <td className='text-center'><Badge>{item.id}</Badge></td>
                <td>{item.vendor}</td>
                <td className='text-center'>{item.item}</td>
                <td className='text-center'>{item.total}</td>
                <td className='text-center'>{item.contract_duration}</td>
                <td className='text-center'>{item.received_date}</td>
                <td>{item.user_id}</td>
              </tr>
            ))}
          </>
        );
    }

    return (<>
   
        <InventoryDashboard />
        <div className="col" style={{ lineHeight: '2.5' }}>
            <Table className='table'>
                <thead>
                    <tr>
                        <th className='text-center'>ID</th>
                        <th>VENDOR</th>
                        <th className='text-center'>ITEM</th>
                        <th className='text-center'>TOTAL</th>
                        <th className='text-center'>DURATION</th>
                        <th className='text-center'>RECEIVED ON</th>
                        <th>OFFICER</th>
                    </tr>
                </thead>
                <InventoryItems />
            </Table>
        </div>
    </>);
};

export default InventoryList;