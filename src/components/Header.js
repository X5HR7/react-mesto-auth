import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className='header'>
      <img src={logo} alt='Логотип' className='header__logo' />
      <div className="header__text">
        <p className="header__account-name">{props.accountName || ''}</p>
        <Link to={props.link} className="header__link">{props.linkText || ''}</Link>
      </div>
    </header>
  );
};

export default Header;