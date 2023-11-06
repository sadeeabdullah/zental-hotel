import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


const Loading = () => {
    return (
        <div>
            <SkeletonTheme baseColor="#f77570" highlightColor="#08476b" width="89vw" borderRadius="20px"  >
            <Skeleton className="h-[30vh] w-[50vw] mx-auto mt-4 " count={3}/>
            </SkeletonTheme>
        </div>
    );
};

export default Loading;