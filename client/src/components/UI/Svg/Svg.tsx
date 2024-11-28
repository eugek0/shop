import React, {SVGProps} from 'react';

import {svgMap} from './svgStorage'

interface SvgProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof svgMap;
}

const Svg: React.FC<SvgProps> = ({ name, ...props }) => {
  const svg = svgMap[name];
  if (!svg) return null;
  return React.cloneElement(svg, props);
};

export default Svg;