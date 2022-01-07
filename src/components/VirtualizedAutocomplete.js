import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { List } from "react-virtualized";

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, role, ...other } = props;
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = 36;

  return (
    <div ref={ref}>
      <div {...other}>
        <List
          height={250}
          width={300}
          rowHeight={itemSize}
          overscanCount={5}
          rowCount={itemCount}
          rowRenderer={props => {
            return React.cloneElement(children[props.index], {
              style: props.style
            });
          }}
          role={role}
        />
      </div>
    </div>
  );
});


export default function VirtualizedAutocomplete({ options, defaultProps, width }) {
  return (
    <Autocomplete
      {...defaultProps}
      id='auto-highlight'
      style={{ width }}
      autoHighlight
      selectOnFocus
      ListboxComponent={ListboxComponent}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label='Choose a character'
          fullWidth

        />
      )}
    />
  );
}