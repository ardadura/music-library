import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";
import {debounce} from "../../common/utils";
import {labelsConst} from "../../constants/labels";

const SearchInput = ({handleSearch}: React.PropsWithoutRef<any>) => {
    return (
        <div className='search-input'>
            <form noValidate autoComplete="off">
                <TextField data-testid='search-input' id="search-input" label={labelsConst.searchInput} variant="outlined" onChange={debounce(handleSearch)} fullWidth={true} />
            </form>
        </div>
    )
}

SearchInput.propTypes = {
    handleSearch: PropTypes.func.isRequired,
}

export default SearchInput
