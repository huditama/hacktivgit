# hacktivgit

List of Routes (Server)
==
|Route    |HTTP  |Body  | Description |
|:--------: |:----:|:----:|:----:|
|`/getRepos/:user`|GET   | `none`|Get the client's repos|
|`/createRepo`|POST   |`name:String` (**REQUIRED**), `description:String` (**REQUIRED**) |Create a new repo|
|`/deleteRepo/:owner/:repo`|DELETE   |`none`|Delete a repo|
|`/getStarredRepos`|GET   |`none`|Get the client's starred repos|
|`/findStarredRepo?owner=[owner]&repo=[repo]`|GET    |`none`|Find a starred repo by repo name and owner|
|`/searchRepo/:user`|GET     |`none`|Find another user's list of repos|
|`/unstarRepo/:owner/:repo`|DELETE     |`none`|Unstar a starred repo|

List of Routes (Client)
==
|Route    |HTTP  |Body  | Description |
|:--------: |:----:|:----:|:----:|
|`/`|GET   | `none`|Get client homepage (single page application)|


Usage (Server)
===
```javascript
$ npm install
$ node app.js
```
Usage (Client)
===
```javascript
$ npm install -g live-server
$ live-server --host=localhost
```
Access client via http://localhost:8080/<br>
Access server via http://localhost:3000/