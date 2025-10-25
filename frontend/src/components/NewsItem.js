import React from 'react';

const NewsItem = ({ title, summary, sentiment }) => {
    const backgroundColor = sentiment === 'bearish' ? 'red' : 'green';

    return (
        <div style={{ backgroundColor, padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h2>{title}</h2>
            <p>{summary}</p>
        </div>
    );
};

export default NewsItem;