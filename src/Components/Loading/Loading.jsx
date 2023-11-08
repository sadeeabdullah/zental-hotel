
import 'react-loading-skeleton/dist/skeleton.css'


const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
           <span className="loading loading-bars loading-lg"></span>
        </div>
    );
};

export default Loading;