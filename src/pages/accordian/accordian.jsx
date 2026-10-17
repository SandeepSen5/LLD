import React from 'react';
import { useState, useEffect } from 'react';

const data = [
    {
        title: "key1 ",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        title: "key2 ",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        title: "key3 ",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }
];

export default function Accordian() {
    let [open, openSet] = useState(null);

    const handleOpen = (index) => {
        if (open == index) {
            openSet(null)
        } else {
            openSet(index)
        }
    }

    return (
        <div>
            {data.map((item, index) => {
                return <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: "25px", backgroundColor: "whitesmoke", marginBottom: '10px' }}>
                        <span>{item.title}</span>
                        <span style={{ cursor: ' pointer ' }} onClick={() => handleOpen(index)}> {open == index ? '⬆️' : '⬇️'}</span>
                    </div>
                    {open == index &&
                        <>
                            <div style={{ marginBottom: "20px" }}>
                                {item.desc}
                            </div>
                        </>
                    }
                </>
            })}
        </div>
    )
}
