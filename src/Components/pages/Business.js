import React from 'react';
import SingleCategory from '../SingleCategory';

const Business = () => {

    const title = "BUSINESS";
    const apiKey = process.env.REACT_APP_API_KEY;
    const categoryUrl = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&language=en&categories=business&limit=5`;

    return (
        < SingleCategory
            title={title}
            categoryUrl={categoryUrl} />
    )
};

export default Business;