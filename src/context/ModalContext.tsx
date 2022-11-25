import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useState } from "react";

interface IModalContext {
   showModal: boolean;
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

interface Props {
   children: React.ReactElement[];
}

export default function ModalProvider({ children }: Props): ReactElement {
   const [showModal, setShowModal] = useState<boolean>(false);

   return (
      <ModalContext.Provider value={{ showModal, setShowModal }}>{children}</ModalContext.Provider>
   );
}

export const useModal = (): IModalContext => useContext(ModalContext);
