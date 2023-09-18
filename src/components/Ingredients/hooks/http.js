import { useReducer, useCallback } from "react"


const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null ,data:null}
        case 'RESPONSE':
            return { loading: false, error: null,data:action.responseData }
        case 'ERROR': return {...curHttpState, loading: false, error: action.errorMessage }
        case 'CLEAR': return {...curHttpState, loading: false, error: null }
       default:return curHttpState
    }
}


const useHttp = () => {

    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        loading: false,
        error: null,
        data:null,

    })
 

    const sendRequest = useCallback((url, method, body,reqExtra) => {
        dispatchHttp({type:'SEND'})
        fetch(url, {
            method: method,
            body: body
        }).then((res) =>res
        ).then(resData=>{dispatchHttp({type:'RESPONSE',responseData: resData,extra:reqExtra})}).catch(() => {
            dispatchHttp({ type: 'ERROR', errorMessage: 'SOMETHING WENT WRONG !' })
        })

    }, [])
   
    return{
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest
    }

}

export default useHttp;

