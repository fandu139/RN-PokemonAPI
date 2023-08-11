// import 'server-only'
import fetchActionAPI from '.';

const getPokemonDetail = async ({url}: {url: string}) => {
  const result = await fetchActionAPI({
    url,
    method: 'GET',
    headers: {},
  });

  return result;
};

export default getPokemonDetail;
