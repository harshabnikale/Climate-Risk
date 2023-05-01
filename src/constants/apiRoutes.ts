export const apiEndPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const getApiURI = (path:string) => apiEndPoint + path;

export const APIROUTES = {
    GET_DATA_FROM_CSV : getApiURI('/hello')
}