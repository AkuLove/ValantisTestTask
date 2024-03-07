import style from './ErrorPage.module.scss';

function ErrorPage() {
  return (
    <div className={style.errorBody}>
      <div>Something went wrong</div>
      <button type="button" onClick={() => window.location.reload()}>
        Try again
      </button>
    </div>
  );
}

export default ErrorPage;
