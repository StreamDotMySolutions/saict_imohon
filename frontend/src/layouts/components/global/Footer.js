import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className='bg-dark text-light mt-5 mb-0'>
            <Container className='py-5'>
                <Row className='g-4'>
                    {/* About Section */}
                    <Col lg={4} md={6}>
                        <h6 className='fw-bold mb-3'>
                            <FontAwesomeIcon icon='fa-solid fa-building' className='me-2' />
                            Tentang Kami
                        </h6>
                        <p className='small text-light-emphasis mb-0'>
                            Sistem pengurusan permohonan item pemerintah Malaysia yang memudahkan proses permintaan dan
                            pengedaran barang.
                        </p>
                    </Col>

                    {/* Quick Links */}
                    <Col lg={4} md={6}>
                        <h6 className='fw-bold mb-3'>
                            <FontAwesomeIcon icon='fa-solid fa-link' className='me-2' />
                            Pautan Cepat
                        </h6>
                        <ul className='list-unstyled small'>
                            <li className='mb-2'>
                                <NavLink
                                    to='/keselamatan'
                                    className='text-light text-decoration-none'
                                    style={{ transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#0d6efd')}
                                    onMouseLeave={(e) => (e.target.style.color = '#fff')}
                                >
                                    <FontAwesomeIcon icon='fa-solid fa-lock' className='me-2' />
                                    Dasar Keselamatan
                                </NavLink>
                            </li>
                            <li className='mb-2'>
                                <NavLink
                                    to='/privasi'
                                    className='text-light text-decoration-none'
                                    style={{ transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#0d6efd')}
                                    onMouseLeave={(e) => (e.target.style.color = '#fff')}
                                >
                                    <FontAwesomeIcon icon='fa-solid fa-user-lock' className='me-2' />
                                    Dasar Privasi
                                </NavLink>
                            </li>
                            <li className='mb-2'>
                                <NavLink
                                    to='/penafian'
                                    className='text-light text-decoration-none'
                                    style={{ transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#0d6efd')}
                                    onMouseLeave={(e) => (e.target.style.color = '#fff')}
                                >
                                    <FontAwesomeIcon icon='fa-solid fa-exclamation' className='me-2' />
                                    Penafian
                                </NavLink>
                            </li>
                        </ul>
                    </Col>

                    {/* Contact Section */}
                    <Col lg={4} md={6}>
                        <h6 className='fw-bold mb-3'>
                            <FontAwesomeIcon icon='fa-solid fa-phone' className='me-2' />
                            Hubungi Kami
                        </h6>
                        <div className='small text-light-emphasis'>
                            <p className='mb-2'>
                                <FontAwesomeIcon icon='fa-solid fa-location-dot' className='me-2 text-primary' />
                                Tingkat 12, Menara Angkasapuri
                                <br />
                                <span className='ms-4'>Angkasapuri Kota Media, 50614 KL</span>
                            </p>
                            <p className='mb-2'>
                                <FontAwesomeIcon icon='fa-solid fa-envelope' className='me-2 text-primary' />
                                <a
                                    href='mailto:itsupport@rtm.gov.my'
                                    className='text-light text-decoration-none'
                                    style={{ transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#0d6efd')}
                                    onMouseLeave={(e) => (e.target.style.color = '#fff')}
                                >
                                    itsupport@rtm.gov.my
                                </a>
                            </p>
                            <p>
                                <FontAwesomeIcon icon='fa-solid fa-phone' className='me-2 text-primary' />
                                <a
                                    href='tel:+60322887703'
                                    className='text-light text-decoration-none'
                                    style={{ transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => (e.target.style.color = '#0d6efd')}
                                    onMouseLeave={(e) => (e.target.style.color = '#fff')}
                                >
                                    03-2288 7703
                                </a>
                            </p>
                        </div>
                    </Col>
                </Row>

                <hr className='my-4 border-secondary' />

                <Row className='align-items-center'>
                    {/* Social Media */}
                    <Col md={4} className='mb-3 mb-md-0'>
                        <h6 className='fw-bold mb-3 small'>
                            <FontAwesomeIcon icon='fa-solid fa-share-nodes' className='me-2' />
                            Ikuti Kami
                        </h6>
                        <div className='d-flex gap-3'>
                            <a
                                href='https://www.facebook.com/BeritaRTM'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-light'
                                style={{ fontSize: '1.5rem', transition: 'color 0.2s' }}
                                title='Facebook'
                                onMouseEnter={(e) => (e.target.style.color = '#1877f2')}
                                onMouseLeave={(e) => (e.target.style.color = '#fff')}
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a
                                href='https://twitter.com/beritartm'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-light'
                                style={{ fontSize: '1.5rem', transition: 'color 0.2s' }}
                                title='Twitter'
                                onMouseEnter={(e) => (e.target.style.color = '#1da1f2')}
                                onMouseLeave={(e) => (e.target.style.color = '#fff')}
                            >
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a
                                href='https://www.instagram.com/beritartm'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-light'
                                style={{ fontSize: '1.5rem', transition: 'color 0.2s' }}
                                title='Instagram'
                                onMouseEnter={(e) => (e.target.style.color = '#e4405f')}
                                onMouseLeave={(e) => (e.target.style.color = '#fff')}
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a
                                href='https://www.youtube.com/channel/UCjUxj4cyy_F0tVCT8WfmdZQ'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-light'
                                style={{ fontSize: '1.5rem', transition: 'color 0.2s' }}
                                title='YouTube'
                                onMouseEnter={(e) => (e.target.style.color = '#ff0000')}
                                onMouseLeave={(e) => (e.target.style.color = '#fff')}
                            >
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                            <a
                                href='https://www.tiktok.com/@beritartm'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-light'
                                style={{ fontSize: '1.5rem', transition: 'color 0.2s' }}
                                title='TikTok'
                                onMouseEnter={(e) => (e.target.style.color = '#000')}
                                onMouseLeave={(e) => (e.target.style.color = '#fff')}
                            >
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                        </div>
                    </Col>

                    {/* Copyright */}
                    <Col md={4} className='mb-3 mb-md-0 text-md-center'>
                        <small className='text-light-emphasis d-block'>
                            <FontAwesomeIcon icon='fa-solid fa-copyright' className='me-1' />
                            {currentYear} Jabatan Penyiaran Malaysia
                            <br />
                            Seksyen Aplikasi ICT
                        </small>
                    </Col>

                    {/* Back to Top */}
                    <Col md={4} className='text-md-end'>
                        <button
                            onClick={scrollToTop}
                            className='btn btn-sm btn-outline-light'
                            title='Kembali ke atas'
                        >
                            <FontAwesomeIcon icon='fa-solid fa-arrow-up' className='me-2' />
                            Atas
                        </button>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
