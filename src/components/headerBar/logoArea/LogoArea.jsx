import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/devBopsLogo.png';

const LogoArea = (props) => {
	return (
		<div data-test='logo-component' style={{ flexGrow: 1 }}>
			<Link to="/">
				<img
					data-test='logo-image'
					src={logo}
					alt='Baskit Logo'
					style={{
						width: '80px',
						// borderRadius: '80%',
					}}
				/>
			</Link>
		</div>
	);
};

export default LogoArea;
