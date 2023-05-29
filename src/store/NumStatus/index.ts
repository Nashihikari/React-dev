export default {
    state:{
        num:20
    },
    actions:{
        add1( newState:{num:number}, action:{type:string, val:number})
        {
            newState.num+=action.val
        }
    },
    actionNames:{
        add1:"add1"
    }
}