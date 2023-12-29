import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Trailers = () => {
    const [videos, setVideos] = useState([]);
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; 
    const gameVideoIds = {
        'NBA2K24': 'OJS1BVniz5c',
        'FC24': 'XhP3Xh4LMA8',
        'UFC 5': 'XlGdaeAy6Kk',
        'Just Dance 2024': 'gkBFZrD0U_M',
        'Call Of Duty: MW2': 'i1qz3D32TI8',
        'FIFA 23':'o3V-GvvzjE4' ,
        'Call Of Duty: MW3':'coiTJbr9m04' ,
        'Call Of Duty: Warzone':'CHtd3oVt1QE' ,
        'Call Of Duty: BO4':'o3VGvvzjE4' ,
        'Call Of Duty: BO3':'o3VGvvzjE4' ,
        'The Legend of Zelda: Breath of the Wild':'zw47_q9wbBE' ,
        'Uncharted 4':'hh5HV4iic1Y' ,
        'Red Dead Redemption 2':'F63h3v9QV7w' ,
        'Assassin’s Creed Valhalla':'DiqaG1TWdgM' ,
        'Tomb Raider':'91vbp8d_V78' ,
        'Naruto Shippuden: Ultimate Ninja Storm 4':'9Vm4m15r2Xc' ,
        'One Piece: Pirate Warriors 4':'xyK_yRrDQ2w' ,
        'My Hero One’s Justice':'dubWujAE1jk' ,
        'Attack on Titan 2':'rU34JMxLJ9s' ,

    };

       
    useEffect(() => {
        const fetchVideos = async () => {
            const ids = Object.values(gameVideoIds).join(',');
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ids}&key=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                if(data.items) {
                    setVideos(data.items);
                } else {
                    setVideos([]);
                }
            } catch (error) {
                console.error('Error fetching YouTube videos', error);
                setVideos([]);
            }
        };

        if(apiKey) {
            fetchVideos();
        } else {
            console.error('YouTube API key is not defined');
        }
    }, [apiKey]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Nombre de slides à montrer à la fois
        slidesToScroll: 3, // Nombre de slides à défiler
        autoplay: true,
        autoplaySpeed: 4000,
      };

      return (
        <>
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-6">Game Trailers</h1>
                <Slider {...sliderSettings}>
                    {videos.map((video) => (
                        <div key={video.id} className="p-2">
                            <h2 className="text-xl font-semibold mb-4" style={{ minHeight: '64px' }}>{video.snippet.title}</h2>
                            <div className="video-wrapper" style={{ position: 'relative', paddingBottom: '56.25%', height: '0' }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.snippet.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <Footer />
        </>
    );
    
    
                    }
    export default Trailers;