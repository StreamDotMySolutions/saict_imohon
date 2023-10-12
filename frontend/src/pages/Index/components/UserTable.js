import React from 'react';

function UserTable() {
  return (
    <table className="table table-bordered">
        <thead>
            <tr>
                <th className="px-5">Name</th>
                <th className="px-5">Negeri</th>
                <th className="px-5 col-6 border border-end-0">Jabatan</th>
                <th></th>
            </tr>
        </thead>
      <tbody>
        <tr>
          <td className='px-5'>Azril Nazli</td>
          <td className='px-5'>Johor</td>
          <td className='px-5'>Unit Rekabentuk</td>
          <td className='px-5'>
          <button className="btn btn-primary">Show</button>
            {' '}
            <button className="btn btn-primary">Edit</button>
            {' '}
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <td className='px-5'>Shah</td>
          <td className='px-5'>Kelantan</td>
          <td className='px-5'>Jab Korporat</td>
          <td className='px-5'>
          <button className="btn btn-primary">Show</button>
            {' '}
            <button className="btn btn-primary">Edit</button>
            {' '}
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <td className='px-5'>Suzana</td>
          <td className='px-5'>Sabah</td>
          <td className='px-5'>Jab Penyiaran</td>
          <td className='px-5'>
          <button className="btn btn-primary">Show</button>
            {' '}
            <button className="btn btn-primary">Edit</button>
            {' '}
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default UserTable;
