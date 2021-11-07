export interface louderState{
    isLouder:boolean
}

export interface LouderContextProps{
    louder:louderState,
    changeStateLouder:()=>void
}