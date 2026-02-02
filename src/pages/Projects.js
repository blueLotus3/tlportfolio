import React from 'react'

const Projects = () => {

    return (
        <div className="projContent">
            <h4>Here are some projects</h4>
            <ul>
        <li><a href="https://pandajitsu.netlify.app">
            <iframe id="frame1" title="Martial Arts Store" src="https://pandajitsu.netlify.app"  scrolling="no"></iframe>
            <p>PandaJitsu Martial Arts Store</p>
        </a></li>
        <li>
        <a href="https://beerlabs.netlify.app">
            <iframe id="frame1" title="Martial Arts Store" src="https://beerlabs.netlify.app"  scrolling="no"></iframe>
            <p>BeerLabs Menu</p>
        </a>
        </li>
        </ul>

        </div>
    )
}

export default Projects;