import axios from "axios";
import { log } from "console";
import { useState } from "react";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VyRW1haWwiOiJ0b3JuaWtlc3VhcmlzaHZpbGlAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Mjc1MzIxOTEsImV4cCI6MTcyODEzNjk5MX0.LvQ68AHiDAoDbNMIH0iUd04orMM5a8gfPqWgEi5zbvA';

// export const tracks = [
//     {
//       title: 'Trinix ft Rushawn – Its a beautiful day',
//       src: '/audio/a_beautiful_day.mp3',
//       author: 'Trinix ft Rushawn',
//       thumbnail: '/images/trinix.jpeg',
//     },
//     {
//       title: 'Michael Jackson – We Are The World',
//       src: '/audio/We_Are_The_World.mp3',
//       author: 'Michael Jackson',
//       thumbnail: '/images/jackson.jpeg',
//     },
//     {
//       title: 'D’banj -Top Of The World',
//       src: '/audio/dbang-world.mp3',
//       author: 'Dbanj',
//       thumbnail: '/images/dbanj.png',
//     },
//     {
//       title: 'Cinematic Time Lapse',
//       src: '/audio/cinematic-time-lapse-115672.mp3',
//       author: 'Lexin Music',
//       thumbnail: '/images/lexin.jpeg',
//     },
//     {
//       title: 'Forest Lullaby',
//       src: '/audio/forest-lullaby-110624.mp3',
//       author: 'Lesfm',
//       thumbnail: '/images/forestlullaby.jpeg'
//     },
//     {
//       title: 'The Podcast Intro',
//       src: '/audio/the-podcast-intro-111863.mp3',
//       author: 'Music Unlimited',
//       // thumbnail: '/images/alltimemusic.jpeg'
//     }
// ]

axios.get("https://project-spotify-1.onrender.com/musics", {
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${token}`,
  },
})
  .then((response) => {
    const data = response.data;

    const tracks = Object.keys(data).map((key) => {
      const track = data[key];
      return {
        title: track.title,
        src: track.filePath,
        author: track.authorName,
      };
    });
  console.log(tracks, "zdddd");

  })
  .catch((err) => {
    console.log("Error:", err.response ? err.response.data : err.message);
  });