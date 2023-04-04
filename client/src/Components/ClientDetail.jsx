import React from "react"
import {useParams} from "react-router-dom"

const ClientDetail = () => {
    const params = useParams();

    return <>{params}</>
}

export default ClientDetail;