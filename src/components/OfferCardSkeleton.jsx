const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";
 
const OfferCardSkeleton = ({ count = 3 }) => {
  return Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className="rounded-2xl border border-gray-200 p-6 shadow-sm bg-white"
    >
      {/* Header: logo + badge */}
      <div className="flex items-center justify-between">
        <div className={`h-8 w-20 rounded bg-gray-200 ${shimmer}`} />
      </div>
 
      {/* Company name */}
      <div className={`h-6 w-36 rounded bg-gray-200 mt-5 mb-5 ${shimmer}`} />
 
      {/* 4 detail rows */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((row) => (
          <div
            key={row}
            className="flex items-center justify-between border-b pb-2 border-gray-100"
          >
            <div className={`h-4 w-24 rounded bg-gray-200 ${shimmer}`} />
            <div className={`h-4 w-16 rounded bg-gray-200 ${shimmer}`} />
          </div>
        ))}
      </div>
 
      {/* Button */}
      <div className={`h-10 w-full rounded-full bg-gray-200 mt-7 ${shimmer}`} />
    </div>
  ));
};
 
// const CountryCardSkeleton = ({ count = 8 }) => {
//   return Array.from({ length: count }).map((_, i) => (
//     <div
//       key={i}
//       className="flex items-center gap-5 border border-gray-200 md:p-4 p-2 rounded-xl mb-4"
//     >
//       <div className={`w-8 h-8 md:h-10 md:w-10 rounded-full bg-gray-200 flex-shrink-0 ${shimmer}`} />
//       <div className="flex-1 space-y-2">
//         <div className={`h-4 w-28 rounded bg-gray-200 ${shimmer}`} />
//         <div className={`h-3 w-20 rounded bg-gray-200 ${shimmer}`} />
//       </div>
//     </div>
//   ));
// };
 
// const DetailPageSkeleton = () => {
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <div className={`h-6 w-6 rounded bg-gray-200 ${shimmer}`} />
//         <div className={`h-7 w-48 rounded bg-gray-200 ${shimmer}`} />
//       </div>
//       {/* Card */}
//       <div className="rounded-2xl border border-gray-200 p-6 shadow-sm bg-white space-y-5">
//         <div className="flex items-center gap-3">
//           <div className={`h-10 w-10 rounded-full bg-gray-200 ${shimmer}`} />
//           <div className={`h-6 w-32 rounded bg-gray-200 ${shimmer}`} />
//         </div>
//         {[1, 2, 3, 4, 5].map((row) => (
//           <div key={row} className="flex items-center justify-between border-b pb-3 border-gray-100">
//             <div className={`h-4 w-24 rounded bg-gray-200 ${shimmer}`} />
//             <div className={`h-4 w-20 rounded bg-gray-200 ${shimmer}`} />
//           </div>
//         ))}
//         <div className="flex gap-4 pt-2">
//           <div className={`h-10 w-full rounded-full bg-gray-200 ${shimmer}`} />
//           <div className={`h-10 w-full rounded-full bg-gray-200 ${shimmer}`} />
//         </div>
//       </div>
//     </div>
//   );
// };
 
// const TableSkeleton = ({ rows = 5 }) => {
//   return (
//     <div className="space-y-4">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className={`h-7 w-40 rounded bg-gray-200 ${shimmer}`} />
//         <div className={`h-9 w-28 rounded-lg bg-gray-200 ${shimmer}`} />
//       </div>
//       <div className={`h-4 w-56 rounded bg-gray-200 ${shimmer}`} />
//       {/* Table header */}
//       <div className="flex gap-4 py-3 border-b border-gray-200">
//         {[1, 2, 3, 4, 5].map((col) => (
//           <div key={col} className={`h-4 flex-1 rounded bg-gray-200 ${shimmer}`} />
//         ))}
//       </div>
//       {/* Table rows */}
//       {Array.from({ length: rows }).map((_, i) => (
//         <div key={i} className="flex gap-4 py-3 border-b border-gray-100">
//           {[1, 2, 3, 4, 5].map((col) => (
//             <div key={col} className={`h-4 flex-1 rounded bg-gray-100 ${shimmer}`} />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };
 
const StatCardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-gray-200 p-5 shadow-sm bg-white space-y-3">
          <div className={`h-4 w-24 rounded bg-gray-200 ${shimmer}`} />
          <div className={`h-8 w-16 rounded bg-gray-200 ${shimmer}`} />
          <div className={`h-3 w-32 rounded bg-gray-200 ${shimmer}`} />
        </div>
      ))}
    </div>
  );
};
 
export { OfferCardSkeleton, StatCardSkeleton };
export default OfferCardSkeleton;
 
 