import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
const About =()=>{
    return(
        <>
            <div className="about">
            <hr style={{border:"5px solid #27374D"}} />
            <span className="blacktitle">HMovies</span>
                <h3>Stream your favorite movies and TV shows anytime, anywhere, with our convenient and easy-to-use platform </h3>
                <br />
                <h3>Contact the Developer: Harem Mohammed</h3>
                <a href="https://www.facebook.com/profile.php?id=100009863801578" target="_blank" rel="noreferrer"><BsFacebook className="about-icons"/></a>
                <a href="https://www.linkedin.com/in/harem-mohammed-0612b2231/" target="_blank" rel="noreferrer"><BsLinkedin className="about-icons"/></a>
                <a href="https://github.com/harem-M-Smail" target="_blank" rel="noreferrer"><BsGithub className="about-icons"/></a>
            </div>
        </>
    )
}
export default About