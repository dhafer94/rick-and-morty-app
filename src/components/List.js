import React from 'react';
import Row from './Row';


const List = ({ characters }) => {
    return (
        <div className="list-group">
            {characters.map((character, i) => {
                return <Row img={characters[i].image} key={i} id={characters[i].id} name={characters[i].name} status={characters[i].status} />;
            }
            )}
        </div>
    );
};

export default List;
