import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledLoader } from '../styledComponents/Loader';


export default function LoadingIndicator() {
  return (
    <StyledLoader>
      <FontAwesomeIcon icon={faSpinner}/>
    </StyledLoader>
  )
}
