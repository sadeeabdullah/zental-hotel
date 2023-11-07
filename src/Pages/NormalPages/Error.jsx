

const Error = () => {
    return (
        <div className="text-center p-8 bg-white rounded shadow-lg h-screen">
    <img src="src/assets/image/404-error.png" alt="404 Error" className="mx-auto w-32"/>
    <h1 className="text-4xl text-red-600 mt-4">404 - Page Not Found</h1>
    <p className="text-gray-700 mt-4">Oops! The page you are looking for might have been removed or is temporarily unavailable.</p>
    <a href="/" className="text-blue-500 mt-4 block hover:underline">Go back to the home page</a>
  </div>
    );
};

export default Error;