import React from 'react';
import {Spinner} from 'reactstrap'
export default function Loading(){



    return (
        <div  className='text-center'>
    <Spinner type="grow" size='lg' color="primary" />
    <Spinner type="grow" size='lg' color="secondary" />
    <Spinner type="grow" size='lg' color="success" />
    <Spinner type="grow" size='lg' color="danger" />
    <Spinner type="grow" size='lg' color="warning" />
    <Spinner type="grow" size='lg' color="info" />
    <Spinner type="grow" size='lg' color="dark" />


        </div>
    )







}