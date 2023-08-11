import {signOut} from 'next-auth/react';

type PropsFetchAction = {
  url?: string;
  method: 'POST' | 'GET';
  headers: {
    'Content-Type'?: 'application/json' | 'multipart/form-data';
  };
  data?: Array<{}> | FormData;
};

type PropsDataAction = {
  body: any;
} & PropsFetchAction;

const fetchActionAPI = async ({
  url,
  method,
  headers,
  data,
}: PropsFetchAction) => {
  try {
    const HEADERS_CONFIGURATION = {};

    const dataAction: PropsDataAction = {
      method,
      headers: {
        ...HEADERS_CONFIGURATION,
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data,
    };

    if (method === 'POST') {
      dataAction.method = 'POST';
    }

    if (headers['Content-Type'] === 'multipart/form-data') {
      delete dataAction.headers['Content-Type'];
    }

    const newPath = url ? url.replace('https://pokeapi.co/api/v2/', '') : url;

    const response = await fetch(
      `https://pokeapi.co/api/v2/${newPath}`,
      dataAction,
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (err) {
    return {
      errorMessage: err,
      errorStatus: true,
    };
  }
};

export default fetchActionAPI;
