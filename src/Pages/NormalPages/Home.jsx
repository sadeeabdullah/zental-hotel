import Blankc from "../../Components/BlankComponent/Blankc";
import Map from "../../Components/Forhome/Map";
import Newsletter from "../../Components/Forhome/Newsletter";
import SpecialOffer from "../../Components/Forhome/SpecialOffer";
import StunningVideo from "../../Components/Forhome/StunningVideo";


const Home = () => {
    return (
        <div>
            <Blankc></Blankc>
            <StunningVideo/>
            <SpecialOffer/>
            <Newsletter/>
            <Map/>
        </div>
    );
};

export default Home;