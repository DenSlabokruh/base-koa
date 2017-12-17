# base-koa

## Installation
1) Clone repo *git clone https://github.com/iliatcymbal/base-koa.git*
2) Go to project folder and make *npm i*
3) Run *npm start* to start server. Server is available on http://localhost:8081/
4) Check route http://localhost:8081  
   you should see `{data: 'Hello Easy user'}`
   
## API
All urls has public and private mode.  
Public urls start with `public/` and do not require any authenticating credentials.  
Private urls require special cookie (ECSID) in every request.  
Do not forget to use `withCredentials` flag for CORS stuff https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/withCredentials

### User API
`public/login` _post_ { username, password } - by default there is one user in the system with `admin/admin` credentials.  
On success returns object { success: true, user: {...} }  
On error returns 401 error 'Password or email wrong'  

`public/user` _post_ { firstname, lastname, email, password } - create new user

`public/checkUser` _get_ - if user is authenticated, return object with user {...}, in other case - 404 error { error: "User is not authenticated"}

`logout` _get_ - sends to server request to logout user  

### Tasks API
`tasks/id` _get_ - get task by ID, returns task

`tasks` _get_ - returns array with days of the week:  
[ day0, day1, day2 ... ]  
where _day_ is an array of objects: 
```
{
  "description": String,
  "title": String,
  "day": number,
  "id": String,
  "done": boolean | undefined
}
```
Note: the first item in the days list is a Sunday.

`tasks` _post_ - { title, description?, day } - creates new task in a day, returns new task

`tasks/id` _put_ - { title, description?, id, day } - update existing task, returns updated task
