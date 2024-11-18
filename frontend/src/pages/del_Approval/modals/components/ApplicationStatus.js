import React from 'react';
import { Button } from 'react-bootstrap';

const ApplicationStatus = ({status}) => {
    return (
        <div className='text-center'>
                { status === 'pending' && 
                   <Button size={'sm'} variant={'warning'}>MENUNGGU</Button>
                }

                { status === 'approved' && 
                   <Button size={'sm'} variant={'success'}>LULUS</Button>
                }

                { status === 'rejected' && 
                   <Button size={'sm'} variant={'danger'}>GAGAL</Button>
                }
               
        </div>
    );
};

export default ApplicationStatus;