export interface LoderState{
    isLoder:boolean
}

export interface LoderContextProps{
    loderState:LoderState,
    changeStateLoder:(newValue:boolean)=>void
}