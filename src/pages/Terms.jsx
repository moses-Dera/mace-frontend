import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Terms of Service
                </h2>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <p className="text-gray-600 mb-4">
                        This is a placeholder Terms of Service for development purposes.
                    </p>
                    <p className="text-gray-600 mb-6">
                        When moving to production, replace this content with your actual terms of service.
                    </p>
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Terms;
