import React from 'react';
import { useState, useEffect } from 'react';


const data = [
  {
    username: "Akshay Saini",
    comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
    replies: [
      {
        username: "Deepika Padukone",
        comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
      },
    ],
  },
  {
    username: "Elon Musk",
    comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
    replies: [
      {
        username: "Deepika Padukone",
        comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
        replies: [
          {
            username: "Deepika Padukone",
            comment:
              "Lorem ipsum dolor sit amet consectetur adip occurence velit",
            replies: [
              {
                username: "Deepika Padukone",
                comment:
                  "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                replies: [
                  {
                    username: "Deepika Padukone",
                    comment:
                      "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                    replies: [
                      {
                        username: "Deepika Padukone",
                        comment:
                          "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                        replies: [
                          {
                            username: "Deepika Padukone",
                            comment:
                              "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            username: "Deepika Padukone",
            comment:
              "Lorem ipsum dolor sit amet consectetur adip occurence velit",
          },
        ],
      },
      {
        username: "Deepika Padukone",
        comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
      },
    ],
  },
  {
    username: "Sachin Tendulkar",
    comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
  },
];

const CommentBox = ({ data }) => {
  return data.map((comment, index) => (
    <div
      key={index}
      style={{  
        paddingLeft: '2.5rem', // ~pl-10
        borderLeft: '2px solid #ccc',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}
    >
      <div style={{ display: 'flex', }}>
        <img
          src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
          alt="user"
          style={{
            width: '40px', // ~w-10
            height: '40px',
            borderRadius: '9999px',
            marginRight: '0.5rem',
          }}
        />
        <div>
          <p
            style={{
              fontWeight: '600', // ~font-semibold
              margin: 0,
              paddingBottom: '0.25rem',
            }}
          >
            {comment.username}
          </p>
          <p style={{ margin: 0 }}>{comment.comment}</p>
        </div>
      </div>

      {/* Recursive replies */}
      {comment?.replies?.length > 0 && (
        <CommentBox data={comment.replies} />
      )}
    </div>
  ));
};





export default function NestedComments() {
  return (
    <div>
      <CommentBox data={data} />
    </div>
  );
}


