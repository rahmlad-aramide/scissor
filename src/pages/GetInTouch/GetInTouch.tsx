import React from 'react';
const GetInTouch = () => {
  const firstImageUrl = '/path/to/first-image.png';
  const secondImageUrl = '/path/to/second-image.png';

  const containerStyles = {
    backgroundBlendMode: 'multiply',
    backgroundImage: `url(${firstImageUrl}), url(${secondImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };
  return (
    <section style={containerStyles} className="min-h-screen">
      <div className="bg-cover min-h-screen">Testing Bg</div>
    </section>
  );
};
export default GetInTouch;
