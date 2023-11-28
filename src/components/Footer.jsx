import "../styles/layout/footer.scss";
import {NavLink} from 'react-router-dom'



const Footer = () => {
  return (
    <footer className="footer">
        
      <nav>
        <ul>
          <li className="footer__menu-item">
            <NavLink to="/" className="footer__menu-link">A jugar</NavLink>
          </li>
          <li className="footer__menu-item">
            <NavLink to="/Instructions" className="footer__menu-link active" 
              >¿Cómo se juega?</NavLink
            >
          </li>
          <li className="footer__menu-item">
            <NavLink to="/Options" className="footer__menu-link">Más opciones</NavLink>
          </li>
        </ul>
      </nav>
      <div className="footer__copy" ><small >© crisrodriguezgar</small>
      
      <a href="https://www.linkedin.com/in/cristinarodriguezgar" target="_blank"><i className="fa-brands fa-linkedin footer__linkedin"></i></a>
      <a href="https://github.com/crisrodriguezgar" target="_blank"><i className="fa-brands fa-github-alt footer__git"></i></a></div>
    </footer>
  );
};

export default Footer;