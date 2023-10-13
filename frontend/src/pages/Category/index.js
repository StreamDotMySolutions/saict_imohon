import {useEffect, useState } from 'react';

const CategoryIndex = () => {

    const [data, setData] = useState(null)

    useEffect( () => {
        setData('test')
    },[])

    return (
        <div>
            <h1>Category</h1>
            {data ? data : null}
        </div>
    );
};

export default CategoryIndex;