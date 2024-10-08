import React, { useState } from 'react';
import axios from 'axios';

function PromptTextComponent() {
  const [prompt, setPrompt] = useState('');
  const [maxWords, setMaxWords] = useState(100); // Default max words
  const [genre, setGenre] = useState('drama'); // Default genre
  const [displayText, setDisplayText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isUpvoted, setIsUpvoted] = useState(false); // Upvote state

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleMaxWordsChange = (e) => {
    setMaxWords(parseInt(e.target.value, 10));
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const generateText = async (e) => {
    setIsUpvoted(false);
    e.preventDefault();
    if (prompt.length === 0) return;
    setIsLoading(true);

    setDisplayText("Loading your text... \n It might take up to 10 seconds");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_OPENAI_API_KEY}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Write a ${genre} story about "${prompt}" with a maximum of ${maxWords} words.`
                }
              ]
            }
          ],
        },
      });

      setDisplayText(
        response.data.candidates[0].content.parts[0].text
      );
    } catch (error) {
      console.error(error);
      setDisplayText("Sorry - Something went wrong. Please try again!");
    }

    setIsLoading(false);
  };



  const download = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My AI Generated Story',
          text: 'Check out this cool content!',
          url: `- | Genre : ${genre} | Content: ${prompt + ' ' + displayText}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      console.log('Web Share API is not supported in this browser.');
    }
  };

  return (
    <section className="bg-gray-900 p-5 sm:p-20 items-center">
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-700 font-semibold">Enter a Prompt:</h2>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            placeholder="Enter your prompt here..."
            required
            value={prompt}
            onChange={handleInputChange}
          />
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2">
              <label htmlFor="maxWords" className="text-gray-700 font-semibold">
                Max Words:
              </label>
              <input
                type="number"
                id="maxWords"
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                placeholder="Max Words"
                value={maxWords}
                onChange={handleMaxWordsChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label htmlFor="genre" className="text-gray-700 font-semibold">
                Genre:
              </label>
              <select
                id="genre"
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                value={genre}
                onChange={handleGenreChange}
              >
                <option value="funny">Funny</option>
                <option value="horror">Horror</option>
                <option value="thriller">Thriller</option>
                <option value="drama">Drama</option>
                <option value="poetry">Poetry</option>
                <option value="fantasy">Fantasy</option>
                <option value="mystery">Mystery</option>
                <option value="sci-fi">Sci-Fi</option>
                {/* Add more genre options here */}
              </select>
            </div>
          </div>
          <button
            className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${isLoading ? 'cursor-not-allowed' : ''
              }`}
            onClick={generateText}
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? 'In Progress...' : 'Generate Text'}
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Generated Text:</h3>
            <p
              className="text-xl text-gray-700 break-words"
              style={{ maxWidth: '100%' }}
            >
              {displayText}
            </p>
          </div>
          {displayText && !isLoading && (
            <div className="mt-4">
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                onClick={handleShare}
              >
                Share
              </button>
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                onClick={download}
              >
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PromptTextComponent;
