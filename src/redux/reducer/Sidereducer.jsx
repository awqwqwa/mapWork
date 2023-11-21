export const Sidereducer=(prevState={
    collapsed:true,
},action)=>{
    let newState={...prevState}
    switch(action.type){
        case "changeSideState":
            newState.collapsed=!newState.collapsed
            return newState
        default:
            return prevState
    }
}