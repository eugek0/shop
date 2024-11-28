import { ShowPropertyProps } from "adminjs";
import React from 'react';

const MyImage: React.FC<ShowPropertyProps> = (props) => {
    const regex = new RegExp(/images.\d/)
    const imageKeys = Object.keys(props.record.params).filter(key => regex.test(key))
    const imageNames = imageKeys.map(key => props.record.params[key])
    const baseUrl = props.property.props.baseUrl

    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
            { imageNames.map((name) => (
                <div style={{ height: '100px', width: '100px', backgroundColor: '#F2F2F2' }}>
                    <img src={`${baseUrl}${name}`} style={{ height: '100px', width: '100px' }}/>
                </div>
            )) }
        </div>
    )
}

export default MyImage;
