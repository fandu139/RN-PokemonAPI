// import 'server-only'
import fetchActionAPI from '.';

const getPokemonDetail = async ({url}: {url: string}) => {
  try {
    const result = await fetchActionAPI({
      url,
      method: 'GET',
      headers: {},
    });

    return result;
  } catch (err) {
    console.log(err);
  }
};

export default getPokemonDetail;
