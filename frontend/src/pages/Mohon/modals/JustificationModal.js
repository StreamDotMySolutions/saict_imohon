import { useRef } from 'react'
import { Button, Overlay, Popover } from 'react-bootstrap'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function JustificationModal({ message }) {
    const [show, setShow] = useState(false)
    const ref = useRef(null)

    return (
        <>
            <Button
                ref={ref}
                size='sm'
                variant={show ? 'secondary' : 'outline-secondary'}
                onClick={() => setShow(s => !s)}
            >
                <FontAwesomeIcon icon='fas fa-comment-dots' className='me-1' />
                Justifikasi
            </Button>

            <Overlay
                show={show}
                target={ref}
                placement='top'
                rootClose
                onHide={() => setShow(false)}
            >
                <Popover style={{ maxWidth: '320px' }}>
                    <Popover.Header>Justifikasi</Popover.Header>
                    <Popover.Body style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
                        {message || <span className='text-muted fst-italic'>Tiada justifikasi.</span>}
                    </Popover.Body>
                </Popover>
            </Overlay>
        </>
    );
}
