
import Notes from "./Notes"
import React from 'react'
const Home = (props) => {
    const { showalert } = props;
    return (
        <>

            <Notes showalert={showalert} />
        </>
    )
}

export default Home
