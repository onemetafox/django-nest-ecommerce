import StickyNavbar from '../components/common/partials/sticky-navbar';

const withAuth = Component => {
  const Auth = props => {
    const { isLoggedIn } = props;

    // If user is not logged in, navar without props
    if (!isLoggedIn) {
      return <StickyNavbar />;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
