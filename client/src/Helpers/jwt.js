import store from "store";

export const persistCurrentUser = user => {
  store.set("currentUser", user);
};

export const getCurrentUser =  () => {
  const user = store.get('currentUser')
  return user || null;
};
export const removeCurrentUser = () => {
     store.remove('currentUser')
};

export const getAccessToken =  async ()=>{

    const currentUser = await getCurrentUser()
    
    const token = currentUser ? currentUser.accessToken: null 
    return token? token : ''
  
  }
export const getRefreshToken =  async ()=>{

    const currentUser = await getCurrentUser()
    
    const token = currentUser ? currentUser.refreshToken: null 
    return token? token : ''
  
  }
