import Cookies from 'js-cookie';

const useSessionCookie = (response) => {
  const bearer = response.headers.get('Authorization');
  const jwt = bearer.split(' ');
  Cookies.set('token', jwt[1], { expires: 1/48 });
};
export default useSessionCookie;
