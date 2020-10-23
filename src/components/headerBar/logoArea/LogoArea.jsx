import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/devBopsLogo.png';

const LogoArea = () => {
	return (
		<div data-test='logoComponent' style={{ flexGrow: 1 }}>
			<Link to='/'>
				<img
					data-test='logoImage'
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
