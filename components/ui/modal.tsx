'use client'

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, } from "@/components/ui/dialog";
import { Divider } from "@nextui-org/react";

interface ModalProps {
  title:string;
  description:string;
  isOpen:boolean;
  onClose:()=>void;
  children?:React.ReactNode;
};

export const Modal:React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children
}) => {
  const onChange=(open:boolean) => {
    if(!open){
      onClose();
    }
  };
  return(
    <Dialog open={isOpen} onOpenChange={onChange}>
       <DialogContent className="dark:bg-slate-900 border  dark:border-sky-500 ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <Divider className="dark:bg-sky-500/50"/>
          <DialogDescription>{description}</DialogDescription>
          
          <div >
            {children}
          </div>
        </DialogHeader>
       </DialogContent>
    </Dialog>
  )

}