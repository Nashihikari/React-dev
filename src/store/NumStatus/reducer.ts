import handleNum from "./index.ts"

let reducer = ( state = {...handleNum.state}, action:{type:string, val:number} ) => {
    let newState = JSON.parse(JSON.stringify(state));
    for( let key in handleNum.actionNames){
        if ( action.type === handleNum.actionNames[key]){
            handleNum.actions[handleNum.actionNames[key]](newState, action)
        }
    }
    return newState;
}

export default reducer;