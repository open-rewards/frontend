import { useAuth } from "@contexts/AuthContext";
import Pr1 from "./Steps/Pr1";
import Pr2 from "./Steps/Pr2";
import Pr3 from "./Steps/Pr3";

// const AddProjectModal: FC<Props> = ({ isOpen, setIsOpen }) => {
//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-10"
//         onClose={() => setIsOpen(false)}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-25" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title
//                   as="h3"
//                   className="font-medium leading-6 text-gray-800"
//                 >
//                   Add Your Project For Open Source Contribution
//                 </Dialog.Title>

//                 <div className="mt-4 flex space-x-4">
//                   <button
//                     className="flex justify-center items-center rounded-md bg-gray-200 w-20 h-10 font-medium text-gray-600 focus:outline-none"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

const AddProject = () => {
  const { step } = useAuth();

  if (step === 1) {
    return <Pr1 />;
  }
  if (step === 2) {
    return <Pr2 />;
  }
  if (step === 3) {
    return <Pr3 />;
  }
  return (
    <div className="text-white text-center mt-20">Something went wrong</div>
  );
};

export default AddProject;
