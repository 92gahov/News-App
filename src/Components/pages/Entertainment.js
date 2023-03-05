import React from 'react';
import SingleCategory from '../SingleCategory';

const Entertaiment = () => {

    const title = "ENTERTAINMENT";
    const apiKey = process.env.REACT_APP_API_KEY;
    const categoryUrl = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&language=en&categories=entertainment&limit=5`;

    return (
        <SingleCategory
            title={title}
            categoryUrl={categoryUrl} />
    )
};

export default Entertaiment;