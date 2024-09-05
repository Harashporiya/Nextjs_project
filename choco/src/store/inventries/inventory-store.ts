import {create} from "zustand"


type NewInventoriesState={
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}




export const useNewInventories = create<NewInventoriesState>((set)=>{
    return {
         isOpen:false,
         onOpen:()=>set({isOpen:true}),
         onClose:()=>set({isOpen:false})
    }
})