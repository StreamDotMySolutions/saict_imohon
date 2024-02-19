import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../../../libs/axios'
import useMohonApprovalStore from '../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table,Pagination, Button, Row, Col } from 'react-bootstrap'

const MohonApprovalByManager = () => {
    const store = useMohonApprovalStore()
    useEffect( () => {
        // axios call
    })

    return (
        <div>
           hello world
        </div>
    );
};
export default MohonApprovalByManager