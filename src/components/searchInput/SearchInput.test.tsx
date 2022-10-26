import {cleanup, getByLabelText, render} from '@testing-library/react';
import SearchInput from './SearchInput';
import '@testing-library/jest-dom/extend-expect'
import {labelsConst} from "../../constants/labels";

afterEach(cleanup);

it('is Search Input exist', () => {
    const {queryByTestId} = render(
        <SearchInput handleSearch={() => {
        }}/>
    );
    expect(queryByTestId(/search-input/i)).toBeTruthy();
});

it('is Search Input label works via props', () => {
        labelsConst.searchInput = 'test-props'
        const {getByTestId} = render(<SearchInput/>);
        expect(getByTestId('search-input')).toHaveTextContent('test-props'); // works
    }
);

