import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
export default function Slider() {

    return (
        <>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper mt-5"
            >
                <SwiperSlide><img src="https://cookishcreation.com/wp-content/uploads/2021/11/Vapa-Pitha.jpg" className="w-full" /></SwiperSlide>
                <SwiperSlide><img src="https://artthut.files.wordpress.com/2016/12/feature-image.jpg" className="w-full" /></SwiperSlide>
                <SwiperSlide><img src="https://www.worldatlas.com/r/w1200/upload/dc/54/fe/shutterstock-277794788.jpg" className="w-full" /></SwiperSlide>
            </Swiper>
        </>


    )
}

