import {atom} from 'recoil';

const pageData = atom({
  key: 'pageData',
  default: {
    limit: 8,
    offset: 0,
  },
});

export default pageData;
