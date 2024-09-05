import {create} from "zustand"


type NewWarehousesState={
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}




export const useNewWarehouses = create<NewWarehousesState>((set)=>{
    return {
         isOpen:false,
         onOpen:()=>set({isOpen:true}),
         onClose:()=>set({isOpen:false})
    }
})