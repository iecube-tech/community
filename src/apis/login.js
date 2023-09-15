import httpInstance from "@/utils/http";

export function Login(loginfo) {
    return httpInstance({
        url: 'users/login',
        method: 'POST',
        params: { phoneNum: loginfo.username, password: loginfo.password }
    })
}