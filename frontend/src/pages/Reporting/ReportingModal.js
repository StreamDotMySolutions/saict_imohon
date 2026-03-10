import { useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShowAgihan from './show'

export default function ReportingModal({ mohonRequestId, trigger }) {
    const [show, setShow] = useState(false)
    const printRef = useRef(null)

    const handlePrint = () => {
        const content = printRef.current?.innerHTML
        if (!content) return
        const win = window.open('', '_blank')
        win.document.write(`
            <html>
            <head>
                <title>Laporan Permohonan</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
                <style>
                    body { padding: 24px; font-size: 13px; }
                    @media print { body { padding: 0; } }
                </style>
            </head>
            <body>${content}</body>
            </html>
        `)
        win.document.close()
        win.focus()
        win.print()
        win.close()
    }

    return (
        <>
            {trigger
                ? <span onClick={() => setShow(true)}>{trigger}</span>
                : <Button size='sm' variant='outline-primary' onClick={() => setShow(true)}>
                    <FontAwesomeIcon icon='fas fa-file-lines' className='me-1' />Laporan
                  </Button>
            }

            <Modal size='xl' show={show} onHide={() => setShow(false)} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon='fas fa-file-lines' className='me-2 text-primary' />
                        Laporan Permohonan
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body ref={printRef}>
                    <ShowAgihan mohonRequestId={mohonRequestId} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='outline-secondary' size='sm' onClick={handlePrint}>
                        <FontAwesomeIcon icon='fas fa-print' className='me-1' />Cetak
                    </Button>
                    <Button variant='secondary' size='sm' onClick={() => setShow(false)}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
