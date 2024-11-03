import { asyncHandler } from "../utils/asyncHandler.js";

console.log('asyncHandler', asyncHandler)
const registerUser = asyncHandler( async (req, res,) => {
  // console.log('ssssssssss');
   res.status(200).json({
     message: 'testing of post'
   })
});

export { registerUser };