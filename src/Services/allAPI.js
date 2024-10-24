import { base_Url } from "./base_Url";
import { commonAPI } from "./commonApi";
//Actual API call
//registerAPI -post-body
export const registerAPI=async(user)=>{
    return await commonAPI("post",`${base_Url}/register`,user,"")
}
//login API -post-body
export const loginAPI=async(user)=>{
    return await commonAPI("post",`${base_Url}/login`,user,"")
}
// //add project API -post-body
export const addGameAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${base_Url}/games/add`,reqBody,reqHeader)
}

export const getAllGamesAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${base_Url}/games/get-games?search=${searchKey}`,"",reqHeader)
}
export const getGamesByIdAPI=async(gameId,reqHeader)=>{
    return await commonAPI("get",`${base_Url}/games/${gameId}`,"",reqHeader)
}
// //Edit user project
export const editGamesAPI=async(gameId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${base_Url}/games/edit-games/${gameId}`,reqBody,reqHeader)
}
//Delete user project
export const deleteGamesAPI=async(gameId,reqHeader)=>{
    return await commonAPI("delete",`${base_Url}/games/delete-games/${gameId}`,{},reqHeader)
}
export const purchasedGamesAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${base_Url}/games/add-purchased-games`,reqBody,reqHeader)
}
export const getUsersAPI=async(userId,reqHeader)=>{
    return await commonAPI("get",`${base_Url}/get-users/${userId}`,reqHeader)
}

export const deletePurchasedGamesAPI=async(gameId,reqBody,reqHeader)=>{
    return await commonAPI("delete",`${base_Url}/deletefromlibrary/${gameId}`,reqBody,reqHeader)
}
export const wishlistGamesAPI=async(gameId,reqBody,reqHeader)=>{
    return await commonAPI("post",`${base_Url}/wishlist/${gameId}`,reqBody,reqHeader)
}
export const deletewishlistGamesAPI=async(gameId,reqBody,reqHeader)=>{
    return await commonAPI("delete",`${base_Url}/deletefromwishlist/${gameId}`,reqBody,reqHeader)
}

