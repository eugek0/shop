import { ShowPropertyProps } from 'adminjs';
import React from 'react';

const MyNavigationImage: React.FC<ShowPropertyProps> = (props) => {
  const imageName = props.record.params.image;
  const baseUrl = props.property.props.baseUrl;

  return (
    <div
      style={{ height: '100px', width: '100px', backgroundColor: '#F2F2F2' }}
    >
      <img
        src={`${baseUrl}${imageName}`}
        style={{ height: '100px', width: '100px', objectFit: 'contain' }}
      />
    </div>
  );
};

export default MyNavigationImage;
