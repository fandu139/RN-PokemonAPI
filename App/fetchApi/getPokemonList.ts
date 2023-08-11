// import 'server-only'
import fetchActionAPI from '.';

const getUserReferralAll = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  console.log('fandu', `pokemon?limit=${limit}&offset=${offset}`);
  try {
    const result = await fetchActionAPI({
      url: `pokemon?limit=${limit}&offset=${offset}`,
      method: 'GET',
      headers: {},
    });

    return result;
  } catch (err) {
    console.log(err);
  }
};

export default getUserReferralAll;
