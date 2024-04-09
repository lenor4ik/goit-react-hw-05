import css from "../pages/MovieDetailsPage.module.css";
import {Link, useLocation} from "react-router-dom";

const BackButton = () => {
  const {state} = useLocation();
  return (
    <div className={css.backButton}>
      <Link className={css.backButton_text}  to={state?.from ?? '/'}>Back</Link>
    </div>
  )
}

export default BackButton;
