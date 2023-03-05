import React, { useEffect, useState } from 'react';
import noImage from '../../img/no_image.jpg';
import axios from 'axios';
import Category from '../Category';
import Loader from '../Loader';

const Home = () => {

    const [topNews, setTopNews] = useState([]);
    const [categoryNews, setCategoryNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiKey = process.env.REACT_APP_API_KEY;

    let topNewsUrl = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&language=en&limit=4`;
    let categoryNewsUrl = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&language=en&categories=general&limit=3`;

    const requestOne = axios.get(topNewsUrl);
    const requestTwo = axios.get(categoryNewsUrl);

    useEffect(() => {
        axios.all([requestOne, requestTwo])
            .then(axios.spread((...responses) => {
                const responseOne = responses[0];
                const responseTwo = responses[1];
                setTopNews(responseOne.data.data);
                setCategoryNews(responseTwo.data.data);
                setLoading(false);
            }))
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const splitDate = (item) => {
        const date = topNews[item].published_at.split("T");
        const split = date[0].split("-");
        const dateFormat = `${split[2]}/${split[1]}/${split[0]}`;
        return dateFormat;
    };

    const category = (item) => {
        if (topNews[item].categories[0] === undefined) {
            return "All";
        } else {
            const category = topNews[item].categories[0][0].toUpperCase() + topNews[item].categories[0].substring(1);
            return category;
        }
    };

    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <section className='top-news-container'>
                            <div className='top-news-left'>
                                <div className='top-news-item-1'>
                                    <div className='container'>
                                        <img src={topNews[0].image_url === "" ? noImage : topNews[0].image_url} alt={topNews[0].title} />
                                        <div className='title'>
                                            <h3><a href={topNews[0].url} rel="noreferrer" target="_blank">{topNews[0].title}</a></h3>
                                            <p>{category(0)} - {splitDate(0)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='top-news-right'>
                                <div className='top-news-item-2'>
                                    <div className='container'>
                                        <img src={topNews[1].image_url === "" ? noImage : topNews[1].image_url} alt={topNews[1].title} />
                                        <div className='title'>
                                            <h3><a href={topNews[1].url} rel="noreferrer" target="_blank">{topNews[1].title}</a></h3>
                                            <p>{category(1)} - {splitDate(1)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='top-news-right-flex'>
                                    <div className='top-news-item-3'>
                                        <div className='container'>
                                            <img src={topNews[2].image_url === "" ? noImage : topNews[2].image_url} alt={topNews[2].title} />
                                            <div className='title'>
                                                <h3><a href={topNews[2].url} rel="noreferrer" target="_blank">{topNews[2].title}</a></h3>
                                                <p>{category(2)} - {splitDate(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='top-news-item-4'>
                                        <div className='container'>
                                            <img src={topNews[3].image_url === "" ? noImage : topNews[3].image_url} alt={topNews[3].title} />
                                            <div className='title'>
                                                <h3><a href={topNews[3].url} rel="noreferrer" target="_blank">{topNews[3].title}</a></h3>
                                                <p>{category(3)} - {splitDate(3)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Category categoryNews={categoryNews} />
                    </>
            }
        </>
    );
};

export default Home;