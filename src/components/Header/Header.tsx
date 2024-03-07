import { Link } from 'react-router-dom';
import style from './Header.module.scss';

function Header() {
  return (
    <header className={style.header}>
      <div className="container">
        <Link className={style.header__logo} to="/">
          Jewelry
        </Link>
      </div>
    </header>
  );
}

export default Header;
