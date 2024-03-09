import { useEffect, useState } from 'react';
import { RxPinTop } from 'react-icons/rx';
import style from './ScrollToTopButton.module.scss';

function ScrollToTopButton() {
  const [scrollToTopButton, setScrollToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setScrollToTopButton(true);
      } else {
        setScrollToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`${style.body} ${scrollToTopButton ? style.visible : style.hidden}`}
    >
      <button type="button" onClick={scrollUp} className={style.button}>
        <RxPinTop />
      </button>
    </div>
  );
}

export default ScrollToTopButton;
