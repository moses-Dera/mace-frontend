import React from 'react';
import { Link } from 'react-router-dom';

const DataDeletion = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Data Deletion Instructions
                </h2>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <p className="text-gray-600 mb-4">
                        According to Facebook Platform rules, we must provide a User Data Deletion Callback URL or Data Deletion Instructions URL.
                    </p>
                    <p className="text-gray-600 mb-4">
                        If you wish to delete your data from our platform, you can remove your activities by following these instructions:
                    </p>
                    <ol className="list-decimal list-inside text-gray-600 mb-6 space-y-2">
                        <li>Go to your Facebook Account's "Settings & Privacy".</li>
                        <li>Click "Settings".</li>
                        <li>Look for "Apps and Websites" and you will see all of the apps and websites you linked with your Facebook.</li>
                        <li>Search and Click "MACE" (or your app name) in the search bar.</li>
                        <li>Scroll and click "Remove".</li>
                        <li>Congratulations, you have successfully removed your app activities.</li>
                    </ol>
                    <div className="border-t pt-4">
                        <p className="text-gray-600 mb-2">
                            Alternatively, you can contact us directly to request data deletion:
                        </p>
                        <a href="mailto:support@example.com" className="text-indigo-600 hover:text-indigo-500 block mb-6">
                            support@example.com
                        </a>
                    </div>
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DataDeletion;
