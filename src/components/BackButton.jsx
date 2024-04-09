import css from "../pages/MovieDetailsPage.module.css";
import {Link} from "react-router-dom";
import {memo} from "react";

const BackButton = ({backLinkRef}) => {
  return (
    <div className={css.backButton}>
      <Link className={css.backButton_text}  to={backLinkRef.current ?? '/'}>Back</Link>
    </div>
  )
}

export default memo(BackButton);
