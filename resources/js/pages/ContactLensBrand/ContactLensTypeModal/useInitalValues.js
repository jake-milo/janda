export const useInitalValues = (type) => ({
    name: type ? type.name : '',
    duration: type ? type.duration : '',
});
