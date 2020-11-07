const prod = {
	urls: {
		USER_URL:
			'https://0c77865x10.execute-api.us-east-1.amazonaws.com/prod/user',
		EVENT_URL:
			'https://0c77865x10.execute-api.us-east-1.amazonaws.com/prod/event',
		BLOG_URL:
			'https://0c77865x10.execute-api.us-east-1.amazonaws.com/prod/blog',
	},
};

const dev = {
	urls: {
		USER_URL: 'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/user',
		EVENT_URL:
			'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/event',
		BLOG_URL: 'https://0c77865x10.execute-api.us-east-1.amazonaws.com/v1/blog',
	},
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
