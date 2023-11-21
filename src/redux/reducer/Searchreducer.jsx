export const Searchreducer=(prevState={
    MMSI:' '
},action)=>{
    let newState={...prevState}
    switch(action.type){
        case "searchAction":
            newState.MMSI=action.payload
            return newState
        default:
            return prevState
    }
}