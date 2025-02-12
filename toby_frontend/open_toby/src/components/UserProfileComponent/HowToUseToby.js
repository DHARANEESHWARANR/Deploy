import React from "react";
import {useState,useEffect} from 'react-router-dom';
import toby_image from '../../assets/TOBY.png';
import vedio1 from '../../assets/dubai.mp4'
import vedio2 from '../../assets/AccountCreation.mp4'
import vedio3 from '../../assets/CollectionStaring.mp4'
const HowToUseToby = ()=>{
    return(
        <div className="overflow-y-auto h-screen max-h-[calc(100vh-100px)] border">
            <div className="flex justify-center pt-10">
             <img src={toby_image} alt="Edit" className="object-contain w-13 h-13 items-center" />
             </div>
             <div className="flex justify-center pt-5">
                <h3 className="text-[25px] text-[#CCCCCC]">How To Use Toby</h3>
             </div>

<div className="feature_division px-10 space-y-16 ">
  {/* Feature 1 */}
  <div className="feature_1">
    <h1 className="text-[42px] mb-8 text-[#5A7FD8]">Clear the clutter</h1>
    <h3 className="text-left max-w-md leading-relaxed text-[#979797] text-[20px]">
      <span className="font-bold text-[#6f6064]">
        Using different browser windows to separate tabs into to-do tasks,
      </span> dashboards, and spreadsheets is not ideal. With Toby, you can remove the clutter by having just one window open, with only the tabs you need.
    </h3>
    <video loop autoPlay muted className="w-full mt-8 rounded-lg shadow-lg">
      <source src={vedio1} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Feature 2 */}
  <div className="feature_2 border-y">
    <h1 className="text-[42px] mb-8 text-[#5A7FD8]">Pause and resume work</h1>
    <h3 className="text-left max-w-md leading-relaxed text-[#979797] text-[20px]">
      <span className="font-bold text-[#6f6064]">Feel like your workflow is bottlenecked by context switching?</span> With just one click, Toby can save your browser session or open it when you’re ready to resume your task.
    </h3>
    <video loop autoPlay muted className="w-full mt-8 rounded-lg shadow-lg">
      <source src={vedio2} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Feature 3 */}
  <div className="feature_3  border-y">
    <h1 className="text-[42px] mb-8 text-[#5A7FD8]">Flexible with your work habits</h1>
    <h3 className="text-left max-w-md leading-relaxed text-[#979797] text-[20px]">
      <span className="font-bold text-[#6f6064]">Toby sits on top of every new tab screen</span> to help remind you of the most important tasks you need to complete today.
    </h3>
    <video loop autoPlay muted className="w-full mt-8 rounded-lg shadow-lg">
      <source src={vedio3} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Feature 4 */}
  <div className="feature_4  border-y">
    <h1 className="text-[42px] mb-8 text-[#5A7FD8]">Be an expert everywhere you work</h1>
    <h3 className="text-left max-w-md leading-relaxed text-[#979797] text-[20px]">
      Get instant access to the tabs you need to get the job done. Toby is able to search for anything within your workspace, letting you find exactly what you’re looking for in seconds.
    </h3>
    <video loop autoPlay muted className="w-full t-8 rounded-lg shadow-lg ">
      <source src={vedio1} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</div>

        </div>
    );
}

export default HowToUseToby;