import TextField from '@material-ui/core/TextField';
import {debounce} from "@material-ui/core";
import PropTypes from "prop-types";

const SearchInput = ({handleSearch}: React.PropsWithoutRef<any>) => {
    return (
        <div className='search-input'>
            <form noValidate autoComplete="off">
                <TextField id="search-input" label="Outlined" variant="outlined" onChange={debounce(handleSearch, 300)} />
            </form>
        </div>
    )
}

SearchInput.propTypes = {
    handleSearch: PropTypes.func.isRequired,
}

export default SearchInput
