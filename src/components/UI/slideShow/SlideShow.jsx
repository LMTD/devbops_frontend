import React from 'react';
import Carousel from 'react-elastic-carousel';

const SlideShow = () => {
	return (
		<Carousel itemsToShow={4} pagination={false} style={{ margin: '10px 0' }}>
			<div>this is one</div>
			<div>this is one1</div>
			<div>this is one2</div>
			<div>this is one3</div>
			<div>this is one4</div>
			<div>this is one5</div>
		</Carousel>
	);
};

export default SlideShow;
