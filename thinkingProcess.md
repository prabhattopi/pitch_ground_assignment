[1] initialize package typescript/javascript

[2] installing dependencies(express,mongoose,...etc)

[3] create folderSturcture(models,routes,controller,middeleware,cofig/.env,.gitignore.. etc)

[4] create model as directory

  [1] Take array of object in mongodb as main directory and each sub-directory has own list of todo Item.

     [a] My first approach to deal with directory purpose

     [b] I used `jwt` for token as relation between todo and mydirectory

         [a1] I create a directory as and chekc two codition

         [a2] first -->if there is no user then simple create a todo Item

         [a3] second--> if there is user already then simply push into subdirectory

         [a4] and I done always a post with that authorization so i get id from that token

[5] And then follow as crud operation
