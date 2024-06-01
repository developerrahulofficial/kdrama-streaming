import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Carousel from '../components/Carousel/Carousel';
import Image from 'next/image';
import axios from 'axios';

// Import pictures we want to use
import card1 from '../public/1.jpg';
import card2 from '../public/2.jpeg';
import card3 from '../public/3 (1).jpeg';
import card4 from '../public/4.jpeg';
import card5 from '../public/5.jpg';
import card6 from '../public/6.jpg';

// Define the Episode interface
interface Episode {
  video: string;
  subtitle?: string;
  duration?: string;
}

// This is the main part of our app
const Home: NextPage = () => {
  // State variables to keep track of different things
  const [episodes, setEpisodes] = useState<Episode[]>([]); // List of episodes
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null); // Currently selected episode
  const [selectedTitle, setSelectedTitle] = useState<string>('It_s_Okay_to_Not_Be_Okay'); // Currently selected title
  const [showVideo, setShowVideo] = useState(false); // Whether to show the video or not
  const [message, setMessage] = useState<string>('Hey there! 😊 Welcome to our little world of memories and magic. ✨🎬 Feel free to dive into the nostalgia! 🌟💖'); // Welcome message
  const [currentSeriesTitle, setCurrentSeriesTitle] = useState<string>(''); // Current series title

  useEffect(() => {
    // Function to fetch episodes from the server
    const fetchEpisodes = async () => {
      const response = await fetch(`/api/episodes?title=${selectedTitle}`);
      const data: Episode[] = await response.json();
      setEpisodes(data);
    };
    fetchEpisodes();

    // List of welcome messages to choose from
    const messages = [
      "Hey there! 😊 Welcome to our little world of memories and magic. ✨🎬💖",
      "Hello, cutie! 🌸 Let's make today another beautiful memory together! 🎥✨",
      "Hi, sweetie! 🌈 Ready to embark on a magical journey down memory lane? 🚀💕",
      "Hey, sunshine!☀️ let's create some unforgettable moments together! 🌺💫",
      "Hey, darling! 🌼 Let's dance through time and relive our favorite memories! 💃🎶",
    ];
    // Pick a random message from the list
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, [selectedTitle]);

  useEffect(() => {
    // Function to fetch the current series title from the server
    const fetchSeriesTitle = async () => {
      const response = await fetch(`/api/series/${selectedTitle}`);
      const data = await response.json();
      setCurrentSeriesTitle(data.title);
    };
    fetchSeriesTitle();
  }, [selectedTitle]);

  const handleImageClick = (title: string) => {
    setSelectedEpisode(0); // Select the first episode
    setSelectedTitle(title); // Set the new title
    setShowVideo(true); // Show the video player
  };

  const handleEpisodeClick = (index: number) => {
    setSelectedEpisode(index); // Set the selected episode
  };

  const imagesItems = [
    <Image src={card1} alt="Parasyte The Grey" className="w-full h-full" onClick={() => handleImageClick('Parasyte__The_Grey')} />,
    <Image src={card2} alt="The Glory" className="w-full h-full" onClick={() => handleImageClick('The_Glory')} />,
    <Image src={card3} alt="A Business Proposal" className="w-full h-full" onClick={() => handleImageClick('A_Business_Proposal')} />,
    <Image src={card4} alt="It's Okay to Not Be Okay" className="w-full h-full" onClick={() => handleImageClick('It_s_Okay_to_Not_Be_Okay')} />,
    <Image src={card5} alt="It's Okay to Not Be Okay" className="w-full h-full" onClick={() => handleImageClick('It_s_Okay_to_Not_Be_Okay')} />,
    <Image src={card6} alt="It's Okay to Not Be Okay" className="w-full h-full" onClick={() => handleImageClick('It_s_Okay_to_Not_Be_Okay')} />,
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-bg text-white">
      <Head>
        <title>JuhiFlix</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header className="fixed top-0 w-full z-20" />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 pt-20 text-center">
        {!showVideo && (
          <div className="mb-10 flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold md:text-5xl">{message}</h1>
            <p className="text-center text-xs opacity-75">🌟 Welcome to Our Magical World! 🌟</p>
          </div>
        )}
        {showVideo && selectedEpisode !== null && episodes.length > 0 ? (
          <div className="video-section flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">{currentSeriesTitle}</h2>
            <div className="video-container rounded-lg overflow-hidden">
              <video key={episodes[selectedEpisode].video} controls className="w-full h-auto">
                <source src={episodes[selectedEpisode].video} type="video/mp4" />
                {episodes[selectedEpisode].subtitle && (
                  <track src={episodes[selectedEpisode].subtitle} kind="subtitles" srcLang="en" label="English" default />
                )}
              </video>
            </div>
            <div className="episodes-list-container mt-4 w-full max-w-md overflow-y-auto">
              <div className="episodes-list">
                {episodes.map((episode, index) => (
                  <div key={index} className={`episode-item bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded mb-4 flex items-center justify-between cursor-pointer ${selectedEpisode === index ? 'bg-opacity-90' : 'hover:bg-opacity-80'}`} onClick={() => handleEpisodeClick(index)}>
                    <div className="flex items-center">
                      <img src="/play-button.png" alt={`Play ${currentSeriesTitle}`} className="w-6 h-6 mr-2" />
                      <span className="text-white font-semibold">Episode {index + 1}</span>
                    </div>
                    <div className="text-xs text-white opacity-75">{episode.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Carousel items={imagesItems} />
        )}
      </main>
      <style jsx>{`
        .video-section {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 800px;
          padding-top: 90px; /* Adjust as needed */
        }
        .video-container {
          width: 100%;
          max-width: 800px;
          aspect-ratio: 16/9;
          background-color: black;
          transition: all 0.5s ease-in-out;
        }
        .episodes-list-container {
          width: 100%;
          max-width: 800px; /* Adjust as needed */
          height: 200px; /* Set a fixed height for the container */
          overflow-y: auto;
          margin-top: 20px;
        }
        .episodes-list {
          /* No specific styling required here */
        }
        .episode-item {
          border-radius: 12px;
        }
        /* For webkit-based browsers */
        .episodes-list-container::-webkit-scrollbar {
          display: none; /* Hide the scrollbar */
        }
        /* For Firefox */
        .episodes-list-container {
          scrollbar-width: none; /* Hide the scrollbar */
        }
        /* For IE, Edge */
        .episodes-list-container {
          -ms-overflow-style: none; /* Hide the scrollbar */
        }
      `}</style>
    </div>
  );
};

export default Home;
