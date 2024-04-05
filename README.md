<a id="top"></a>

# Node and SQL Documentation

Author : **Joseph Jacob Malete**
<br>
_Copyright &copy; 2024 Umuzi Academy_

<hr>

## How to run this project

Follow the steps below:

- ### Step 1:

#### Make sure you have docker installed in your local machine. If not, follow the [installation guide](https://docs.docker.com/desktop/install/windows-install/).

- ### Step 2:
  Once you have docker engine running, you can download this repo as a zip file. Unzip and open it in your VSCODE studio.

#### Open your BASH terminal and run the following commands:

- #### To install dependancies:

```
$ npm install
```

- #### To connect to the database:

```
$ docker compose up
```

Once this is done the database will be up and ready. The following step will be more on how to create a table and populating it with relevant data.

- ### Step 3:

## To Query the database you can use the following function calls:

- ### Creating the table:

```
(async () => {
  await createTable();
})();
```

Below is how the table is set up:

Table name: **visitors**

| id <br> (int) | full_name <br>(varchar255) | age <br> (int) | date_of_visit <br> (date) | time_of_visit <br> (time) | name_of_assistant <br> (varchar255) | comments <br> (varchar255)  |
| ------------- | -------------------------- | -------------- | ------------------------- | ------------------------- | ----------------------------------- | --------------------------- |
| 1             | Joseph Malete              | 16             | 04-03-2024                | 13:38                     | Tshepo Makwela                      | I had a great time at Umuzi |

- ### Adding a visitor:

```
(async () => {
  console.log(await addNewVisitor("Joseph Malete", 16, "04-03-2024", "13:38", "Thabo Makwela", "I had a great time at Umuzi"));
})();
```

- ### Listing all visitor:

Object format:

```
(async () => {
  console.log(await listAllVisitors());
})();
```

Table format:

```
(async () => {
  console.table(await listAllVisitors());
})();
```

- ### Viewing one visitor by id:

Object format:

```
(async () => {
  console.log(await viewOneVisitor(1));
})();
```

Table format:

```
(async () => {
  console.table(await viewOneVisitor(1));
})();
```

- ### Updating a visitor by id:

```
(async () => {
  console.log(await updateAVisitor(1, "full_name", "Joseph Jacob Malete"));
})();
```

- ### View last visitor:

```
(async () => {
  console.log(await viewLastVisitor());
})();
```

- ### Delete all visitors:

```
(async () => {
  console.log(await deleteAllVisitors());
})();
```

- ### Delete one visitor by id:

```
(async () => {
  console.log(await deleteAVisitor(1));
})();
```

# Interacting with the Database using Adminer

- Run the below command:

```
docker compose up
```

- Click on PORTS as shown in the image provided below(Note that I used codespace, the image might be a bit different in your machine):
  ![Alt text](images/image.png)

- After following the instruction above, you will be directed to this page:

![Alt text](images/image-1.png)

## To login use the credentials below:

|              |             |
| ------------ | ----------- |
| **Server**   | postgres    |
| **Username** | postgres    |
| **Password** | password    |
| **Database** | visitors_db |


# Express forms and templates:

### To run this project you have to run this commands in the right order:

Step 1:
```
docker compose down
```

Step 2:
```
docker compose up
```

Step 3:
```
npm start
```

[⬆️ Go to Top](#top)
