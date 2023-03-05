import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import noImage from '../img/no_image.jpg';

const Category = ({ categoryNews }) => {

    const buttons = ["General", "Entertainment", "Business", "Politics", "Sports", "Tech", "Travel"];
    const [value, setValue] = useState(0);
    const [news, setNews] = useState(categoryNews);
    const [loading, setLoading] = useState(false);
    const apiKey = process.env.REACT_APP_API_KEY;

    const splitDate = (item) => {
        const date = news[item].published_at.split("T");
        const split = date[0].split("-");
        const dateFormat = `${split[2]}/${split[1]}/${split[0]}`;
        return dateFormat;
    };

    const getCategory = (index) => {
        setLoading(true);
        const category = buttons[index][0].toLowerCase() + buttons[index].substring(1);
        axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=${apiKey}&language=en&categories=${category}&limit=3`)
            .then((response) => {
                setNews(response.data.data);
                setValue(index);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <section className='categories'>
            <div className='underline-top'></div>
            {
                loading ? <Loader /> :
                    <div className='category-flex'>
                        <div className='category-btns'>
                            {
                                buttons.map((btn, index) => {
                                    return <div className={`cat-btn ${index === value && "active-btn"}`}
                                        onClick={() => getCategory(index)}
                                        key={index}>
                                        <h3>{btn}</h3>
                                    </div>
                                })
                            }
                        </div>
                        <section className='categories-news-container'>
                            <div className='categories-news-left'>
                                <div className='categories-news-item-1'>
                                    <div className='container'>
                                        <img src={news[0].image_url === "" ? noImage : news[0].image_url} alt={news[0].title} />
                                        <div className='title'>
                                            <h3><a href={news[0].url} rel="noreferrer" target="_blank">{news[0].title}</a></h3>
                                            <p>{splitDate(0)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='categories-news-right'>
                                <div className='categories-news-item-2'>
                                    <div>
                                        <img src={news[1].image_url === "" ? noImage : news[1].image_url} alt={news[1].title} />
                                    </div>
                                    <div>
                                        <div>
                                            <h3><a href={news[1].url} rel="noreferrer" target="_blank">{news[1].title}</a></h3>
                                            <p>{splitDate(1)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='categories-news-item-3'>
                                    <div>
                                        <img src={news[2].image_url === "" ? noImage : news[2].image_url} alt={news[2].title} />
                                    </div>
                                    <div>
                                        <div>
                                            <h3><a href={news[2].url} rel="noreferrer" target="_blank">{news[2].title}</a></h3>
                                            <p>{splitDate(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
            }
            <div className='underline-bottom'></div>
        </section>
    )
};

export default Category;