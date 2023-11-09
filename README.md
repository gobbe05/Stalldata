### Table of contents
[Abstract](#Abstract)
[Security](#Security)
[Application](#Application)
[Authorization](#Authorization)
[Authentication](#Authentication)
[CRUD](##CRUD)

# Stalldata

## Abstract

Stalldata is an application made to handle documentation of treatments made to pig pens on different farms. The app is supposed to be simple and intuitive for the user. Diffrent access levels will give you access to different functions. The data should be accessible through an API and in CSV format. An express web application will be used to serve the application and will work on every device that has a web browser.

## Security

To protect against NoSQL injection MongoDB schemas are made which means that the data inputed in to the application can only be interpreted as what it is supposed to be. That means that you can't pass filters to a string field because it will be interpreted as just a string.

To protect against XSS React automaticly escapes HTML which means that it will only be interpreted as a string and not a script tag for example.

## Application

### Async

Javascript is a syncronous programming language which in turn means that every action has to be run to completion before going to the next one. This means that actions are blocking and slow events will make it so that the application can't continue. To get around this async functions are used. They are not run on the main stack and will be completed on the side. When the async function is completed a callback function will be sent to the main stack to be executed. MongoDB makes use of promises which means that we can use async functions to handle calls to the database.

### Structure

The application structure is built using a React frontend with a NodeJS Express backend with a NoSQL mongo database. The express backend sends the React application to all unused routes. This makes it possible to use Reacts client side routing.

For the built React app to be served the _dist_ folder has to be recognized as a static folder. This can be done in Express.

```ts
app.use(express.static("dist"));
```
Then after all the other routes are handled the global route is added.
```ts
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html")
})
```

## Authorization

Authentication will be handled using JWT. Middleware will handle the authentication and verify the access level. There is three middlewares that each verifies access on a new level. Users, CompanyAdmins, Admins.

```ts
app.get("/api/forusers", Protected, route);
app.get("/api/forcompanyadmins", ProtectedCompanyAdmin, route);
app.get("/api/foradmins", ProtectedAdmin, route);
```

To allow the JWT cookie to be sent, the credentials has to be allowed in the cors settings.

```ts
app.use(
  cors({
    credentials: true,
  })
);
```

Credentials must also be included when fetching the API route.

```ts
fetch("apipath", {
    ...
    credentials: "include"
})
```

## Authentication

### Login

The login route handles the authentication. It looks for a user with the inputed username and if it cant find one it sends bakc 401 Unauthorized status. If the user is found it will then take the encrypted password stored in the database and compare it against the inputed password. If it is a match a JWT will be sent with the response as a cookie followed by a 200 OK status.

```ts
const token = jwt.sign(
  { userid: dbUser._id, username: dbUser.username },
  "secret"
);
res.cookie("token", token);
```

### Sign Up

The signup route handles the creation of an account. It takes information about the user and then validates it. If everything is validated correctly the inputed password will be encrypted and a new User will be added to the database. After the user has been added to the database a JWT cookie will be sent to the user same as in the login route.

## CRUD

### Create

To create data, requests are sent and recieved by routes with the HTTP POST method.

```ts
app.post("/api/createcompany", createcompanyroute);
```

It includes a body containing json data.

```ts
const { name, code } = req.body;
```

The data is then added to a new MongoDB Model and saved.

```ts
const company = new Company({
  name: name,
  code: code,
});

company.save();
```

After the item successfully was saved a HTTP 201 Created status gets sent back.

### Read

Reading data is done by recieving HTTP GET requests and sending it to a route.

```ts
app.get("/api/getcompanies", getcompaniesroute);
```

Then the route gets the data from the MongoDB database.

```ts
const companies = await Company.find({});
```

After that the data is sent back in the response with a HTTP 200 OK status.

```ts
return res.status(200).json({ companies: companies });
```

### Update

Updating data is done by sending and recieving HTTP PATCH requests and sending it to a route. After that the object is found in the database and the chosen fields gets updated. A HTTP 200 OK status is then sent.

```ts
const updatedCompany = await Company.findOneAndUpdate(
  { _id: companyid },
  { name: name, code: code }
);
```

### Delete

Deleting data is done by sending and recieving HTTP DELETE requests and sending it to a route. The object is then found in the database and removed.

```ts
await User.findOneAndDelete({ _id: uid });
```

After the removal of the item a HTTP 204 No Content status is sent back.
