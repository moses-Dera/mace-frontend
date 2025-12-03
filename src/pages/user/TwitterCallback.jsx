import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

const TwitterCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Processing...');
    const [error, setError] = useState('');

    useEffect(() => {
        const handleCallback = async () => {
            // OAuth 1.0a uses oauth_token and oauth_verifier
            const oauth_token = searchParams.get('oauth_token');
            const oauth_verifier = searchParams.get('oauth_verifier');
            const denied = searchParams.get('denied');

            if (denied) {
                setError('Authorization denied by user.');
                return;
            }

            if (!oauth_token || !oauth_verifier) {
                setError('Missing oauth_token or oauth_verifier parameters.');
                return;
            }

            try {
                setStatus('Connecting your Twitter account...');
                await api.post('/social/callback/twitter', { oauth_token, oauth_verifier });
                setStatus('Success! Redirecting...');
                setTimeout(() => navigate('/connect'), 1500);
            } catch (err) {
                console.error('Callback error:', err);
                setError(err.response?.data?.error || 'Failed to connect Twitter account.');
            }
        };

        handleCallback();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                {error ? (
                    <div className="text-red-600 mb-4">
                        <h3 className="text-lg font-bold mb-2">Connection Failed</h3>
                        <p>{error}</p>
                        <button
                            onClick={() => navigate('/connect')}
                            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Back to Connect
                        </button>
                    </div>
                ) : (
                    <div className="text-gray-800">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                        <h3 className="text-lg font-medium">{status}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TwitterCallback;
