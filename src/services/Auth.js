import * as uuid from 'uuid';

export class AuthService{
    userData = [{
        userId: '0236fc9d-aa6a-4872-aba8-2b61cad3feb1', 
        userName: 'prem@gmail.com', 
        password: 'prem0501'
    }];
    async authenticate(data){
        try {
            return new Promise((resolve) => {
                const foundUser = this.userData.filter(ud=>(ud.userName === data.userName && ud.password === data.password));
                console.log(foundUser);
                if (foundUser.length > 0) {
                    localStorage.setItem('userId', foundUser[0].userId);
                    resolve({ status: 1, data: foundUser[0], msg: 'Successfully logged in' });
                }
                else {
                    resolve({ status: 0, data: null, msg: 'Username and password dont match, please check your credentials' });
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async register(data){
        try {
            return new Promise((resolve) => {
                const foundUser = this.userData.filter(ud=>ud.userName === data.userName);
                if (foundUser.length > 0) {
                    resolve({ status: 0, data: null, msg: 'User name already exists, please login to continue' });
                }
                else {
                    if(data.password === data.confirmPassword){
                        const newUser = { userId: uuid(), userName: data.userName, password: data.password};
                        localStorage.setItem('userId', newUser.userId);
                        this.userData.push(newUser);
                        console.log(this.userData);
                        resolve({ status: 1, data: newUser, msg: 'Registration successful' });
                    }
                    else{
                        resolve({ status: 0, data: null, msg: 'Passwords dont match' });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    getUserId(){
        return localStorage.getItem("userId");
    }
    getUserData(){
        const userId = this.getUserId();
        const foundUserData = this.userData.filter(item=>item.userId === userId);
        return foundUserData[0];
    }
    getLoginStatus() {
        const userId = this.getUserId();
        const foundUserData = this.userData.filter(item=>item.userId === userId);
        console.log(foundUserData, userId);
        return foundUserData.length > 0;
    }
    logout(){
        localStorage.removeItem("userId");
    }
}