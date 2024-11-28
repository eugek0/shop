import { ShowPropertyProps } from 'adminjs';
import React from 'react';

const MyPreview: React.FC<ShowPropertyProps> = (props) => {
  const pattern = props.property.props.pattern || 'images.0';
  const regex = new RegExp(pattern);
  const imageKey = Object.keys(props.record.params).find((key) =>
    regex.test(key),
  );
  const imageName = props.record.params[imageKey];
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

export default MyPreview;
