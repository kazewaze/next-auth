export default function validateUser(data) {
  if (!data) {
    throw new Error('* ERROR: NO DATA PROVIDED *');
  }

  if (data.username.toLowerCase() === process.env.USERNAME && data.password === process.env.PASSWORD) {
    const login = { id: 1, name: 'Ronnie', full_name: 'Ronnie Ingram' };
    return { isLoggedIn: true, login, avatarUrl: 'https://raw.githubusercontent.com/KayceeIngram/assets-holder/main/heehaw.png' };
  } else {
    throw new Error('YOU SHALL NOT PASS');
  }
}