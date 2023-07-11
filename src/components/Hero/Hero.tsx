import { Button } from '..';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import underline from '../../assets/images/underline.png';
import chainLink from '../../assets/images/linked-chain.png';
import singleLink from '../../assets/images/link-single.png';
import blueArrow from '../../assets/images/blue-arrow.svg';
import cone from '../../assets/images/curved-cone.png';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext/UserContext';

const Hero = () => {
  const { user } = useContext(UserContext);
  return (
    <section id="url" className="bg-hero-texture bg-cover bg-bottom pt-16">
      <div className="flex text-3xl md:text-5xl text-center font-bold leading-[50px] md:leading-[96px] max-w-[31ch] mx-auto mt-16">
        Optimize Your Online Experience with Our
      </div>
      <div className="text-3xl md:text-5xl text-center font-bold leading-[50px] md:leading-[96px] max-w-[26ch] mx-auto">
        Advanced
        <span className="text-primary relative">
          {'  '}
          URL Shortening{' '}
          <img
            src={underline}
            alt="-"
            className="absolute -bottom-4 right-3 md:right-24"
          />{' '}
        </span>{' '}
        Solution
      </div>
      <div className="flex mt-4">
        <div className="text-lg font-medium text-center w-[90%] max-w-[63ch] mx-auto">
          Personalize your shortened URLs to align with your brand identity.
          Utilize custom slugs, branded links, and domain customization options
          to reinforce your brand presence and enhance user engagement.
        </div>
      </div>
      <div className="flex mt-8 mb-20">
        {user ? (
          <Link to="/dashboard" className="mx-auto">
            <Button buttonWidth={'fit'}>Go to dashboard</Button>
          </Link>
        ) : (
          <div className="mx-auto flex items-center">
            <Link to="/sign-up">
              <Button buttonWidth={'fit'}>Sign Up</Button>
            </Link>
            <HashLink
              to="/#features"
              smooth
              className="text-[#0065FE] font-semibold ml-4 md:ml-14"
            >
              Learn More
            </HashLink>
          </div>
        )}
      </div>
      <div className="flex mb-10 md:mb-16 mt-10">
        <div className="relative mx-auto w-fit backdrop-blur-[106px] rounded-3xl">
          <div className="absolute -left-32 -top-4">
            <img src={cone} alt="cone" />
          </div>
          <div className="bg-[#fefefe]/40 backdrop-blur-lg-[106px] rounded-3xl">
            <div className="bg-[#fefefe]/10 backdrop-blur-[106px] rounded-3xl border-[0.5px] border-primary w-[90%] mx-auto">
              <div className="flex items-center mx-16 mt-8">
                <div>
                  <img src={chainLink} alt="chain link" />
                </div>
                <div className="mx-[23px]">
                  <img src={blueArrow} alt="arror" />
                </div>
                <div>
                  <img src={singleLink} alt="single link" />
                </div>
              </div>
              <div className="text-center mx-auto max-w-[36ch] font-medium mb-10">
                Seamlessly transform your long URLs into{' '}
                <span className="font-semibold">concise</span> and{' '}
                <span className="font-semibold">shareable links</span> with just
                few clicks.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-12 md:h-24 w-full bg-hero-pattern bg-bottom bg-cover"></div>
    </section>
  );
};
export default Hero;
