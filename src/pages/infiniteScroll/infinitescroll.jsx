import React from 'react';
import { useEffect, useState } from 'react';

export default function Infinitescroll() {

    const [listMeme, listMemeSet] = useState([]);
    const [limit, limitSet] = useState(20);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => listMemeSet(data.data.memes))
            .catch(error => console.error('Error fetching data:', error));
    }, []) 

    useEffect(() => {
        console.log(listMeme, "check");
    }, [listMeme]);

    useEffect(() => {
        const handlescroll = () => {
            console.log(window.innerHeight, window.scrollY, document.body.scrollHeight);
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
                limitSet(prev => prev + 20)
            }
        }
        window.addEventListener('scroll', handlescroll);
        console.log(window.innerHeight, window.scrollY);
    },);



    return (
        <div >
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {listMeme.slice(0, limit).map((meme) => {
                    return <div style={{ height: "350px", width: "150px", margin: '40px', border: "1px solid black" }}>
                        <img src={meme.url} style={{ width: '150px', height: '250px' }} />
                        <p>{meme.name}</p>
                    </div>
                }
                )}
            </div>
        </div >
    )
}
