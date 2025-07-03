import React, { useState, useEffect } from 'react'
import EditiorNavbar from '../components/EditiorNavbar'
import Editor from '@monaco-editor/react';
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { apibase_url } from '../helper';
import { data, useParams } from 'react-router-dom';

const Editior = () => {
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [htmlcode, setHtmlCode] = useState("<h1>Hello World </h1>")
  const [csscode, setCssCode] = useState("body {background-color:#f4f4f4;}");
  const [jscode, setJSCode] = useState("// some comment");
   let {projectID} = useParams();


  const changeTheme = () => {
      
    

    const navbar = document.querySelector(".EditiorNavbar");
    if (navbar) {
      navbar.style.background = isLightMode ? "#141414" : "#f4f4f4";
    }

    if (isLightMode) {
      document.body.classList.remove("lightMode");
    } else {
      document.body.classList.add("lightMode");
    }

    setIsLightMode(!isLightMode);
  };

  const run = () => {
    const iframe = document.getElementById("iframe");
    if (!iframe) return;
    console.log(htmlcode)

    const source = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>${csscode}</style>
      </head>
      <body>
        ${htmlcode}
        <script>
          ${jscode}
        <\/script>
      </body>
    </html>
  `;

  iframe.srcdoc = source;

   {/* const html = htmlcode;
    const css = `<style>${csscode}</style>`;
    const js = `<script>${jscode}<\/script>`;
    iframe.srcdoc = html + css + js; */}
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      run();
    }, 200);

    return () => clearTimeout(timeout);
  }, [htmlcode, csscode, jscode]);

   useEffect(() => {
    fetch(apibase_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID  // Use projectID here
      })
    })
      .then(data =>{
        if(data?.project){
          setHtmlCode(data.project.htmlCode || "")
          setCssCode(data.project.cssCode || "")
          setJSCode(data.project.jsCode || "")
        }
        else{
          console.error("No project found")
        }
      })
      
  }, [projectID]);

   useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent the default save file dialog
  
        // Ensure that projectID and code states are updated and passed to the fetch request
        fetch(apibase_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID,  // Make sure projectID is correct
            htmlCode: htmlCode,  // Passing the current HTML code
            cssCode: cssCode,    // Passing the current CSS code
            jsCode: jsCode       // Passing the current JS code
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert("Project saved successfully");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.error("Error saving project:", err);
          alert("Failed to save project. Please try again.");
        });
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectID, htmlcode, csscode, jscode]);


  return (
    <>
      <EditiorNavbar className="EditiorNavbar" />
      <div className="flex">
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[60px] px-[40px]">
            <div className="tabs flex items-center gap-2">
              <div onClick={() => setTab("html")} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">HTML</div>
              <div onClick={() => setTab("css")} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">CSS</div>
              <div onClick={() => setTab("js")} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">JavaScript</div>
            </div>
            <div className="flex items-center gap-2">
              <i className="text-[20px] cursor-pointer" onClick={changeTheme}><MdLightMode /></i>
              <i className="text-[20px] cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}><AiOutlineExpandAlt /></i>
            </div>
          </div>

          {tab === "html" && (
            <Editor
              onChange={(e) => setHtmlCode(e || "")}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="html"
              value={htmlcode}
            />
          )}

          {tab === "css" && (
            <Editor
              onChange={(e) => setCssCode(e || "")}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="css"
              value={csscode}
            />
          )}

          {tab === "js" && (
            <Editor
              onChange={(e) => setJSCode(e || "")}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="javascript"
              value={jscode}
            />
          )}
        </div>

        <iframe
          id="iframe"
          className={`min-h-[82vh] bg-[#fff] text-black ${isExpanded ? "hidden w-0" : "w-1/2"}`}
        ></iframe>
      </div>
    </>
  );
};

export default Editior;
