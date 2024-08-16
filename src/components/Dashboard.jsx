import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [likedStories, setLikedStories] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (id) => {
    if (id === activeAccordion) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(id);
    }
  };

  const removeFromUpvoted = (storyId) => {
    axios
      .post('', { storyId })
      .then(() => {
        setLikedStories((prevStories) =>
          prevStories.filter((story) => story.id !== storyId)
        );
      })
      .catch((error) => {
        console.error('Error removing story:', error);
      });
  };

  // useEffect(() => {
  //   axios
  //     .get('')
  //     .then((response) => {
  //       setLikedStories(response.data);
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <section className='bg-gray-900 p-5 sm:p-20 items-center relative'>
      <div className="p-8 container">
        <h3 className="text-xl  text-white mb-4">Currently in Development</h3>
      </div>
    </section>
  );
};

export default Dashboard;
