export const useInitialValues = (user) => ({
    name: user ? user.name: '',
    email: user ? user.email : '',
    password: '',
});
