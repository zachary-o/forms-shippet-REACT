import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import "./Meme.css";

const Meme = () => {
  const [memes, setMemes] = useState([]);

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    image: "https://i.imgflip.com/30b1gx.jpg"
  });

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => setMemes(response.data.data.memes))
      .catch((error) => console.log("error"));
  }, []);

  const getNewMeme = () => {
    const randomNum = Math.floor(Math.random() * memes.length);
    const randomUrl = memes[randomNum].url;
    setMeme(prevMeme => {
        return {
          ...prevMeme,
          image: randomUrl
        };
    })
  };

  const onChangeSetText = (event) => {
    setMeme((prevText) => {
      return {
        ...prevText,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className="container">
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          name="topText"
          onChange={(event) => onChangeSetText(event)}
        />
        <input
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          onChange={(event) => onChangeSetText(event)}
        />
        <button onClick={() => getNewMeme()}>Get a New Meme</button>
      </div>
      <div className="image">
        <img src={meme.image} alt="meme" />
        <h2 className="top">{meme.topText}</h2>
        <h2 className="bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
};

export default Meme;
