import React from 'react';
import { List } from 'react-virtualized';

const ListboxComponent = React.forwardRef(function ListboxComponent(
    props,
    ref,
) {
    const { children, role, ...other } = props;
    const itemCount = Array.isArray(children) ? children.length : 0;
    const itemSize = 36;

    return (
        <div ref={ref}>
            <div {...other}>
                <List

                    height={250}
                    width={800}
                    rowHeight={itemSize}
                    overscanCount={5}
                    rowCount={itemCount}
                    // key={props.key}
                    rowRenderer={(props) => {
                        return React.cloneElement(children[props.index], {
                            style: props.style,
                        });
                    }}
                    role={role}
                />
            </div>
        </div>
    );
});


export default ListboxComponent;