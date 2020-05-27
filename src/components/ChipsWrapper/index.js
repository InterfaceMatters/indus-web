import React from 'react';
import { Chip } from '@material-ui/core';
import { marginGenerator } from '../../theme/utils';

const ChipsWrapper = ({ tags, len = 1, width }) => {
  const listLength = tags.length;
  const tagArr = tags.slice(0, len);
  return (
    <div
      style={{
        flex: width,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row'
      }}>
      {tagArr.map((chip, index) => (
        <Chip
          style={marginGenerator(['mr-8'])}
          key={`${index}-${new Date().getTime()}`}
          label={chip}
        />
      ))}
      {listLength > len && (
        <Chip
          key={`additional-${new Date().getTime()}`}
          label={`+${listLength - len}`}
        />
      )}
    </div>
  );
};

export default ChipsWrapper;
