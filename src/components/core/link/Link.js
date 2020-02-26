import React from 'react';

import './link.scss';

const Link = ({ text, href, className }) => (
	<a className={className} href={href}>{text}</a>
);

export default Link;