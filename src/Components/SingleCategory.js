import React, { useEffect, useState } from 'react';
import noImage from '../img/no_image.jpg'
import axios from 'axios';
import Loader from './Loader';

const SingleCategory = ({ title, categoryUrl }) => {

    const [news, setNews] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [loading, setLoading] = useState(false);

    const splitDate = (item) => {
        const date = news[item].published_at.split("T");
        const split = date[0].split("-");
        const dateFormat = `${split[2]}/${split[1]}/${split[0]}`;
        return dateFormat;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (searchTitle === "" && searchDate === "") {
            alert("Please, fill out at least one field!");
            setLoading(false);
            return false;
        }
        if (searchTitle !== "" && searchDate !== "") {
            axios.get(`${categoryUrl}&search=${searchTitle}&published_on=${searchDate}`)
                .then((response) => {
                    setNews(response.data.data);
                    setSearchTitle("");
                    setSearchDate("");
                    setLoading(false);
                })
        } else if (searchTitle !== "" && searchDate === "") {
            axios.get(`${categoryUrl}&search=${searchTitle}`)
                .then((response) => {
                    setNews(response.data.data);
                    setSearchTitle("");
                    setLoading(false);
                })
        } else if (searchTitle === "" && searchDate !== "") {
            axios.get(`${categoryUrl}&published_on=${searchDate}`)
                .then((response) => {
                    setNews(response.data.data);
                    setSearchDate("");
                    setLoading(false);
                })
        }
    };

    useEffect(() => {
        setLoading(true);
        axios.get(categoryUrl)
            .then((response) => {
                setNews(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <section>
            <div className='category-title'>
                <h2>{title}</h2>
            </div>
            <div className='category-underline'></div>
            <div className='search'>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}></input>
                    <input type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}></input>
                    <button type='submit' className='search-btn'><i className="fa fa-search"></i></button>
                </form>
            </div>
            {
                loading ? <Loader /> :
                    news.length === 0 ? <div className='empty'>
                        <h3>No results found!</h3>
                    </div> :
                        news.map((item, index) => {
                            return <div className='single-category-news' key={item.uuid}>
                                <div>
                                    <div className='single-category-img'>
                                        <img src={item.image_url === "" ? noImage : item.image_url} alt={item.title} />
                                    </div>
                                    <div className='single-category-title'>
                                        <h3><a href={item.url} rel="noreferrer" target="_blank">{item.title}</a></h3>
                                        <p>{splitDate(index)}</p>
                                    </div>
                                </div>
                            </div>
                        })
            }
        </section>
    )
};

export default SingleCategory;