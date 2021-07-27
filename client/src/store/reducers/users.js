const initialState = {
    isInprogress: false,
    isError: false,
    message: '',
    status: null,
    userList: {},
};

export default function UserReducers(state = initialState, action) {
    switch (action.type) {
        case 'USER_INPROGRESS':
            return {
                ...state,
                isInprogress: true,
                isError: false,
                message: ''
            }

            case 'USERGET_SUCCESS':
                return {
                    ...state,
                    isInprogress: true,
                    isError: false,     
                    message: action.messsage,
                    userList:action.data
                }
                
                case 'USERGET_FAILURE':
                    return {
                        ...state,
                        isInprogress: false,
                        isError: true,
                        message: action.messsage,
                    }
                case 'USERDELETE_SUCCESS':
                    return {
                        ...state,
                        isInprogress: true,
                        isError: false,     
                        message: action.messsage
                    }                    
                case 'USERDELETE_FAILURE':
                    return {
                        ...state,
                        isInprogress: false,
                        isError: true,
                        message: action.messsage,
                    }  
                case 'USERUPDATE_SUCCESS':
                    return {
                        ...state,
                        isInprogress: true,
                        isError: false,     
                        message: action.messsage,
                    }                    
                case 'USERUPDATE_FAILURE':
                    return {
                        ...state,
                        isInprogress: false,
                        isError: true,
                        message: action.messsage,
                    }        
        default:
            return state;
    }
}