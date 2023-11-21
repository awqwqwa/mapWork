export function changeSide(){
    return{
        type:"changeSideState"
    }
}
export function searchMMSI(MMSI){
    return{
        type:"searchAction",
        payload:MMSI
    }
}