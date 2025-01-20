import React from 'react';

export type ISvgProps = {
	width?: string;
	height?: string;
	fill?: string;
	borderColor?: string;
	style?: React.CSSProperties;
};

export const SolidCircle: React.FunctionComponent<ISvgProps> = properties => (
	<svg
		height='100%'
		width='100%'
		version='1.1'
		xmlns='http://www.w3.org/2000/svg'
	>
		<circle
			cx='50'
			cy='50'
			r='45'
			stroke={properties.borderColor ?? 'black'}
			strokeWidth='5'
			fill={properties.fill ?? 'black'}
		/>
            Sorry, your browser does not support inline SVG.
	</svg>
);
