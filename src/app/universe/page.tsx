import dynamic from 'next/dynamic';

// Disable SSR for the Universe component
const Universe = dynamic(() => import('./Universe'), { ssr: false });

const UniversePage = () => {
	return <Universe />;
};

export default UniversePage;
