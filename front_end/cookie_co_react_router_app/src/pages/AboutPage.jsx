import React, { useState, useEffect } from 'react';
import { generateAIResponse } from '../utilities';

const AboutPage = () => {

  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAIResponse] = useState('');

  const handleGenerateResponse = async () => {
    try {
        const response = await generateAIResponse(userInput);
        // Extract the content from the response
        const content = response?.response?.find(item => item[0] === "content")?.[1] || 'No content available.';
        setAIResponse(content);
        setUserInput(''); // Clear the input field after submitting
    } catch (error) {
        console.error('Failed to generate AI response:', error);
    }
};

    return (
        <div className="about-page">
            <h1>Welcome to Care and Sky Cookie Co!</h1>
            <p>
                At Care and Sky Cookie Co, we are more than just a cookie company—we are a brand driven by passion, creativity, and a deep commitment to making the best cookies in the world. Founded and owned by a dedicated nurse and a seasoned pilot, our company blends the precision of aviation with the care and attention of the healthcare industry to create cookies that are truly one-of-a-kind. But don't be mistaken—these cookies aren't just for nurses and pilots; they are for everyone who appreciates quality and flavor!
            </p>
            <p>
                What sets us apart is our commitment to personalization. Every cookie we bake is made with YOU in mind, because here at Care and Sky Cookie Co, you get to be the creator of your very own "Cookie Creation." Our extensive inventory allows you to choose from a wide range of flavors, toppings, cookie cutters, and decorations to craft a cookie that is uniquely yours. Whether it's a simple chocolate chip cookie with a twist or a complex, multi-flavored masterpiece, we look forward to bringing your sweet vision to life.
            </p>
            <p>
                We understand that everyone has different tastes, and sometimes our standard inventory might not have exactly what you're looking for. That's why we offer a unique service: if you have a specific topping, cookie cutter, decoration, or flavor in mind that we don’t currently stock, you can mail it to us, and we'll incorporate it into your custom creation. This way, your cookie is not just a treat, but a true reflection of your personality and preferences.
            </p>
            <p>
                At Care and Sky Cookie Co, we’re not just baking cookies—we’re crafting experiences. We’re excited to be a part of your special moments, and we can’t wait to see the amazing Cookie Creations you’ll come up with. So go ahead, explore our options, and start building the cookie of your dreams today!
            </p>
            
            <h4>Just Ask Care and Sky Cookie Co's AI! They know how great our cookies are</h4>
            
            <div className="ai-section">
                <h2>Ask Us Anything!</h2>
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask a question or make a request"
                    rows="4"
                    cols="50"
                />
                <button onClick={handleGenerateResponse}>Get AI Response</button>
                <div>
                    <h3>AI Response:</h3>
                    <p>{aiResponse}</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
