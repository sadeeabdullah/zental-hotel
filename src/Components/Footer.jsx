import { GrFacebook, GrTwitter, GrLinkedin } from 'react-icons/gr';
import Container from './Container';
const Footer = () => {
  return (
    <Container>
      <div className="flex justify-between gap-10">
        <div>
          <h1 className=" mb-2">
            <img src="src/assets/image/logo-20230222101241.svg" alt="" />
          </h1>
          <p className="max-w-[35ch] font-medium">
          Discover tranquility and comfort with ZenHotel, your gateway to serenity. Unwind in our meticulously designed rooms and book your perfect stay today. Immerse yourself in the art of relaxation with ZenHotel – Where Peace Meets Luxury.
          </p>
          <div className="flex gap-5 text-3xl text-[#f16f6e] mt-10">
            <GrFacebook className="cursor-pointer text-gradient-to-tr from-[rgb(231,159,159)] to-[rgb(238,123,123)]" />
            <GrLinkedin className="cursor-pointer" />
            <GrTwitter className="cursor-pointer" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-xl font-bold mb-2">Navigations</h1>
          <div className="flex items-center gap-2">
            <div className="bg-[#08476b] w-4 h-4 rounded-full grid place-content-center">
              <div className="bg-white w-2 h-2 rounded-full"></div>
            </div>
            <p className="cursor-pointer hover:underline font-medium">FAQs</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#08476b] w-4 h-4 rounded-full grid place-content-center">
              <div className="bg-white w-2 h-2 rounded-full"></div>
            </div>
            <p className="cursor-pointer hover:underline font-medium">
              Privacy Policy
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#08476b] w-4 h-4 rounded-full grid place-content-center">
              <div className="bg-white w-2 h-2 rounded-full"></div>
            </div>
            <p className="cursor-pointer hover:underline font-medium">
              Terms & Conditions
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-xl font-bold mb-2">Company</h1>
          <div className="flex items-center gap-2">
            <div className="bg-[#08476b] w-4 h-4 rounded-full grid place-content-center">
              <div className="bg-white w-2 h-2 rounded-full"></div>
            </div>
            <p className="cursor-pointer hover:underline font-medium">About</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#08476b] w-4 h-4 rounded-full grid place-content-center">
              <div className="bg-white w-2 h-2 rounded-full"></div>
            </div>
            <p className="cursor-pointer hover:underline font-medium">Team</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#08476b] w-4 h-4 rounded-full grid place-content-center">
              <div className="bg-white w-2 h-2 rounded-full"></div>
            </div>
            <p className="cursor-pointer hover:underline font-medium">
              Contact
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-xl font-bold mb-2">Contact Information</h1>
          <p className="font-medium">Mohakhali, Dhaka 1212.</p>
          <p className="font-medium">+019 123 456 78</p>
          <p className="font-medium">info@zenhotel.com</p>
        </div>
      </div>
      <div className="divider"></div>
      <p className="mt-6 mb-10">
        Copyright © 2023 Zenhotel. | Powered by Zenhotel.
      </p>
    </Container>
  );
};

export default Footer;
