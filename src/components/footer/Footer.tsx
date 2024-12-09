import { FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 bg-yellow p-6 fixed bottom-0 left-0 w-full">
      <div className="flex justify-center gap-8">
        <a href="https://instagram.com">
          <FaInstagram size={40} />
        </a>
        <a href="https://facebook.com">
          <FaFacebook size={40} />
        </a>
        <a href="https://twitter.com">
          <FaXTwitter size={40} />
        </a>
      </div>
      <div>Copyright ©2024 LightHobby</div>
    </footer>
  );
};

export default Footer;
