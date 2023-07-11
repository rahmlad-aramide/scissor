import {
  FAQs,
  Features,
  Hero,
  Pricing,
  WhyScissor,
  TrimForm,
  Revolutionize,
  Footer,
} from '../../components';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <WhyScissor />
      <Pricing />
      <TrimForm />
      <FAQs />
      <Revolutionize />
      <Footer />
    </>
  );
};
export default Home;
