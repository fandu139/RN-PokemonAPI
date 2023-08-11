import {atom} from 'recoil';

const listDataFilter = atom({
  key: 'listDataFilter',
  default: {
    isFilter: false,
    dataFilter: [],
  },
});

export default listDataFilter;
