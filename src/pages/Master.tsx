import {Link} from "react-router-dom";

const Master = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ProdeXa</h1>
            <p className="text-lg mb-8 text-gray-600">
                Your advanced productivity dashboard for tasks and projects.
            </p>
            <Link
                to="/tasks"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Get Started with Tasks
            </Link>
        </div>
    );
};

export default Master;